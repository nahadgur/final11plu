'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  GraduationCap, Building2, MapPin, BookOpen, Users,
  Calendar, FileText, ChevronRight, ExternalLink, CheckCircle, Rocket,
} from 'lucide-react';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { SCHOOLS } from '@/lib/schools';

// ─── Static data for known schools ───────────────────────────────────────────
// Sources: official school admissions pages only. No unofficial claims made.

interface SchoolDetail {
  admissionsUrl?: string;
  entryStages?: string;
  placesAvailable?: string;
  examNotes?: string;
  registrationWindow?: string;
  resultsTimeline?: string;
  catchmentArea?: string | boolean;
}

const SCHOOL_DETAILS: Record<string, SchoolDetail> = {
  'qe-boys': {
    admissionsUrl: 'https://www.qebarnet.co.uk/admissions-information/admissions/',
    entryStages: 'Stage 1 (GL Assessment papers) → results → CAF',
    placesAvailable: '180 per year',
    examNotes: 'Two papers: English (inc. comprehension) and Maths, each approx. 50 minutes. All multiple-choice. GL Assessment. No VR/NVR at Stage 1.',
    registrationWindow: 'Opens ~1 May, closes ~11 July (Year 5)',
    resultsTimeline: 'Early October; National Offers Day 1 March',
    catchmentArea: false,
  },
  'henrietta-barnett': {
    admissionsUrl: 'https://www.hbschool.org.uk/admissions/',
    entryStages: 'Round 1 (GL Assessment — VR, NVR, English) → top 300 → Round 2 (school-set Maths & English)',
    placesAvailable: '120 per year',
    examNotes: 'Round 1 is GL Assessment multiple-choice covering English, Verbal Reasoning and Non-Verbal Reasoning. Round 2 is set by the school and tests Maths and English comprehension/writing. HBS does not release Round 2 past papers.',
    registrationWindow: 'Opens 1 April, closes 11 July (Year 5)',
    resultsTimeline: 'Round 1 results late September; Round 2 early October; Offers 1 March',
    catchmentArea: 'No catchment for Round 1. Post-Round 2, priority given to candidates within 3 miles.',
  },
  'wilsons': {
    admissionsUrl: 'https://www.wilsons.school/admissions/',
    entryStages: 'Sutton SET (Stage 1, shared) → Stage 2 (Wilson\'s-specific) → CAF',
    placesAvailable: '180 per year',
    examNotes: 'SET tests Maths and English only (no VR/NVR). Stage 2 includes Maths, English and aptitude tests for Sport and Music. SET registration is shared across all Sutton grammar schools.',
    registrationWindow: 'SET registration opens 1 May, closes 1 August (Year 5)',
    resultsTimeline: 'SET late September; Stage 2 early October; Offers 1 March',
    catchmentArea: 'No catchment area. Places offered by score across the country.',
  },
  'tiffin-girls': {
    admissionsUrl: 'https://www.tiffingirls.org/admissions/year-7/',
    entryStages: 'Stage 1 (school-set English & Maths) → top ~450 → Stage 2 (written papers)',
    placesAvailable: '180 per year',
    examNotes: 'Both stages set by the school. Stage 1 is partly multiple-choice. Stage 2 is written and not released publicly. Combined score weighted 60% English, 40% Maths.',
    registrationWindow: 'Opens 3 June, closes 1 September (Year 5)',
    resultsTimeline: 'Stage 1 results 15 October; Stage 2 November; Offers 1 March',
    catchmentArea: 'Yes — 44 defined postal districts. Most places go to children in the catchment area.',
  },
  'tiffin': {
    admissionsUrl: 'https://www.tiffinschool.co.uk/admissions/year-7-admissions/',
    entryStages: 'Stage 1 (school-set English & Maths) → top ~450 → Stage 2 (written papers)',
    placesAvailable: '180 per year',
    examNotes: 'Stage 1 Maths includes a mix of multiple-choice and grid-answer questions. Stage 2 papers are written and not released publicly. Up to 10% of places reserved for Music/Sport aptitude.',
    registrationWindow: 'Opens 4 June, closes 3 September (Year 5)',
    resultsTimeline: 'Stage 1 results 15 October; Stage 2 November; Offers 1 March',
    catchmentArea: 'Yes — Inner Priority Area (<10km) and Outer Priority Area (10–14km from school).',
  },
  'st-olaves': {
    admissionsUrl: 'https://www.saintolaves.net/admissions',
    entryStages: "SET Stage 1 (VR, NVR, Maths, English) → top 450 → Stage 2 (Maths & English written)",
    placesAvailable: '124 per year',
    examNotes: "Stage 1 (SET) is a 1-hour multiple-choice paper with approx. 60 questions across four sections. Top 450 sit Stage 2 which consists of two 1-hour written papers set by the school. No past papers released for Stage 2.",
    registrationWindow: 'Closes 9 July (Year 5)',
    resultsTimeline: 'Stage 1 results mid-October; Stage 2 14 November; Offers 1 March',
    catchmentArea: false,
  },
  'sutton-grammar': {
    admissionsUrl: 'https://www.suttongrammar.sutton.sch.uk/admissions/',
    entryStages: 'Sutton SET (Stage 1) → Stage 2 (shared with Wilson\'s and Wallington County)',
    placesAvailable: '120 per year (boys only)',
    examNotes: 'SET tests Maths and English only. Stage 2 is a written exam shared with Wilson\'s and Wallington County Grammar. Each school applies its own weighting and pass mark to the combined scores.',
    registrationWindow: 'SET opens 1 May, closes 1 August (Year 5)',
    resultsTimeline: 'SET late September; Stage 2 early October; Offers 1 March',
    catchmentArea: false,
  },
  'nonsuch': {
    admissionsUrl: 'https://www.nonsuchschool.org/admissions/',
    entryStages: 'Sutton SET (Stage 1) → NWSEE Stage 2 (shared with Wallington Girls)',
    placesAvailable: '120 per year (girls only)',
    examNotes: 'The Nonsuch and Wallington Second Stage Entrance Examination (NWSEE) is shared between Nonsuch and Wallington High School for Girls. Stage 2 consists of English (extended writing) and Maths (written). No comprehension in Stage 2 English.',
    registrationWindow: 'SET opens 1 May, closes 1 August (Year 5)',
    resultsTimeline: 'SET late September; Stage 2 October; Offers 1 March',
    catchmentArea: false,
  },
};

