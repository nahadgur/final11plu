import { NextResponse } from 'next/server';
import { Subject, QuizType, Question } from '@/types';
import { getRandomQuestions } from '@/data/questionBank';
import { getSchoolById } from '@/lib/schools';
import { loadBlueprint } from '@/lib/blueprints';

type Difficulty = 'standard' | 'challenging' | 'exam-ready';

type ReqBody = {
  schoolId: string;
  subject: Subject | string;
  quizType: QuizType | string;
  count: number;
  difficulty?: Difficulty;
  topic?: string;
};

function normalizeSubject(input: any): Subject {
  const raw = String(input ?? '').trim();
  const asEnum = (Object.values(Subject) as string[]).find((v) => v === raw);
  if (asEnum) return asEnum as Subject;

  const s = raw.toLowerCase();
  if (s.includes('english') || s === 'eng') return Subject.English;
  if (s.includes('non') && s.includes('verbal')) return Subject.NonVerbalReasoning;
  if (s.includes('verbal')) return Subject.VerbalReasoning;
  if (s.includes('math')) return Subject.Maths;
  return Subject.Maths;
}

function normalizeQuizType(input: any): QuizType {
  const raw = String(input ?? '').trim();
  const lower = raw.toLowerCase();

  const allowed = new Set<QuizType>([
    'multiple-choice',
    'true-false',
    'fill-in-the-blank',
    'ordering',
    'short-answer'
  ]);
  if (allowed.has(raw as QuizType)) return raw as QuizType;
  if (allowed.has(lower as QuizType)) return lower as QuizType;

  if (lower === 'mcq' || lower === 'multiple choice' || lower === 'multiplechoice') return 'multiple-choice';
  if (lower === 'short answer' || lower === 'free-text' || lower === 'text') return 'short-answer';
  if (lower === 'fill' || lower === 'fill blank' || lower === 'fill blank') return 'fill-in-the-blank';
  if (lower === 'tf' || lower === 'true false' || lower === 'true/false') return 'true-false';
  return 'multiple-choice';
}

function clampInt(value: any, min: number, max: number, fallback: number) {
  const n = typeof value === 'number' ? value : parseInt(String(value || ''), 10);
  if (Number.isNaN(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

async function generateWithClaude(args: {
  apiKey: string;
  schoolName: string;
  blueprintSummary?: string;
  subject: Subject;
  quizType: QuizType;
  count: number;
  difficulty: Difficulty;
  topic?: string;
}): Promise<Question[]> {
  const { apiKey, schoolName, blueprintSummary, subject, quizType, count, difficulty, topic } = args;

  const system =
    "You are an expert 11+ exam question writer. Output only valid JSON — no markdown, no code fences, no extra text.";

  const user = {
    task: 'Generate exam questions for an online 11+ mock exam.',
    school: schoolName,
    blueprint_summary: blueprintSummary || 'No blueprint summary available yet.',
    constraints: { subject, quizType, count, difficulty, topic: topic || null, online_exam: true },
    output_schema: {
      questions: [
        {
          id: 'string — unique, e.g. "q1"',
          text: 'string — the question',
          options: ['string — for multiple-choice; omit for fill-in-the-blank'],
          correctAnswer: 'string',
          explanation: 'string — see explanation rules below',
          topic: 'string — topic tag, e.g. "fractions"',
        },
      ],
    },
    rules: [
      `Return exactly ${count} questions.`,
      'For multiple-choice: include 4 options, correctAnswer must exactly match one option.',
      'For fill-in-the-blank: options can be omitted or used as hint distractors.',
      'Each id must be unique.',
      'Do not reference PDFs or printing.',
      'Difficulty scale: standard = Year 5 level, challenging = upper Year 5/Year 6, exam-ready = full 11+ exam difficulty.',
    ],
    explanation_rules: [
      'Every question MUST have a non-empty explanation.',
      'Structure: (1) state whether correct or what the answer is, (2) show the working/reasoning step-by-step, (3) give a memory tip or common mistake warning.',
      'Use plain English a 10-year-old can follow — no jargon.',
      'For maths: show the calculation steps explicitly, e.g. "Step 1: divide both sides by 4 → x = 3".',
      'For verbal reasoning: explain the word pattern or rule used.',
      'For English: explain why the answer is correct grammatically or contextually.',
      'Length: 2–4 sentences. Enough to teach, not so long it overwhelms.',
      'Avoid starting every explanation with "The answer is..." — vary the opening.',
    ],
  };

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system,
      messages: [{ role: 'user', content: JSON.stringify(user) }],
    }),
  });

  if (!res.ok) throw new Error(`Anthropic error: ${res.status}`);

  const data = await res.json();
  const content = data?.content?.[0]?.text;
  if (typeof content !== 'string') throw new Error('Anthropic returned no content');

  // Strip any accidental markdown fences
  const clean = content.replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(clean);
  const questions = parsed?.questions;
  if (!Array.isArray(questions) || questions.length < 1) throw new Error('Invalid questions payload');

  return questions.map((q: any, idx: number) => ({
    id: String(q.id || `ai-${idx + 1}`),
    text: String(q.text || ''),
    options: Array.isArray(q.options) ? q.options.map((o: any) => String(o)) : [],
    correctAnswer: String(q.correctAnswer || ''),
    explanation: String(q.explanation || ''),
    topic: String(q.topic || ''),
  }));
}

