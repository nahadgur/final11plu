'use client';

import { useMemo, useState } from 'react';
import type { Subject, QuizType } from '@/types';

type Difficulty = 'standard' | 'challenging' | 'exam-ready';

type ApiResp = {
  questions?: any[];
  warning?: string;
  error?: string;
  meta?: {
    source: 'openai' | 'fallback';
    schoolId: string;
    schoolName?: string;
    model?: string;
    blueprintLoaded?: boolean;
    requestedCount?: number;
    returnedCount?: number;
  };
};

const SUBJECTS: { label: string; value: Subject }[] = [
  { label: 'Maths', value: 'maths' as Subject },
  { label: 'English', value: 'english' as Subject },
];

const QUIZ_TYPES: { label: string; value: QuizType }[] = [
  { label: 'Multiple choice', value: 'multiple-choice' as QuizType },
  { label: 'Fill in the blank', value: 'fill-in-the-blank' as QuizType },
  { label: 'Short answer', value: 'short-answer' as QuizType },
  { label: 'Ordering', value: 'ordering' as QuizType },
];

const DIFFICULTIES: { label: string; value: Difficulty }[] = [
  { label: 'Standard', value: 'standard' },
  { label: 'Challenging', value: 'challenging' },
  { label: 'Exam-ready', value: 'exam-ready' },
];

export default function TestPage() {
  const [schoolId, setSchoolId] = useState('cls-boys');
  const [subject, setSubject] = useState<Subject>('english' as Subject);
  const [quizType, setQuizType] = useState<QuizType>('multiple-choice' as QuizType);
  const [count, setCount] = useState(10);
  const [difficulty, setDifficulty] = useState<Difficulty>('standard');
  const [busy, setBusy] = useState(false);
  const [resp, setResp] = useState<ApiResp | null>(null);

  const stats = useMemo(() => {
    const qs = resp?.questions || [];
    const texts = qs.map((q: any) => String(q?.text || '').trim()).filter(Boolean);
    const uniqueTexts = new Set(texts);
    return {
      total: qs.length,
      unique: uniqueTexts.size,
      duplicates: Math.max(0, texts.length - uniqueTexts.size),
    };
  }, [resp]);

  async function run() {
    setBusy(true);
    setResp(null);
    try {
      const r = await fetch('/api/exams/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schoolId, subject, quizType, count, difficulty }),
      });
      const text = await r.text();
      // When the API errors, Next can return HTML. Guard against JSON parse errors.
      let parsed: any = null;
      try {
        parsed = text ? JSON.parse(text) : null;
      } catch {
        parsed = { error: text || `Request failed (${r.status})` };
      }
      if (!r.ok && !parsed?.error) {
        parsed.error = `Request failed (${r.status})`;
      }
      setResp(parsed as ApiResp);
    } catch (e: any) {
      setResp({ error: e?.message || 'Request failed' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900">/test — Question Generation Checker</h1>
        <p className="mt-2 text-gray-700">
          Use this page to verify whether the server is generating questions via OpenAI or falling back to the local bank,
          and to quickly spot repetition.
        </p>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">schoolId</span>
              <input
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                value={schoolId}
                onChange={(e) => setSchoolId(e.target.value)}
                placeholder="e.g. spgs-girls"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Subject</span>
              <select
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                value={subject as any}
                onChange={(e) => setSubject(e.target.value as any)}
              >
                {SUBJECTS.map((s) => (
                  <option key={s.value} value={s.value as any}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Quiz type</span>
              <select
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                value={quizType as any}
                onChange={(e) => setQuizType(e.target.value as any)}
              >
                {QUIZ_TYPES.map((t) => (
                  <option key={t.value} value={t.value as any}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Difficulty</span>
              <select
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-gray-700">Question count</span>
              <input
                type="number"
                min={5}
                max={30}
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value || '10', 10))}
              />
            </label>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={run}
              disabled={busy}
              className="rounded-xl bg-black px-4 py-2 text-white disabled:opacity-50"
            >
              {busy ? 'Running…' : 'Run test'}
            </button>
            <span className="text-sm text-gray-600">
              Tip: try a schoolId you selected in /mock-exams. If it returns <b>meta.source=openai</b>, your API key is working.
            </span>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Result</h2>

          {!resp && <p className="mt-2 text-gray-600">Run a test to see output here.</p>}

          {resp?.error && (
            <p className="mt-2 rounded-xl bg-red-50 px-3 py-2 text-red-700">Error: {resp.error}</p>
          )}

          {resp?.meta && (
            <div className="mt-3 rounded-xl bg-gray-50 p-3 text-sm text-gray-800">
              <div><b>source:</b> {resp.meta.source}</div>
              <div><b>school:</b> {resp.meta.schoolName ? `${resp.meta.schoolName} (${resp.meta.schoolId})` : resp.meta.schoolId}</div>
              <div><b>model:</b> {resp.meta.model || 'n/a'}</div>
              <div><b>blueprint loaded:</b> {String(resp.meta.blueprintLoaded)}</div>
              <div><b>requested:</b> {resp.meta.requestedCount} • <b>returned:</b> {resp.meta.returnedCount}</div>
            </div>
          )}

          {resp?.warning && (
            <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-amber-800">
              {resp.warning}
            </p>
          )}

          {resp?.questions && (
            <>
              <div className="mt-3 text-sm text-gray-800">
                <b>Total questions:</b> {stats.total} • <b>Unique texts:</b> {stats.unique} • <b>Duplicates:</b> {stats.duplicates}
              </div>

              <div className="mt-4 space-y-3">
                {(resp.questions || []).slice(0, 6).map((q: any, idx: number) => (
                  <div key={q.id || idx} className="rounded-xl border border-gray-200 p-3">
                    <div className="text-sm font-semibold text-gray-900">{idx + 1}. {q.text}</div>
                    {Array.isArray(q.options) && q.options.length > 0 && (
                      <ul className="mt-2 list-disc pl-6 text-sm text-gray-700">
                        {q.options.map((o: string, i: number) => (
                          <li key={i}>{o}</li>
                        ))}
                      </ul>
                    )}
                    {q.correctAnswer && (
                      <div className="mt-2 text-xs text-gray-600"><b>Answer:</b> {q.correctAnswer}</div>
                    )}
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs text-gray-500">
                Showing first 6 questions only. Increase count to test repetition. For full “school flavour”, ensure OPENAI_API_KEY is set and a blueprint exists for that schoolId.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
