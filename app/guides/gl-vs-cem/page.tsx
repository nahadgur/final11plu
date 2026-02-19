import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { ChevronRight, CheckCircle, XCircle, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'GL Assessment vs CEM: What\'s the Difference? | 11 Plus Exam Papers',
  description:
    'Clear guide explaining the difference between GL Assessment and CEM 11+ exams — which schools use each, what subjects are tested, and how to prepare differently for each format.',
  alternates: { canonical: '/guides/gl-vs-cem' },
};

const GL_SCHOOLS = [
  "Queen Elizabeth's School (Barnet)",
  "The Henrietta Barnett School",
  "Pate's Grammar School (Gloucestershire)",
  'Reading School (Berkshire)',
  'Newstead Wood School (Bromley)',
  'The Latymer School (Edmonton)',
  'Redbridge Grammar Schools',
  'Kent Grammar Schools (most)',
  'Bexley Grammar Schools',
  'Buckinghamshire Grammar Schools',
  'Warwickshire Grammar Schools',
  'Gloucestershire Grammar Schools',
];

const CEM_SCHOOLS = [
  'Altrincham Grammar School for Girls (Trafford)',
  'Stretford Grammar School (Trafford)',
  'Sale Grammar School (Trafford)',
  'Urmston Grammar School (Trafford)',
  'Previously: West Midlands grammar schools (switched to GL in 2023)',
];

const SUTTON_SET_SCHOOLS = [
  "Wilson's School",
  'Sutton Grammar School',
  'Wallington County Grammar School',
  'Nonsuch High School for Girls',
  'Wallington High School for Girls',
];

const OWN_PAPER_SCHOOLS = [
  'Tiffin School & Tiffin Girls (Kingston)',
  "St Olave's Grammar School (Bromley)",
  'King Edward VI High School for Girls (Birmingham)',
  'Colchester Royal Grammar (CSSE Essex)',
];

