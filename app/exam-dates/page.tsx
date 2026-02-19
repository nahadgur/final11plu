'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import {
  Calendar, Clock, AlertCircle, CheckCircle, ChevronRight,
  ExternalLink, Info, ChevronDown,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Certainty = 'confirmed' | 'provisional' | 'pattern';

interface DateEntry {
  date: string;
  event: string;
  certainty: Certainty;
}

interface SchoolGroup {
  id: string;
  name: string;
  schools: string[];
  examFormat: string;
  color: string; // Tailwind bg/border/text set
  entryYear: '2026' | '2027';
  dates: DateEntry[];
  officialUrl: string;
  note?: string;
}

// ─── Date data ────────────────────────────────────────────────────────────────
// Sources: official school websites, testlife.co.uk, atomlearning.com, direct school admissions pages.
// Dates labelled "provisional" follow established annual patterns and are highly likely but not yet 
// officially confirmed by the school for that entry year.

const GROUPS_2026_ENTRY: SchoolGroup[] = [
  {
    id: 'qe-barnet',
    name: "Queen Elizabeth's School (QE Barnet) — 2026 Entry",
    schools: ["Queen Elizabeth's School (Barnet)"],
    examFormat: 'GL Assessment (2-stage)',
    color: 'border-indigo-200 bg-indigo-50',
    entryYear: '2026',
    dates: [
      { date: '1 May 2025', event: 'Registration opens', certainty: 'confirmed' },
      { date: '11 July 2025', event: 'Registration closes (noon)', certainty: 'confirmed' },
      { date: '17–18 September 2025', event: 'Stage 1 entrance exams', certainty: 'confirmed' },
      { date: 'Early October 2025', event: 'Stage 1 results issued', certainty: 'confirmed' },
      { date: '31 October 2025', event: 'Common Application Form (CAF) deadline', certainty: 'confirmed' },
      { date: '2 March 2026', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.qebarnet.co.uk/admissions-information/admissions/',
  },
  {
    id: 'henrietta-barnett',
    name: "The Henrietta Barnett School — 2026 Entry",
    schools: ['The Henrietta Barnett School'],
    examFormat: 'GL Assessment (2-stage)',
    color: 'border-rose-200 bg-rose-50',
    entryYear: '2026',
    dates: [
      { date: '1 April 2025', event: 'Registration opens', certainty: 'confirmed' },
      { date: '11 July 2025', event: 'Registration closes (5pm)', certainty: 'confirmed' },
      { date: 'Early September 2025', event: 'Round 1 entrance exam (GL Assessment)', certainty: 'confirmed' },
      { date: 'Late September 2025', event: 'Round 1 results; top 300 invited to Round 2', certainty: 'confirmed' },
      { date: '6 October 2025', event: 'Round 2 exam (Maths & English, school-set)', certainty: 'confirmed' },
      { date: '31 October 2025', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '2 March 2026', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.hbschool.org.uk/admissions/',
    note: 'Round 2 past papers are not released. GL familiarisation packs are linked from the HBS admissions page.',
  },
  {
    id: 'sutton-set',
    name: "Sutton Grammar Schools (SET) — 2026 Entry",
    schools: ["Wilson's School", "Sutton Grammar School", "Wallington County Grammar School", "Nonsuch High School for Girls", "Wallington High School for Girls"],
    examFormat: "Sutton Selective Eligibility Test (SET) + Stage 2",
    color: 'border-violet-200 bg-violet-50',
    entryYear: '2026',
    dates: [
      { date: '1 May 2025', event: 'SET registration opens', certainty: 'confirmed' },
      { date: '1 August 2025 (midnight)', event: 'SET registration closes', certainty: 'confirmed' },
      { date: '13 June 2025', event: 'Deadline for SEN/access arrangement requests', certainty: 'confirmed' },
      { date: '15 September 2025', event: 'Selective Eligibility Test (SET)', certainty: 'confirmed' },
      { date: '3 October 2025', event: "Stage 2 exam (Wilson's, Sutton Grammar, Wallington County Grammar)", certainty: 'confirmed' },
      { date: '10 October 2025', event: "Wilson's Aptitude Tests (Sport & Music)", certainty: 'confirmed' },
      { date: '31 October 2025', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '2 March 2026', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.suttongrammar.sutton.sch.uk/admissions/selective-eligibility-test-examination/',
    note: 'One SET registration covers all five Sutton grammar schools. Each school has its own Stage 2 process and pass mark.',
  },
  {
    id: 'tiffin',
    name: 'Tiffin School & Tiffin Girls — 2026 Entry',
    schools: ["Tiffin School", "Tiffin Girls' School"],
    examFormat: "School own papers (2-stage)",
    color: 'border-emerald-200 bg-emerald-50',
    entryYear: '2026',
    dates: [
      { date: '3 June 2025', event: "Tiffin Girls' Stage 1 registration opens", certainty: 'confirmed' },
      { date: '4 June 2025', event: 'Tiffin School Stage 1 registration opens', certainty: 'confirmed' },
      { date: '7 July 2025', event: 'Deadline to register for Sport & Music aptitude assessments (Tiffin School)', certainty: 'confirmed' },
      { date: '1 September 2025', event: "Tiffin Girls' Stage 1 registration closes (noon)", certainty: 'confirmed' },
      { date: '3 September 2025', event: "Tiffin School Stage 1 registration closes (noon)", certainty: 'confirmed' },
      { date: '2–3 October 2025', event: "Tiffin Girls' Stage 1 exam", certainty: 'confirmed' },
      { date: '3 October 2025', event: "Tiffin School Stage 1 exam", certainty: 'confirmed' },
      { date: '15 October 2025', event: 'Stage 1 results; shortlisted children invited to Stage 2', certainty: 'confirmed' },
      { date: '31 October 2025', event: 'CAF deadline', certainty: 'confirmed' },
      { date: 'November 2025', event: 'Stage 2 exams (written, set by school)', certainty: 'confirmed' },
      { date: '2 March 2026', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.tiffinschool.co.uk/admissions/year-7-admissions/',
    note: "Both schools are in Kingston upon Thames. Stage 2 papers are not released publicly. Each school weights English/Maths scores differently.",
  },
  {
    id: 'st-olaves-bromley',
    name: "St Olave's & Newstead Wood — 2026 Entry",
    schools: ["St Olave's Grammar School", "Newstead Wood School"],
    examFormat: "St Olave's SET + Stage 2 / GL Assessment (2-stage)",
    color: 'border-amber-200 bg-amber-50',
    entryYear: '2026',
    dates: [
      { date: '9 July 2025', event: "St Olave's registration closes", certainty: 'confirmed' },
      { date: '19 September 2025', event: "St Olave's Stage 1 (SET — VR, NVR, Maths, English)", certainty: 'confirmed' },
      { date: 'Mid-October 2025', event: 'St Olave\'s Stage 1 results; top 450 invited to Stage 2', certainty: 'confirmed' },
      { date: '14 November 2025', event: "St Olave's Stage 2 (Maths & English written)", certainty: 'confirmed' },
      { date: '31 October 2025', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '2 March 2026', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.saintolaves.net/admissions',
    note: "Newstead Wood School follows a similar two-stage GL Assessment process. Check their admissions page for confirmed dates.",
  },
];

const GROUPS_2027_ENTRY: SchoolGroup[] = [
  {
    id: 'qe-barnet-2027',
    name: "Queen Elizabeth's School (QE Barnet) — 2027 Entry",
    schools: ["Queen Elizabeth's School (Barnet)"],
    examFormat: 'GL Assessment (2-stage)',
    color: 'border-indigo-200 bg-indigo-50',
    entryYear: '2027',
    dates: [
      { date: 'May 2026', event: 'Registration expected to open', certainty: 'pattern' },
      { date: 'July 2026', event: 'Registration expected to close', certainty: 'pattern' },
      { date: 'September 2026', event: 'Stage 1 entrance exams', certainty: 'pattern' },
      { date: '30 October 2026', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '1 March 2027', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.qebarnet.co.uk/admissions-information/admissions/',
  },
  {
    id: 'henrietta-barnett-2027',
    name: "The Henrietta Barnett School — 2027 Entry",
    schools: ['The Henrietta Barnett School'],
    examFormat: 'GL Assessment (2-stage)',
    color: 'border-rose-200 bg-rose-50',
    entryYear: '2027',
    dates: [
      { date: '1 July 2026', event: 'Registration deadline (5pm)', certainty: 'confirmed' },
      { date: '2–4 September 2026', event: 'Round 1 entrance exam', certainty: 'confirmed' },
      { date: '28 September 2026', event: 'Round 1 results; top 300 invited to Round 2', certainty: 'confirmed' },
      { date: '5 October 2026', event: 'Round 2 exam', certainty: 'confirmed' },
      { date: '30 June 2026', event: 'Open Day (Year 5 only — book from 3 June 2026)', certainty: 'confirmed' },
      { date: '30 October 2026', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '1 March 2027', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.hbschool.org.uk/admissions/',
  },
  {
    id: 'sutton-set-2027',
    name: "Sutton Grammar Schools (SET) — 2027 Entry",
    schools: ["Wilson's School", "Sutton Grammar School", "Wallington County Grammar School", "Nonsuch High School for Girls", "Wallington High School for Girls"],
    examFormat: "Sutton Selective Eligibility Test (SET) + Stage 2",
    color: 'border-violet-200 bg-violet-50',
    entryYear: '2027',
    dates: [
      { date: 'May 2026', event: 'SET registration expected to open', certainty: 'pattern' },
      { date: 'August 2026', event: 'SET registration expected to close', certainty: 'pattern' },
      { date: '15 September 2026', event: 'Selective Eligibility Test (SET)', certainty: 'confirmed' },
      { date: 'October 2026', event: 'Stage 2 exams', certainty: 'pattern' },
      { date: '30 October 2026', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '1 March 2027', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.suttongrammar.sutton.sch.uk/admissions/',
  },
  {
    id: 'tiffin-2027',
    name: 'Tiffin School & Tiffin Girls — 2027 Entry',
    schools: ["Tiffin School", "Tiffin Girls' School"],
    examFormat: "School own papers (2-stage)",
    color: 'border-emerald-200 bg-emerald-50',
    entryYear: '2027',
    dates: [
      { date: 'June 2026', event: 'Stage 1 registration expected to open', certainty: 'pattern' },
      { date: 'September 2026', event: 'Stage 1 registration expected to close', certainty: 'pattern' },
      { date: 'October 2026', event: 'Stage 1 exams', certainty: 'pattern' },
      { date: 'November 2026', event: 'Stage 2 exams', certainty: 'pattern' },
      { date: '30 October 2026', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '1 March 2027', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.tiffinschool.co.uk/admissions/',
  },
  {
    id: 'bromley-2027',
    name: "St Olave's & Newstead Wood — 2027 Entry",
    schools: ["St Olave's Grammar School", "Newstead Wood School"],
    examFormat: "St Olave's SET + Stage 2 / GL Assessment (2-stage)",
    color: 'border-amber-200 bg-amber-50',
    entryYear: '2027',
    dates: [
      { date: '9 June 2026', event: "St Olave's registration opens", certainty: 'provisional' },
      { date: '30 June 2026', event: "Registration closes for both schools", certainty: 'provisional' },
      { date: '1 May 2026', event: 'Newstead Wood registration opens', certainty: 'confirmed' },
      { date: '18 September 2026', event: "St Olave's Stage 1 exam", certainty: 'provisional' },
      { date: '25–26 September 2026', event: 'Newstead Wood entrance exam', certainty: 'provisional' },
      { date: '13 November 2026', event: "St Olave's Stage 2 exam", certainty: 'provisional' },
      { date: '30 October 2026', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '1 March 2027', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.saintolaves.net/admissions',
  },
  {
    id: 'gloucestershire-2027',
    name: 'Gloucestershire Grammar Schools — 2027 Entry',
    schools: ["Pate's Grammar School", 'Plus 6 other Gloucestershire grammar schools'],
    examFormat: "GL Assessment (single test)",
    color: 'border-teal-200 bg-teal-50',
    entryYear: '2027',
    dates: [
      { date: '18 May 2026', event: 'Registration opens', certainty: 'confirmed' },
      { date: '26 June 2026', event: 'Registration closes', certainty: 'confirmed' },
      { date: '7 September 2026', event: 'Test centre arrangements sent to parents', certainty: 'confirmed' },
      { date: '12 September 2026', event: 'Gloucestershire Grammar Schools Entrance Test', certainty: 'confirmed' },
      { date: 'Mid-October 2026', event: 'Results sent to parents', certainty: 'confirmed' },
      { date: '31 October 2026', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '1 March 2027', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.gloucestershire.gov.uk/schooladmissions/grammar-schools/',
  },
  {
    id: 'redbridge-2027',
    name: 'Redbridge Grammar Schools — 2027 Entry',
    schools: ['Ilford County High School for Boys', 'Woodford County High School for Girls'],
    examFormat: "GL Assessment",
    color: 'border-cyan-200 bg-cyan-50',
    entryYear: '2027',
    dates: [
      { date: '30 April 2026', event: 'Open Evenings for both schools', certainty: 'confirmed' },
      { date: '1 May 2026', event: 'Registration opens', certainty: 'confirmed' },
      { date: '15 June 2026 (5pm)', event: 'Registration closes', certainty: 'confirmed' },
      { date: '18 September 2026', event: '11+ test day', certainty: 'confirmed' },
      { date: 'Mid-October 2026', event: 'Results emailed to parents', certainty: 'confirmed' },
      { date: '30 October 2026', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '1 March 2027', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.redbridge.gov.uk/schools/redbridge-11-plus/',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ExamDatesPage() {
  const [show2026, setShow2026] = useState(false);

  return (
    <>
      <SiteNav />

      <main className="bg-white min-h-screen">

        {/* ── Hero ── */}
        <section className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 pt-20 pb-14 px-4 border-b border-slate-100">
          <div className="max-w-5xl mx-auto">

            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-indigo-200">
              <Calendar size={12} /> Key Dates
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              11+ Exam Dates 2026–2027
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed mb-6">
              Registration deadlines, test dates and results timelines for the most competitive 11+ grammar school entrance exams.
              Updated February 2026 — showing <strong className="text-slate-700">2027 entry dates</strong> (the upcoming cycle) with 2026 entry archived below.
            </p>

            {/* Legend */}
            <div className="flex flex-wrap gap-3">
              {[
                { certainty: 'confirmed' as const, label: 'Officially confirmed by school or authority' },
                { certainty: 'provisional' as const, label: 'Highly likely based on prior years and partial announcements' },
                { certainty: 'pattern' as const, label: 'Expected based on established annual pattern — check school website' },
              ].map((l) => (
                <div key={l.certainty} className="flex items-center gap-2">
                  <CertaintyBadge certainty={l.certainty} />
                  <span className="text-xs text-slate-500">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Disclaimer ── */}
        <div className="max-w-5xl mx-auto px-4 pt-8 pb-2">
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
            <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>Always verify dates with the school directly.</strong> Dates can change without notice.
              Registration deadlines in particular are strict — late applications are typically not accepted under any circumstances.
              Always check the school&apos;s official admissions page before acting on any date listed here.
            </p>
          </div>
        </div>

        {/* ── 2027 Entry (CURRENT CYCLE — shown first) ── */}
        <section className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-black text-slate-900">September 2027 Entry</h2>
            <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-black rounded-full uppercase tracking-wide">Current cycle</span>
          </div>
          <p className="text-slate-500 text-sm mb-7">
            For children currently in Year 4 (born September 2015 – August 2016).
            Registration for most schools opens May–June 2026. Exams take place September–November 2026. Offers confirmed 1 March 2027.
          </p>

          <div className="space-y-5">
            {GROUPS_2027_ENTRY.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </section>

        {/* ── 2026 Entry (ARCHIVED — collapsed by default) ── */}
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <button
            onClick={() => setShow2026(!show2026)}
            className="flex items-center gap-3 w-full text-left group"
          >
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-black text-slate-400 group-hover:text-slate-600 transition-colors">September 2026 Entry</h2>
              <span className="px-3 py-1 bg-slate-100 text-slate-400 text-xs font-black rounded-full uppercase tracking-wide">Archive — offers 2 Mar 2026</span>
            </div>
            <ChevronDown
              size={18}
              className={`text-slate-400 transition-transform duration-200 ml-auto ${show2026 ? 'rotate-180' : ''}`}
            />
          </button>
          <p className="text-slate-400 text-sm mt-1 mb-4">
            Exams for this cycle took place in September–November 2025. Shown for reference only.
          </p>

          {show2026 && (
            <div className="space-y-5 mt-4 opacity-75">
              {GROUPS_2026_ENTRY.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          )}
        </section>

        {/* ── CTA ── */}
        <section className="bg-indigo-50 border-t border-indigo-100 py-14 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-black text-slate-900 mb-3">
              Start preparing now
            </h2>
            <p className="text-slate-500 mb-6">
              Registration for most 2027 entry schools opens May–June 2026. Use the next few months to build a strong foundation.
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function CertaintyBadge({ certainty }: { certainty: Certainty }) {
  if (certainty === 'confirmed') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 rounded-full">
        <CheckCircle size={8} /> Confirmed
      </span>
    );
  }
  if (certainty === 'provisional') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100 border border-amber-200 px-1.5 py-0.5 rounded-full">
        <Info size={8} /> Provisional
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-full">
      <Clock size={8} /> Pattern
    </span>
  );
}

function GroupCard({ group }: { group: SchoolGroup }) {
  return (
    <div className={`rounded-2xl border-2 ${group.color} overflow-hidden`}>
      {/* Header */}
      <div className="p-5 border-b border-slate-200 bg-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-black text-slate-900 text-base leading-snug">{group.name}</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">{group.examFormat}</p>
          </div>
          <a
            href={group.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
          >
            Official site <ExternalLink size={11} />
          </a>
        </div>

        {/* Schools list */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {group.schools.map((s) => (
            <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] font-medium rounded-full">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Dates table */}
      <div className="divide-y divide-slate-100 bg-white">
        {group.dates.map((d, i) => (
          <div key={i} className="flex items-start gap-3 px-5 py-3">
            <div className="w-36 shrink-0">
              <span className="text-sm font-bold text-slate-800">{d.date}</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm text-slate-600">{d.event}</span>
            </div>
            <div className="shrink-0">
              <CertaintyBadge certainty={d.certainty} />
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      {group.note && (
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
          <p className="text-xs text-slate-500 leading-relaxed italic">{group.note}</p>
        </div>
      )}
    </div>
  );
}