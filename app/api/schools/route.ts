import { NextResponse } from 'next/server';
import { SCHOOLS } from '@/lib/schools';
import { loadBlueprint, getAvailableSubjects, getDefaultSettings } from '@/lib/blueprints';

function pickQuizType(questionTypes: any): 'multiple-choice' | 'fill-in-the-blank' {
  // Our current engine supports multiple-choice + text input (fill-in-the-blank).
  // Map "short-answer" to fill-in-the-blank for now.
  if (!Array.isArray(questionTypes) || questionTypes.length === 0) return 'multiple-choice';
  const top = [...questionTypes].sort((a, b) => Number(b?.weight ?? 0) - Number(a?.weight ?? 0))[0];
  const t = String(top?.type || '').toLowerCase();
  if (t.includes('fill') || t.includes('blank')) return 'fill-in-the-blank';
  if (t.includes('short')) return 'fill-in-the-blank';
  return 'multiple-choice';
}

export async function GET() {
  // Public metadata only. Source PDFs are server-only and never exposed to users.
  const schools = SCHOOLS.map((s) => {
    const bp = loadBlueprint(s.id);
    const availableSubjects = getAvailableSubjects(bp);
    const defaultSubject = (availableSubjects.includes('maths') ? 'maths' : availableSubjects[0]) ?? 'maths';

    const defaults = {
      mathsOnly: getDefaultSettings(bp, 'maths'),
      englishOnly: getDefaultSettings(bp, 'english'),
    };

    const mathsQuizType = pickQuizType((bp as any)?.maths?.questionTypes);
    const englishQuizType = pickQuizType((bp as any)?.english?.questionTypes);

    return {
      id: s.id,
      name: s.name,
      category: s.category,
      summary: bp?.summary ?? null,
      availableSubjects,
      defaultSubject,
      defaults,
      quizTypes: {
        maths: mathsQuizType,
        english: englishQuizType,
      },
    };
  });

  return NextResponse.json({ schools });
}