export default function GlVsCemPage() {
  return (
    <>
      <SiteNav />

      <main className="bg-white min-h-screen">

        {/* ── Hero ── */}
        <section className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 pt-20 pb-14 px-4 border-b border-slate-100">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-indigo-200">
              <BookOpen size={12} /> 11+ Guide
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
              GL Assessment vs CEM:<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                What's the difference?
              </span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
              GL Assessment and CEM are the two main 11+ exam providers used by grammar schools in England. 
              They test similar academic skills but differ significantly in format, predictability, and preparation approach. 
              Here's what every parent needs to know.
            </p>
          </div>
        </section>

        {/* ── Quick comparison ── */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-black text-slate-900 mb-6">Quick comparison</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b-2 border-slate-200">
                  <th className="text-left p-4 font-black text-slate-700 w-1/3">Feature</th>
                  <th className="text-left p-4 font-black text-indigo-700">GL Assessment</th>
                  <th className="text-left p-4 font-black text-violet-700">CEM</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Subjects tested', 'English, Maths, Verbal Reasoning, Non-Verbal Reasoning (school chooses which)', 'Verbal Reasoning (inc. English skills) + Numerical Reasoning (inc. Maths)'],
                  ['Format', 'Multiple-choice; each subject in separate timed sections', 'Mixed format; subjects combined across two booklets; some fill-in-the-blank'],
                  ['Predictability', 'Higher — question types are well documented and consistent', 'Lower — designed to be harder to "teach to"; question styles vary more'],
                  ['Past papers', 'Familiarisation booklets available; many practice resources', 'CEM stopped publishing practice papers in 2023; limited resources available'],
                  ['Who uses it', 'Most grammar schools in England (majority)', 'Fewer schools — mainly Trafford and formerly West Midlands'],
                  ['Timing style', 'Fixed time per section; questions must be answered in order', 'Strict time limits across mixed-content booklets'],
                  ['VR/NVR', 'VR and NVR are distinct sections, each thoroughly tested', 'VR is embedded within a broader "verbal" booklet alongside English comprehension'],
                  ['Preparation materials', 'Bond, CGP, GL familiarisation packs, school-specific guides', 'Limited; CEM no longer publish official practice materials'],
                ].map(([feature, gl, cem], i) => (
                  <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                    <td className="p-4 font-bold text-slate-700">{feature}</td>
                    <td className="p-4 text-slate-600 border-l border-slate-100">{gl}</td>
                    <td className="p-4 text-slate-600 border-l border-slate-100">{cem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── GL deep dive ── */}
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <div className="rounded-2xl border-2 border-indigo-200 overflow-hidden">
            <div className="p-6 bg-indigo-600 text-white">
              <h2 className="text-xl font-black mb-1">GL Assessment — in depth</h2>
              <p className="text-indigo-100 text-sm">Used by the majority of English grammar schools</p>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <h3 className="font-black text-slate-900 mb-2">What it tests</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  GL Assessment papers can cover up to four subjects: English, Maths, Verbal Reasoning (VR), and Non-Verbal Reasoning (NVR). 
                  Individual schools choose which combination to use — QE Barnet uses all four, while some schools only use Maths and English. 
                  Always check your target school's admissions page for the exact combination.
                </p>
              </div>

              <div>
                <h3 className="font-black text-slate-900 mb-2">Format</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  All questions are multiple-choice. Children answer on a separate answer sheet using a pencil. 
                  Papers are divided into clearly labelled timed sections — children are told when to start and stop each section. 
                  This structure makes GL papers very practiseable: children can become familiar with exactly what to expect.
                </p>
              </div>

              <div>
                <h3 className="font-black text-slate-900 mb-2">How to prepare</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {[
                    'Download GL Assessment familiarisation booklets — free from the GL Assessment website',
                    'Use Bond 11+ or CGP practice papers, which closely match GL style',
                    'Practise VR and NVR question types consistently — these are not taught in school',
                    'Time each section under exam conditions',
                    'Focus on accuracy rather than speed initially, then build pace',
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-indigo-500 shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-black text-slate-900 mb-2">Schools using GL Assessment (selection)</h3>
                <div className="flex flex-wrap gap-2">
                  {GL_SCHOOLS.map((s) => (
                    <span key={s} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full border border-indigo-100">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CEM deep dive ── */}
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <div className="rounded-2xl border-2 border-violet-200 overflow-hidden">
            <div className="p-6 bg-violet-600 text-white">
              <h2 className="text-xl font-black mb-1">CEM — in depth</h2>
              <p className="text-violet-100 text-sm">Used by fewer schools; designed to be harder to "tutor-proof"</p>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <h3 className="font-black text-slate-900 mb-2">What it tests</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  CEM papers are typically split into two booklets: a Verbal booklet (covering comprehension, vocabulary, cloze exercises, and verbal reasoning) 
                  and a Numerical booklet (covering maths and numerical reasoning). 
                  The distinction between subjects is deliberately blurred to make last-minute cramming less effective.
                </p>
              </div>

              <div>
                <h3 className="font-black text-slate-900 mb-2">Format</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  CEM uses a mix of multiple-choice and short-answer questions. Children may encounter unfamiliar question styles 
                  that require them to adapt quickly. The timing is tighter and the content can shift unexpectedly between question types, 
                  putting more pressure on children who are only used to one style.
                </p>
              </div>

              <div>
                <h3 className="font-black text-slate-900 mb-2">Important note for 2024+</h3>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800 leading-relaxed">
                  CEM stopped offering 11+ tests outside of Trafford from September 2023. The West Midlands grammar schools (Birmingham, Warwickshire, Shropshire) 
                  switched to GL Assessment. CEM also no longer publishes its own practice papers. 
                  <strong className="block mt-1">If you were using CEM resources from before 2023, check that your materials are still relevant.</strong>
                </div>
              </div>

              <div>
                <h3 className="font-black text-slate-900 mb-2">How to prepare</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {[
                    'Focus on broad vocabulary development — reading widely is the best preparation',
                    'Practise cloze exercises (fill-in-the-blank) and comprehension under time pressure',
                    'Build strong mental maths and numerical reasoning skills',
                    'Use CGP and Bond CEM-style papers — official CEM papers are no longer available',
                    'Practise switching quickly between question types without losing focus',
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-violet-500 shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-black text-slate-900 mb-2">Schools currently using CEM</h3>
                <div className="flex flex-wrap gap-2">
                  {CEM_SCHOOLS.map((s) => (
                    <span key={s} className="px-3 py-1 bg-violet-50 text-violet-700 text-xs font-medium rounded-full border border-violet-100">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Other formats ── */}
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-black text-slate-900 mb-5">Other exam formats to know</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-black text-slate-900 mb-2 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 text-xs font-black flex items-center justify-center">SET</span>
                Sutton SET
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                The Selective Eligibility Test used by Sutton grammar schools. Tests Maths and English only (no VR/NVR) in a more open-answer style. 
                Followed by a separate Stage 2 written exam for shortlisted candidates.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SUTTON_SET_SCHOOLS.map((s) => (
                  <span key={s} className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[11px] font-medium rounded-full border border-amber-100">{s}</span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-black text-slate-900 mb-2 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-black flex items-center justify-center">OWN</span>
                School-set papers
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Several grammar and independent schools write their own papers. These are usually harder to predict but schools typically 
                publish sample or specimen papers on their admissions pages.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {OWN_PAPER_SCHOOLS.map((s) => (
                  <span key={s} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[11px] font-medium rounded-full border border-emerald-100">{s}</span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-black text-slate-900 mb-2 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center">ISEB</span>
                ISEB Pre-Test
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Used by many top independent schools (Westminster, St Paul's, Eton, Harrow, Tonbridge, Highgate) as an initial screen. 
                It's an online adaptive test taken at the child's own school in Year 6, covering Maths, English, Verbal Reasoning and Non-Verbal Reasoning. 
                Children who pass are invited for further school-specific assessment.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-black text-slate-900 mb-2 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 text-xs font-black flex items-center justify-center">CSSE</span>
                CSSE (Essex)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The Consortium of Selective Schools in Essex uses its own CSSE papers for grammar schools including Colchester Royal Grammar, 
                Chelmsford County High, and others. Papers cover English and Maths in a distinct style. 
                CSSE publishes sample papers on their website.
              </p>
            </div>
          </div>
        </section>

        {/* ── How to find out which format ── */}
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6">
            <h2 className="text-xl font-black text-slate-900 mb-3">How to find out which format your target school uses</h2>
            <ol className="space-y-2 text-sm text-slate-600 list-none">
              {[
                "Go to the school's official admissions or 11+ page",
                'Look for mentions of "GL Assessment", "CEM", "SET", or "ISEB Pre-Test"',
                'Download any specimen or sample papers linked — these show you the exact format',
                "If the school sets its own papers, check their admissions FAQ for format details",
                "If in doubt, email the school's admissions team directly — they are usually very helpful",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-indigo-50 border-t border-indigo-100 py-14 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-black text-slate-900 mb-3">Ready to start practising?</h2>
            <p className="text-slate-500 mb-6">
              Our mock exams cover both GL Assessment and school-specific styles, tailored to your target school.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/mock-exams"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
              >
                Try a free mock exam <ChevronRight size={18} />
              </Link>
              <Link
                href="/papers"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black bg-white text-slate-700 border border-slate-200 hover:border-slate-300 transition-colors"
              >
                Browse past papers
              </Link>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </>
  );
}
