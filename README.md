# 11 Plus Exam Papers

A Next.js 11+ exam preparation platform with school-specific mock exams, practice questions, and tutor support resources.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- OpenAI API (question generation)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4o-mini
```

## Project Structure

```
11plus-exam-papers/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home / quiz app entry point
│   ├── mock-exams/         # School mock exam browser
│   ├── subjects/           # Subject pages
│   ├── tutors/             # Tutor location pages
│   ├── locations/          # City-based SEO pages
│   └── api/                # API routes
├── components/             # React components
├── data/
│   ├── schools.catalog.json  # 50-school catalog
│   ├── blueprints/           # Per-school exam blueprints
│   └── questionBank.ts       # Local fallback questions
├── lib/                    # Utility functions
└── services/               # Question service layer
```

## Adding a New School Blueprint

1. Add the school to `data/schools.catalog.json` with `"hasBlueprint": true`
2. Create `data/blueprints/<school-id>.json` following the blueprint schema
3. The question generator will automatically use it

## Deployment

See `DEPLOY.md` for Vercel deployment instructions.
