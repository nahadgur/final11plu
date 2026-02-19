'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, GraduationCap, Building2, MapPin, ChevronRight } from 'lucide-react';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { SCHOOLS } from '@/lib/schools';

export default function SchoolsIndexPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'grammar' | 'private'>('all');

  const filtered = useMemo(() => {
    return SCHOOLS.filter((s) => {
      const q = search.toLowerCase();
      const matchesSearch = s.name.toLowerCase().includes(q) || (s as any).shortName?.toLowerCase().includes(q);
      const matchesFilter = filter === 'all' || s.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const grammar = filtered.filter((s) => s.category === 'grammar');
  const private_ = filtered.filter((s) => s.category === 'private');

  return (
    <>
      <SiteNav />
      <main className="bg-white min-h-screen">

        <section className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 pt-20 pb-14 px-4 border-b border-slate-100">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-indigo-200">
              <GraduationCap size={12} /> School Profiles
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">11+ School Profiles</h1>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
              Exam format, subjects tested, entry process and mock exam availability for {SCHOOLS.length} grammar and independent schools across the UK.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search schools…" value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white" />
            </div>
            <div className="flex gap-2">
              {(['all', 'grammar', 'private'] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold capitalize transition-all border ${filter === f ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}>
                  {f === 'all' ? 'All' : f === 'grammar' ? 'Grammar' : 'Independent'}
                </button>
              ))}
            </div>
          </div>

          {grammar.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap size={18} className="text-indigo-600" />
                <h2 className="text-lg font-black text-slate-900">Grammar Schools</h2>
                <span className="px-2 py-0.5 text-xs font-bold bg-indigo-100 text-indigo-700 rounded-full">{grammar.length}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {grammar.map((s) => (
                  <Link key={s.id} href={`/schools/${s.id}`}
                    className="group p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm bg-white transition-all">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-black text-slate-900 text-sm leading-snug group-hover:text-indigo-700 transition-colors">{s.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                          <MapPin size={10} />{(s as any).location?.area || (s as any).location?.city || ''}
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-400 shrink-0 mt-0.5 transition-colors" />
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100">
                        {(s as any).examFormat?.split(' ')[0] || 'Grammar'}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-500 rounded-full">
                        {(s as any).gender === 'boys' ? '♂ Boys' : (s as any).gender === 'girls' ? '♀ Girls' : '⚥ Mixed'}
                      </span>
                      {(s as any).hasBlueprint && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">Mock available</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {private_.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-2 mb-4">
                <Building2 size={18} className="text-emerald-600" />
                <h2 className="text-lg font-black text-slate-900">Independent Schools</h2>
                <span className="px-2 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-full">{private_.length}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {private_.map((s) => (
                  <Link key={s.id} href={`/schools/${s.id}`}
                    className="group p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-sm bg-white transition-all">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-black text-slate-900 text-sm leading-snug group-hover:text-emerald-700 transition-colors">{s.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                          <MapPin size={10} />{(s as any).location?.area || (s as any).location?.city || ''}
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-emerald-400 shrink-0 mt-0.5 transition-colors" />
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">Independent</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-500 rounded-full">
                        {(s as any).gender === 'boys' ? '♂ Boys' : (s as any).gender === 'girls' ? '♀ Girls' : '⚥ Mixed'}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