export default function SchoolProfilePage({ params }: { params: { id: string } }) {
  const school = SCHOOLS.find((s) => s.id === params.id);
  if (!school) notFound();

  const s = school as any;
  const detail = SCHOOL_DETAILS[school.id];
  const isGrammar = school.category === 'grammar';
  const accentColor = isGrammar ? 'indigo' : 'emerald';

  const subjectLabels: Record<string, string> = {
    maths: 'Maths',
    english: 'English',
    'verbal-reasoning': 'Verbal Reasoning',
    'non-verbal-reasoning': 'Non-Verbal Reasoning',
  };

  return (
    <>
      <SiteNav />
      <main className="bg-white min-h-screen">

        {/* Hero */}
        <section className={`bg-gradient-to-br from-${accentColor}-50 via-white to-${accentColor}-50 pt-20 pb-12 px-4 border-b border-slate-100`}>
          <div className="max-w-4xl mx-auto">
            <Link
              href="/schools"
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600 mb-5 transition-colors"
            >
              ← All Schools
            </Link>

            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-${accentColor}-100 flex items-center justify-center shrink-0`}>
                {isGrammar
                  ? <GraduationCap size={28} className={`text-${accentColor}-600`} />
                  : <Building2 size={28} className={`text-${accentColor}-600`} />
                }
              </div>
              <div>
                <div className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-full bg-${accentColor}-100 text-${accentColor}-700 border border-${accentColor}-200 mb-2`}>
                  {isGrammar ? 'Grammar School' : 'Independent School'}
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">{school.name}</h1>
                {s.location && (
                  <div className="flex items-center gap-1.5 mt-2 text-slate-500 text-sm">
                    <MapPin size={14} />
                    <span>{s.location.area || s.location.city}</span>
                    {s.gender && (
                      <span className="ml-2 px-2 py-0.5 text-[11px] font-bold bg-slate-100 text-slate-500 rounded-full">
                        {s.gender === 'boys' ? 'Boys' : s.gender === 'girls' ? 'Girls' : 'Mixed'}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {detail?.admissionsUrl && (
              <a
                href={detail.admissionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:border-slate-300 hover:shadow-sm transition-all"
              >
                <ExternalLink size={14} className="text-slate-400" />
                Official Admissions Page
              </a>
            )}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Exam format */}
            <div className="rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={16} className="text-indigo-500" />
                <h2 className="font-black text-slate-900">Exam Format</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Provider</span>
                  <p className="text-slate-700 font-semibold mt-0.5">{s.examFormat || 'See admissions page'}</p>
                </div>
                {detail?.entryStages && (
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Entry stages</span>
                    <p className="text-slate-700 mt-0.5 leading-relaxed">{detail.entryStages}</p>
                  </div>
                )}
                {detail?.examNotes && (
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">What's tested</span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed text-[13px]">{detail.examNotes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Subjects */}
            <div className="rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle size={16} className="text-emerald-500" />
                <h2 className="font-black text-slate-900">Subjects Tested</h2>
              </div>
              {s.subjects && s.subjects.length > 0 ? (
                <div className="space-y-2">
                  {s.subjects.map((sub: string) => (
                    <div key={sub} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                      <span className="text-sm text-slate-700 font-medium">{subjectLabels[sub] || sub}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">Check official admissions page for subjects</p>
              )}

              {s.entryPoints && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Entry points</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {s.entryPoints.map((e: string) => (
                      <span key={e} className="px-2.5 py-1 text-xs font-bold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">{e}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Key dates */}
            <div className="rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={16} className="text-amber-500" />
                <h2 className="font-black text-slate-900">Key Dates (Typical)</h2>
              </div>
              <div className="space-y-3 text-sm">
                {detail?.registrationWindow && (
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Registration</span>
                    <p className="text-slate-700 mt-0.5">{detail.registrationWindow}</p>
                  </div>
                )}
                {detail?.resultsTimeline && (
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Results & offers</span>
                    <p className="text-slate-700 mt-0.5">{detail.resultsTimeline}</p>
                  </div>
                )}
                {!detail?.registrationWindow && (
                  <p className="text-sm text-slate-400 italic">See the official admissions page for confirmed dates each year.</p>
                )}
                <Link
                  href="/exam-dates"
                  className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors mt-1"
                >
                  View full exam dates calendar <ChevronRight size={12} />
                </Link>
              </div>
            </div>

            {/* Admissions info */}
            <div className="rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Users size={16} className="text-violet-500" />
                <h2 className="font-black text-slate-900">Admissions Info</h2>
              </div>
              <div className="space-y-3 text-sm">
                {detail?.placesAvailable && (
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Places available</span>
                    <p className="text-slate-700 font-semibold mt-0.5">{detail.placesAvailable}</p>
                  </div>
                )}
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Catchment area</span>
                  <p className="text-slate-700 mt-0.5">
                    {detail?.catchmentArea === false
                      ? 'No catchment area — open to all applicants nationally'
                      : detail?.catchmentArea === true
                      ? 'Yes — check the school\'s admissions policy'
                      : typeof detail?.catchmentArea === 'string'
                      ? detail.catchmentArea
                      : 'Check official admissions page'}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Selective</span>
                  <p className="text-slate-700 mt-0.5">{s.selective ? 'Yes — entrance exam required' : 'Partially selective — check admissions'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href={`/mock-exams?mode=school&school=${school.id}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 transition-opacity shadow-md shadow-indigo-200"
            >
              <Rocket size={18} />
              {s.hasBlueprint ? 'Start school-specific mock' : 'Try a general 11+ mock'}
            </Link>
            <Link
              href="/papers"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black text-slate-700 bg-white border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <FileText size={16} />
              Browse past papers
            </Link>
          </div>

          {!SCHOOL_DETAILS[school.id] && (
            <div className="mt-8 p-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-500 leading-relaxed">
              Detailed profile information for {school.name} is coming soon. 
              In the meantime, visit the school's official admissions page for the most accurate and up-to-date entry requirements.
            </div>
          )}
        </section>

        {/* Related schools */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-lg font-black text-slate-900 mb-4">Related schools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SCHOOLS.filter((rs) => rs.id !== school.id && rs.category === school.category).slice(0, 4).map((rs) => (
              <Link key={rs.id} href={`/schools/${rs.id}`}
                className="p-3 rounded-xl border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 transition-all group text-center">
                <div className="text-sm font-bold text-slate-700 group-hover:text-indigo-700 transition-colors leading-snug">
                  {(rs as any).shortName || rs.name}
                </div>
                <div className="text-xs text-slate-400 mt-1">{(rs as any).location?.city}</div>
              </Link>
            ))}
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
