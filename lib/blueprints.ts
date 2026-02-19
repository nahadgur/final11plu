import fs from 'node:fs';
import path from 'node:path';

export type SchoolBlueprint = {
  schoolId: string;
  schoolName?: string;
  version?: string;
  summary: string;

  defaults?: {
    mixedPaper?: {
      durationMins?: number;
      questionCount?: number;
      sections?: Array<{ name: string; share: number }>;
    };
    mathsOnly?: { durationMins?: number; questionCount?: number };
    englishOnly?: { durationMins?: number; questionCount?: number };
  };

  maths?: {
    topicWeighting?: Array<{ topic: string; weight: number }>;
    questionTypes?: Array<{ type: string; weight: number }>;
  };

  english?: {
    topicWeighting?: Array<{ topic: string; weight: number }>;
    questionTypes?: Array<{ type: string; weight: number }>;
  };

  generatorHints?: string[];
  markingAndFeedback?: Record<string, unknown>;
};

export function blueprintPath(schoolId: string): string {
  return path.join(process.cwd(), 'data', 'blueprints', `${schoolId}.json`);
}

export function loadBlueprint(schoolId: string): SchoolBlueprint | null {
  const fp = blueprintPath(schoolId);
  if (!fs.existsSync(fp)) return null;

  try {
    const raw = fs.readFileSync(fp, 'utf8');
    const parsed = JSON.parse(raw) as SchoolBlueprint;
    if (!parsed || typeof parsed.summary !== 'string') return null;
    return parsed;
  } catch {
    return null;
  }
}

function sectionLooksUnknown(obj: any): boolean {
  const first = obj?.topicWeighting?.[0]?.topic;
  return typeof first === 'string' && first.trim().toUpperCase().startsWith('UNKNOWN');
}

export function getAvailableSubjects(bp: SchoolBlueprint | null): Array<'maths' | 'english'> {
  if (!bp) return [];
  const out: Array<'maths' | 'english'> = [];

  if (bp.maths && !sectionLooksUnknown(bp.maths)) out.push('maths');
  if (bp.english && !sectionLooksUnknown(bp.english)) out.push('english');

  // If a blueprint exists but is missing a section, fall back to "unknown" handling
  // by simply not advertising it as available.
  return out;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function getDefaultSettings(bp: SchoolBlueprint | null, subject: 'maths' | 'english') {
  const d = bp?.defaults || {};
  const s = subject === 'maths' ? d.mathsOnly : d.englishOnly;

  const duration = clamp(Number(s?.durationMins ?? 45), 15, 120);
  const count = clamp(Number(s?.questionCount ?? 25), 10, 30);

  return { durationMins: duration, questionCount: count };
}