async function generateWithOpenAI(args: {
  apiKey: string;
  schoolName: string;
  blueprintSummary?: string;
  subject: Subject;
  quizType: QuizType;
  count: number;
  difficulty: Difficulty;
  topic?: string;
}): Promise<Question[]> {
  const {
    apiKey,
    schoolName,
    blueprintSummary,
    subject,
    quizType,
    count,
    difficulty,
    topic,
  } = args;

  const system =
    "You are an expert 11+ exam question writer. Output only valid JSON — no markdown, no code fences, no extra text.";

  const user = {
    task: 'Generate exam questions for an online 11+ mock exam.',
    school: schoolName,
    blueprint_summary: blueprintSummary || 'No blueprint summary available yet.',
    constraints: { subject, quizType, count, difficulty, topic: topic || null, online_exam: true, no_pdfs: true },
    output_schema: {
      questions: [
        {
          id: 'string — unique, e.g. "q1"',
          text: 'string — the question',
          options: ['string — for multiple-choice; omit for fill-in-the-blank'],
          correctAnswer: 'string',
          explanation: 'string — see explanation rules below',
          topic: 'string — topic tag, e.g. "fractions"',
        },
      ],
    },
    rules: [
      `Return exactly ${count} questions.`,
      'For multiple-choice: include 4 options, correctAnswer must exactly match one option.',
      'For fill-in-the-blank: options can be omitted or used as hint distractors.',
      'Each id must be unique.',
      'Do not reference PDFs or printing.',
      'Difficulty scale: standard = Year 5 level, challenging = upper Year 5/Year 6, exam-ready = full 11+ exam difficulty.',
    ],
    explanation_rules: [
      'Every question MUST have a non-empty explanation.',
      'Structure: (1) state whether correct or what the answer is, (2) show the working/reasoning step-by-step, (3) give a memory tip or common mistake warning.',
      'Use plain English a 10-year-old can follow — no jargon.',
      'For maths: show the calculation steps explicitly, e.g. "Step 1: divide both sides by 4 → x = 3".',
      'For verbal reasoning: explain the word pattern or rule used.',
      'For English: explain why the answer is correct grammatically or contextually.',
      'Length: 2–4 sentences. Enough to teach, not so long it overwhelms.',
      'Avoid starting every explanation with "The answer is..." — vary the opening.',
    ],
  };

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.7,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: JSON.stringify(user) },
      ],
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenAI error: ${res.status}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== 'string') throw new Error('OpenAI returned no content');

  const parsed = JSON.parse(content);
  const questions = parsed?.questions;
  if (!Array.isArray(questions) || questions.length < 1) throw new Error('Invalid questions payload');

  // Basic sanitisation
  return questions.map((q: any, idx: number) => ({
    id: String(q.id || `ai-${idx + 1}`),
    text: String(q.text || ''),
    options: Array.isArray(q.options) ? q.options.map((o: any) => String(o)) : [],
    correctAnswer: String(q.correctAnswer || ''),
    explanation: String(q.explanation || ''),
    topic: String(q.topic || ''),
  }));
}

export async function POST(req: Request) {
  let body: ReqBody;
  try {
    body = (await req.json()) as ReqBody;
  } catch {
    return jsonError('Invalid JSON body', 400);
  }

  const schoolId = String(body?.schoolId || '').trim();
  if (!schoolId) return jsonError('schoolId is required', 400);

  const school = getSchoolById(schoolId);
  if (!school) return jsonError('Unknown schoolId', 404);

  const subject = normalizeSubject(body.subject);
  const quizType = normalizeQuizType(body.quizType || 'multiple-choice');
  const difficulty = (body.difficulty || 'standard') as Difficulty;
  const topic = body.topic;

  const count = clampInt(body.count, 5, 30, 25);

  // Preferred path: Claude (better explanations, same JSON output)
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const blueprint = loadBlueprint(schoolId);
  const metaBase = {
    schoolId,
    schoolName: school.name,
    blueprintLoaded: Boolean(blueprint),
    requestedCount: count,
  };

  const generatorArgs = {
    schoolName: school.name,
    blueprintSummary: blueprint?.summary,
    subject,
    quizType,
    count,
    difficulty,
    topic,
  };

  // Primary: OpenAI (uses OPENAI_API_KEY)
  if (openaiKey) {
    try {
      const questions = await generateWithOpenAI({ apiKey: openaiKey, ...generatorArgs });
      if (questions.length < count) {
        const pad = getRandomQuestions(subject, quizType, count - questions.length, topic);
        return NextResponse.json({ questions: [...questions, ...pad], meta: { ...metaBase, source: 'openai', model: process.env.OPENAI_MODEL || 'gpt-4o-mini', returnedCount: Math.min(count, questions.length + pad.length) } });
      }
      return NextResponse.json({ questions: questions.slice(0, count), meta: { ...metaBase, source: 'openai', model: process.env.OPENAI_MODEL || 'gpt-4o-mini', returnedCount: count } });
    } catch (err) {
      console.error('[generate] OpenAI failed:', err);
    }
  }

  // Optional upgrade: Claude (add ANTHROPIC_API_KEY to .env.local to enable)
  if (anthropicKey) {
    try {
      const questions = await generateWithClaude({ apiKey: anthropicKey, ...generatorArgs });
      if (questions.length < count) {
        const pad = getRandomQuestions(subject, quizType, count - questions.length, topic);
        return NextResponse.json({ questions: [...questions, ...pad], meta: { ...metaBase, source: 'claude', model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514', returnedCount: Math.min(count, questions.length + pad.length) } });
      }
      return NextResponse.json({ questions: questions.slice(0, count), meta: { ...metaBase, source: 'claude', model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514', returnedCount: count } });
    } catch (err) {
      console.error('[generate] Claude also failed:', err);
    }
  }

  // Fallback: local bank (repeats to reach 20–30 questions)
  const questions = getRandomQuestions(subject, quizType, count, topic);
  return NextResponse.json({
    questions,
    warning: 'OPENAI_API_KEY not set (or generation failed). Using local question bank fallback.',
    meta: { ...metaBase, source: 'fallback', returnedCount: questions.length },
  });
}