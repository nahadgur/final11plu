import { Subject, Question, SchoolType, QuizType } from '../types';
import { getRandomQuestions } from '../data/questionBank';

type Difficulty = 'standard' | 'challenging' | 'exam-ready';

// Primary question generation function.
// - For school-specific exams, we call the server (which can use PDFs as source material).
// - For local dev without an API key, we fall back to the built-in question bank.
export const generateQuestions = async (
  subject: Subject,
  schoolType: SchoolType | null,
  topic?: string,
  quizType: QuizType = 'multiple-choice',
  count: number = 25,
  schoolId?: string,
  difficulty: Difficulty = 'standard'
): Promise<Question[]> => {
  // Simulate slight loading delay for better UX
  await new Promise((resolve) => setTimeout(resolve, 350));

  if (schoolId) {
    try {
      const res = await fetch('/api/exams/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schoolId, subject, quizType, count, difficulty, topic }),
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.questions) && data.questions.length > 0) {
          return data.questions as Question[];
        }
      }
    } catch {
      // fall through to local generation
    }
  }

  // Local fallback: can repeat questions to reach target count.
  return getRandomQuestions(subject, quizType, count, topic);
};
