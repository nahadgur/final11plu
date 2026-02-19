'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Plus, GraduationCap, Building2, MapPin, BookOpen, Users, ChevronRight, Rocket } from 'lucide-react';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { SCHOOLS } from '@/lib/schools';

const MAX_COMPARE = 3;

function SchoolCard({ school, onRemove }: { school: any; onRemove: () => void }) {
  const isGrammar = school.category === 'grammar';

  const subjectLabels: Record<string, string> = {
    maths: 'Maths',
    english: 'English',
    'verbal-reasoning': 'VR',
    'non-verbal-reasoning': 'NVR',
  };

  return (
    <div className="relative bg-white rounded-2xl border-2 border-slate-200 overflow-hidden flex-1 min-w-[220px]">
      {/* Remove button */}
      <button
        onClick={onRemove}
        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
      >
        <X size={14} className="text-slate-500" />
      </button>

      {/* Header */}
      <div className={`p-5 ${isGrammar ? 'bg-indigo-50 border-b border-indigo-100' : 'bg-emerald-50 border-b border-emerald-100'}`}>
        <div className={`w-10 h-10 rounded-xl ${isGrammar ? 'bg-indigo-100' : 'bg-emerald-100'} flex items-center justify-center mb-3`}>
          {isGrammar
            ? <GraduationCap size={20} className="text-indigo-600" />
            : <Building2 size={20} className="text-emerald-600" />
          }
        </div>
        <h3 className="font-black text-slate-900 text-sm leading-snug pr-6">{school.name}</h3>
        <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
          <MapPin size={10} />{school.location?.area || school.location?.city}
        </div>
      </div>

      {/* Details */}
      <div className="p-5 space-y-4 text-sm">
        <div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-wide mb-1">Type</div>
          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${isGrammar ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
            {isGrammar ? 'Grammar' : 'Independent'}
          </span>
        </div>

        <div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-wide mb-1">Gender</div>
          <span className="text-slate-700 font-medium">
            {school.gender === 'boys' ? 'Boys' : school.gender === 'girls' ? 'Girls' : 'Mixed'}
          </span>
        </div>

        <div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-wide mb-1">Exam Format</div>
          <span className="text-slate-600 leading-relaxed">{school.examFormat || '—'}</span>
        </div>

        <div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-wide mb-1.5">Subjects Tested</div>
          <div className="flex flex-wrap gap-1.5">
            {(school.subjects || []).map((sub: string) => (
              <span key={sub} className="px-2 py-0.5 text-[11px] font-bold bg-slate-100 text-slate-600 rounded-full">
                {subjectLabels[sub] || sub}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-wide mb-1">Entry Points</div>
          <div className="flex flex-wrap gap-1.5">
            {(school.entryPoints || ['11+']).map((e: string) => (
              <span key={e} className="px-2 py-0.5 text-[11px] font-bold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">{e}</span>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-wide mb-1">Mock Available</div>
          <span className={`text-sm font-bold ${school.hasBlueprint ? 'text-emerald-600' : 'text-slate-400'}`}>
            {school.hasBlueprint ? '✓ Yes' : 'Coming soon'}
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <Link
          href={`/schools/${school.id}`}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          View full profile <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}

function AddSchoolSlot({ onAdd, selected }: { onAdd: (id: string) => void; selected: string[] }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const available = SCHOOLS.filter(
    (s) =>
      !selected.includes(s.id) &&
      (s.name.toLowerCase().includes(search.toLowerCase()) ||
        (s as any).shortName?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="relative flex-1 min-w-[220px]">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full h-full min-h-[300px] rounded-2xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-indigo-500"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
            <Plus size={22} />
          </div>
          <span className="text-sm font-bold">Add a school</span>
        </button>
      ) : (
        <div className="bg-white rounded-2xl border-2 border-indigo-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <input
              autoFocus
              type="text"
              placeholder="Search school…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {available.slice(0, 20).map((s) => (
              <button
                key={s.id}
                onClick={() => { onAdd(s.id); setOpen(false); setSearch(''); }}
                className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition-colors border-b border-slate-50 last:border-0"
              >
                <div className="text-sm font-bold text-slate-800">{s.name}</div>
                <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                  <MapPin size={9} />{(s as any).location?.area || (s as any).location?.city}
                  <span className="ml-2">{s.category === 'grammar' ? 'Grammar' : 'Independent'}</span>
                </div>
              </button>
            ))}
            {available.length === 0 && (
              <div className="px-4 py-6 text-center text-slate-400 text-sm">No schools found</div>
            )}
          </div>
          <div className="p-3 border-t border-slate-100">
            <button onClick={() => { setOpen(false); setSearch(''); }} className="text-xs text-slate-400 hover:text-slate-600 font-bold">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selected = selectedIds.map((id) => SCHOOLS.find((s) => s.id === id)).filter(Boolean) as any[];

  const add = (id: string) => {
    if (selectedIds.length < MAX_COMPARE) setSelectedIds([...selectedIds, id]);
  };

  const remove = (id: string) => setSelectedIds(selectedIds.filter((s) => s !== id));

  const slotsToShow = MAX_COMPARE - selected.length;

  return (
    <>
      <SiteNav />
      <main className="bg-white min-h-screen">

        {/* Hero */}
        <section className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 pt-20 pb-14 px-4 border-b border-slate-100">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-indigo-200">
              Compare Schools
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Compare 11+ Schools
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl">
              Select up to {MAX_COMPARE} schools to compare exam format, subjects tested, entry points and mock exam availability side-by-side.
            </p>
          </div>
        </section>

        {/* Comparison grid */}
        <section className="max-w-5xl mx-auto px-4 py-10">
          {selected.length === 0 && (
            <p className="text-center text-slate-400 text-sm mb-6">Add up to {MAX_COMPARE} schools to start comparing.</p>
          )}

          <div className="flex gap-4 overflow-x-auto pb-4">
            {/* Selected schools */}
            {selected.map((school) => (
              <SchoolCard key={school.id} school={school} onRemove={() => remove(school.id)} />
            ))}

            {/* Empty slots */}
            {Array.from({ length: slotsToShow }).map((_, i) => (
              <AddSchoolSlot key={i} onAdd={add} selected={selectedIds} />
            ))}
          </div>

          {selected.length >= 2 && (
            <div className="mt-8 p-5 bg-indigo-50 border border-indigo-100 rounded-2xl text-center">
              <p className="text-sm text-indigo-700 font-medium mb-3">
                Ready to practise? Try a mock exam tailored to one of these schools.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {selected.map((s) => (
                  <Link
                    key={s.id}
                    href={`/mock-exams?mode=school&school=${s.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                  >
                    <Rocket size={14} /> Mock for {s.shortName || s.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Browse all */}
          <div className="mt-10 text-center">
            <Link href="/schools" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              Browse all school profiles <ChevronRight size={16} />
            </Link>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
