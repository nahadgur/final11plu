'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FileText, Download, Search, Filter, GraduationCap,
  Building2, ChevronRight, AlertCircle, BookOpen, ExternalLink,
} from 'lucide-react';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';

// ─── Types ────────────────────────────────────────────────────────────────────

type PaperStatus = 'available' | 'coming-soon' | 'official-only';

interface Paper {
  label: string;
  year?: string;
  type: 'sample' | 'past' | 'familiarisation';
  status: PaperStatus;
  filename?: string; // e.g. "qe-boys-sample-2023-maths.pdf" — to be added per school
  officialUrl?: string; // for schools that host their own papers
}

interface SchoolPapers {
  id: string;
  name: string;
  shortName: string;
  category: 'grammar' | 'private';
  examFormat: string;
  location: string;
  gender: 'boys' | 'girls' | 'mixed';
  papers: Paper[];
  officialAdmissionsUrl?: string;
  note?: string;
}

// ─── School paper data ────────────────────────────────────────────────────────
// Papers with status='available' need a matching PDF placed in /public/papers/<filename>
// Papers with status='official-only' link to the school's own admissions page

const SCHOOL_PAPERS: SchoolPapers[] = [
  // ── GRAMMAR SCHOOLS ──────────────────────────────────────────────────────
  {
    id: 'qe-boys',
    name: "Queen Elizabeth's School (Barnet)",
    shortName: 'QE Barnet',
    category: 'grammar',
    examFormat: 'GL Assessment (2-stage)',
    location: 'Barnet, North London',
    gender: 'boys',
    officialAdmissionsUrl: 'https://www.qebarnet.co.uk/admissions-information/admissions/',
    papers: [
      { label: 'GL Assessment Familiarisation Pack', type: 'familiarisation', status: 'coming-soon' },
      { label: 'Stage 1 – Maths Sample', type: 'sample', status: 'coming-soon' },
      { label: 'Stage 1 – English Sample', type: 'sample', status: 'coming-soon' },
    ],
    note: 'QE uses GL Assessment papers. GL familiarisation booklets are freely available from GL Assessment directly.',
  },
  {
    id: 'henrietta-barnett',
    name: 'The Henrietta Barnett School',
    shortName: 'HBS',
    category: 'grammar',
    examFormat: 'GL Assessment (2-stage)',
    location: 'Hampstead Garden Suburb, North London',
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.hbschool.org.uk/admissions/',
    papers: [
      { label: 'GL Assessment Familiarisation Pack', type: 'familiarisation', status: 'coming-soon' },
    ],
    note: 'HBS does not release Round 2 past papers. GL familiarisation booklets are linked from their admissions page.',
  },
  {
    id: 'wilsons',
    name: "Wilson's School",
    shortName: "Wilson's",
    category: 'grammar',
    examFormat: 'Sutton SET (2-stage)',
    location: 'Wallington, Sutton',
    gender: 'boys',
    officialAdmissionsUrl: 'https://www.wilsons.school/admissions/',
    papers: [
      { label: 'SET Sample – Maths', type: 'sample', status: 'coming-soon' },
      { label: 'SET Sample – English', type: 'sample', status: 'coming-soon' },
      { label: 'Stage 2 – Maths Sample', type: 'sample', status: 'coming-soon' },
      { label: 'Stage 2 – English Sample', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'tiffin-girls',
    name: "Tiffin Girls' School",
    shortName: 'Tiffin Girls',
    category: 'grammar',
    examFormat: 'School own papers (2-stage)',
    location: 'Kingston upon Thames',
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.tiffingirls.org/admissions/year-7/',
    papers: [
      { label: 'Stage 1 – Maths Sample', type: 'sample', status: 'coming-soon' },
      { label: 'Stage 1 – English Sample', type: 'sample', status: 'coming-soon' },
    ],
    note: 'Tiffin Girls sets its own papers. Stage 2 is not released publicly.',
  },
  {
    id: 'tiffin',
    name: 'Tiffin School',
    shortName: 'Tiffin',
    category: 'grammar',
    examFormat: 'School own papers (2-stage)',
    location: 'Kingston upon Thames',
    gender: 'boys',
    officialAdmissionsUrl: 'https://www.tiffinschool.co.uk/admissions/year-7-admissions/',
    papers: [
      { label: 'Stage 1 – Maths Sample', type: 'sample', status: 'coming-soon' },
      { label: 'Stage 1 – English Sample', type: 'sample', status: 'coming-soon' },
    ],
    note: 'Tiffin sets its own papers. Stage 2 is not released publicly.',
  },
  {
    id: 'st-olaves',
    name: "St Olave's Grammar School",
    shortName: "St Olave's",
    category: 'grammar',
    examFormat: 'St Olave\'s SET (2-stage)',
    location: 'Orpington, Bromley',
    gender: 'boys',
    officialAdmissionsUrl: 'https://www.saintolaves.net/admissions',
    papers: [
      { label: 'SET Stage 1 – Sample Paper', type: 'sample', status: 'coming-soon' },
    ],
    note: "St Olave's Stage 2 (Maths/English written) is not released publicly.",
  },
  {
    id: 'latymer',
    name: 'The Latymer School',
    shortName: 'Latymer',
    category: 'grammar',
    examFormat: 'GL Assessment',
    location: 'Edmonton, North London',
    gender: 'mixed',
    officialAdmissionsUrl: 'https://www.latymer.co.uk/admissions/',
    papers: [
      { label: 'GL Assessment Familiarisation Pack', type: 'familiarisation', status: 'coming-soon' },
    ],
  },
  {
    id: 'nonsuch',
    name: 'Nonsuch High School for Girls',
    shortName: 'Nonsuch',
    category: 'grammar',
    examFormat: 'Sutton SET (2-stage)',
    location: 'Cheam, Sutton',
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.nonsuchschool.org/admissions/',
    papers: [
      { label: 'SET Sample – Maths', type: 'sample', status: 'coming-soon' },
      { label: 'SET Sample – English', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'wallington-girls',
    name: 'Wallington High School for Girls',
    shortName: 'Wallington Girls',
    category: 'grammar',
    examFormat: 'Sutton SET (2-stage)',
    location: 'Wallington, Sutton',
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.wallingtongirls.org.uk/admissions/',
    papers: [
      { label: 'SET Sample – Maths', type: 'sample', status: 'coming-soon' },
      { label: 'SET Sample – English', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'sutton-grammar',
    name: 'Sutton Grammar School',
    shortName: 'Sutton Grammar',
    category: 'grammar',
    examFormat: 'Sutton SET (2-stage)',
    location: 'Sutton, Surrey',
    gender: 'boys',
    officialAdmissionsUrl: 'https://www.suttongrammar.sutton.sch.uk/admissions/',
    papers: [
      { label: 'SET Sample – Maths', type: 'sample', status: 'coming-soon' },
      { label: 'SET Sample – English', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'colchester-rgs',
    name: 'Colchester Royal Grammar School',
    shortName: 'CRGS',
    category: 'grammar',
    examFormat: 'CSSE (Essex)',
    location: 'Colchester, Essex',
    gender: 'boys',
    officialAdmissionsUrl: 'https://www.crgs.co.uk/admissions/',
    papers: [
      { label: 'CSSE Sample Paper – English', type: 'sample', status: 'coming-soon' },
      { label: 'CSSE Sample Paper – Maths', type: 'sample', status: 'coming-soon' },
    ],
    note: 'CRGS uses CSSE (Consortium of Selective Schools in Essex) papers.',
  },
  {
    id: 'altrincham-girls',
    name: 'Altrincham Grammar School for Girls',
    shortName: 'AGGS',
    category: 'grammar',
    examFormat: 'CEM (Trafford)',
    location: 'Altrincham, Greater Manchester',
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.aggs.trafford.sch.uk/admissions/',
    papers: [
      { label: 'CEM Familiarisation Pack', type: 'familiarisation', status: 'coming-soon' },
    ],
    note: 'Altrincham uses CEM Trafford papers. CEM no longer publish past papers — familiarisation materials only.',
  },
  {
    id: 'pates-grammar',
    name: "Pate's Grammar School",
    shortName: "Pate's",
    category: 'grammar',
    examFormat: 'GL Assessment',
    location: 'Cheltenham, Gloucestershire',
    gender: 'mixed',
    officialAdmissionsUrl: 'https://www.pates.gloucs.sch.uk/admissions/',
    papers: [
      { label: 'GL Assessment Familiarisation Pack', type: 'familiarisation', status: 'coming-soon' },
    ],
  },
  {
    id: 'king-edward-vi-girls',
    name: 'King Edward VI High School for Girls',
    shortName: 'KEHS Birmingham',
    category: 'grammar',
    examFormat: 'KEHS own papers (Maths, English, Reasoning)',
    location: 'Birmingham',
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.kehsbirmingham.org/admissions/',
    papers: [
      { label: 'KEHS Sample – Maths', type: 'sample', status: 'coming-soon' },
      { label: 'KEHS Sample – English', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'reading-school',
    name: 'Reading School',
    shortName: 'Reading School',
    category: 'grammar',
    examFormat: 'GL Assessment',
    location: 'Reading, Berkshire',
    gender: 'boys',
    officialAdmissionsUrl: 'https://www.reading-school.co.uk/admissions/',
    papers: [
      { label: 'GL Assessment Familiarisation Pack', type: 'familiarisation', status: 'coming-soon' },
    ],
  },
  {
    id: 'newstead-wood',
    name: 'Newstead Wood School',
    shortName: 'Newstead Wood',
    category: 'grammar',
    examFormat: 'GL Assessment (2-stage)',
    location: 'Orpington, Bromley',
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.newsteadwood.co.uk/admissions/',
    papers: [
      { label: 'GL Assessment Familiarisation Pack', type: 'familiarisation', status: 'coming-soon' },
    ],
  },

  // ── PRIVATE SCHOOLS ──────────────────────────────────────────────────────
  {
    id: 'spgs-girls',
    name: "St Paul's Girls' School",
    shortName: "SPGS",
    category: 'private',
    examFormat: 'SPGS own papers (Maths, English + interview)',
    location: "Brook Green, West London",
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.spgs.org/admissions/',
    papers: [
      { label: 'Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
    note: 'SPGS publish sample papers on their website. Full past papers are not released.',
  },
  {
    id: 'guildford-high',
    name: 'Guildford High School',
    shortName: 'Guildford High',
    category: 'private',
    examFormat: 'Own papers (3 subjects + General paper)',
    location: 'Guildford, Surrey',
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.guildfordhigh.co.uk/admissions/',
    papers: [
      { label: 'Sample Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'st-pauls',
    name: "St Paul's School",
    shortName: "St Paul's",
    category: 'private',
    examFormat: 'ISEB Pre-Test + own papers + interview',
    location: 'Barnes, West London',
    gender: 'boys',
    officialAdmissionsUrl: 'https://www.stpaulsschool.org.uk/admissions/',
    papers: [
      { label: 'ISEB Pre-Test Familiarisation', type: 'familiarisation', status: 'coming-soon' },
    ],
    note: "St Paul's uses the ISEB Pre-Test for initial screening, followed by its own papers.",
  },
  {
    id: 'nlcs-girls',
    name: 'North London Collegiate School',
    shortName: 'NLCS',
    category: 'private',
    examFormat: 'NLCS own papers (Maths, English + interview)',
    location: 'Edgware, North London',
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.nlcs.org.uk/admissions/',
    papers: [
      { label: 'Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'kcs-wimbledon',
    name: "King's College School (Wimbledon)",
    shortName: 'KCS Wimbledon',
    category: 'private',
    examFormat: 'KCS own papers (Maths, English, Reasoning + interview)',
    location: 'Wimbledon, South London',
    gender: 'boys',
    officialAdmissionsUrl: 'https://www.kcs.org.uk/admissions/',
    papers: [
      { label: 'Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'colsg-girls',
    name: 'City of London School for Girls',
    shortName: 'CLSG',
    category: 'private',
    examFormat: 'ISEB Pre-Test or own papers',
    location: 'Barbican, City of London',
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.clsg.org.uk/admissions/',
    papers: [
      { label: 'ISEB Pre-Test Familiarisation', type: 'familiarisation', status: 'coming-soon' },
    ],
  },
  {
    id: 'westminster',
    name: 'Westminster School',
    shortName: 'Westminster',
    category: 'private',
    examFormat: 'ISEB Pre-Test + own papers + interview',
    location: 'Westminster, Central London',
    gender: 'boys',
    officialAdmissionsUrl: 'https://www.westminster.org.uk/admissions/',
    papers: [
      { label: 'ISEB Pre-Test Familiarisation', type: 'familiarisation', status: 'coming-soon' },
    ],
    note: 'Westminster entry is primarily at 13+ via Common Entrance. 11+ places are very limited.',
  },
  {
    id: 'mcs-oxford',
    name: 'Magdalen College School (Oxford)',
    shortName: 'MCS Oxford',
    category: 'private',
    examFormat: 'MCS own papers (Maths, English + interview)',
    location: 'Oxford',
    gender: 'boys',
    officialAdmissionsUrl: 'https://www.mcsoxford.org/admissions/',
    papers: [
      { label: 'Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'cls-boys',
    name: 'City of London School',
    shortName: 'CLS',
    category: 'private',
    examFormat: 'CLS own papers (Maths, English)',
    location: 'Blackfriars, City of London',
    gender: 'boys',
    officialAdmissionsUrl: 'https://www.clsb.org.uk/admissions/',
    papers: [
      { label: 'Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'habs-boys',
    name: "Haberdashers' Boys' School",
    shortName: "Habs Boys",
    category: 'private',
    examFormat: 'Own papers (Maths, English, Reasoning)',
    location: 'Borehamwood, Hertfordshire',
    gender: 'boys',
    officialAdmissionsUrl: 'https://www.habsboys.org.uk/admissions/',
    papers: [
      { label: 'Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'habs-girls',
    name: "Haberdashers' Girls' School",
    shortName: "Habs Girls",
    category: 'private',
    examFormat: 'Own papers (Maths, English, Reasoning)',
    location: 'Borehamwood, Hertfordshire',
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.habsgirls.org.uk/admissions/',
    papers: [
      { label: 'Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'wycombe-abbey',
    name: 'Wycombe Abbey',
    shortName: 'Wycombe Abbey',
    category: 'private',
    examFormat: 'Own papers (Maths, English + interview)',
    location: 'High Wycombe, Buckinghamshire',
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.wycombeabbey.com/admissions/',
    papers: [
      { label: 'Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'tonbridge',
    name: 'Tonbridge School',
    shortName: 'Tonbridge',
    category: 'private',
    examFormat: 'ISEB Pre-Test + own papers + interview',
    location: 'Tonbridge, Kent',
    gender: 'boys',
    officialAdmissionsUrl: 'https://www.tonbridge-school.co.uk/admissions/',
    papers: [
      { label: 'ISEB Pre-Test Familiarisation', type: 'familiarisation', status: 'coming-soon' },
    ],
    note: 'Tonbridge primarily admits at 13+ via Common Entrance. 11+ entry is very limited.',
  },
  {
    id: 'godolphin-latymer',
    name: 'Godolphin and Latymer School',
    shortName: 'Godolphin',
    category: 'private',
    examFormat: 'Own papers (Maths, English + interview)',
    location: 'Hammersmith, West London',
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.godolphinandlatymer.com/admissions/',
    papers: [
      { label: 'Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'highgate',
    name: 'Highgate School',
    shortName: 'Highgate',
    category: 'private',
    examFormat: 'ISEB Pre-Test + own papers + interview',
    location: 'Highgate, North London',
    gender: 'mixed',
    officialAdmissionsUrl: 'https://www.highgateschool.org.uk/admissions/',
    papers: [
      { label: 'ISEB Pre-Test Familiarisation', type: 'familiarisation', status: 'coming-soon' },
    ],
  },
  {
    id: 'latymer-upper',
    name: 'Latymer Upper School',
    shortName: 'Latymer Upper',
    category: 'private',
    examFormat: 'Own papers (Maths, English + interview)',
    location: 'Hammersmith, West London',
    gender: 'mixed',
    officialAdmissionsUrl: 'https://www.latymer-upper.org/admissions/',
    papers: [
      { label: 'Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'jags',
    name: "James Allen's Girls' School",
    shortName: "JAGS",
    category: 'private',
    examFormat: 'Own papers (Maths, English + interview)',
    location: 'Dulwich, South London',
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.jags.org.uk/admissions/',
    papers: [
      { label: 'Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'eton',
    name: 'Eton College',
    shortName: 'Eton',
    category: 'private',
    examFormat: 'ISEB Pre-Test + own papers + interview',
    location: 'Windsor, Berkshire',
    gender: 'boys',
    officialAdmissionsUrl: 'https://www.etoncollege.com/admissions/',
    papers: [
      { label: 'ISEB Pre-Test Familiarisation', type: 'familiarisation', status: 'coming-soon' },
    ],
    note: 'Eton entry is at 13+ only. 11+ is not a standard entry point.',
  },
  {
    id: 'sevenoaks',
    name: 'Sevenoaks School',
    shortName: 'Sevenoaks',
    category: 'private',
    examFormat: 'Own papers + interview',
    location: 'Sevenoaks, Kent',
    gender: 'mixed',
    officialAdmissionsUrl: 'https://www.sevenoaksschool.org/admissions/',
    papers: [
      { label: 'Sample Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'wimbledon-high',
    name: 'Wimbledon High School',
    shortName: 'Wimbledon High',
    category: 'private',
    examFormat: 'GDST own papers (Maths, English, Reasoning)',
    location: 'Wimbledon, South London',
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.wimbledonhigh.gdst.net/admissions/',
    papers: [
      { label: 'GDST Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'GDST Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'oxford-high',
    name: 'Oxford High School (GDST)',
    shortName: 'Oxford High',
    category: 'private',
    examFormat: 'GDST own papers (Maths, English, Reasoning)',
    location: 'Oxford',
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.oxfordhigh.gdst.net/admissions/',
    papers: [
      { label: 'GDST Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'GDST Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'dulwich-college',
    name: 'Dulwich College',
    shortName: 'Dulwich College',
    category: 'private',
    examFormat: 'Own papers (Maths, English, Reasoning)',
    location: 'Dulwich, South London',
    gender: 'boys',
    officialAdmissionsUrl: 'https://www.dulwich.org.uk/admissions/',
    papers: [
      { label: 'Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'alleyn',
    name: "Alleyn's School",
    shortName: "Alleyn's",
    category: 'private',
    examFormat: 'Own papers (Maths, English, Reasoning)',
    location: 'Dulwich, South London',
    gender: 'mixed',
    officialAdmissionsUrl: 'https://www.alleyns.org.uk/admissions/',
    papers: [
      { label: 'Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'south-hampstead',
    name: 'South Hampstead High School',
    shortName: 'South Hampstead',
    category: 'private',
    examFormat: 'GDST own papers (Maths, English, Reasoning)',
    location: "Hampstead, North London",
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.shhs.gdst.net/admissions/',
    papers: [
      { label: 'GDST Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'GDST Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'notting-hill-ealing',
    name: 'Notting Hill and Ealing High School',
    shortName: 'NHEHS',
    category: 'private',
    examFormat: 'GDST own papers (Maths, English, Reasoning)',
    location: 'Ealing, West London',
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.nhehs.gdst.net/admissions/',
    papers: [
      { label: 'GDST Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'GDST Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'whitgift',
    name: 'Whitgift School',
    shortName: 'Whitgift',
    category: 'private',
    examFormat: 'Own papers (Maths, English, Reasoning)',
    location: 'Croydon, South London',
    gender: 'boys',
    officialAdmissionsUrl: 'https://www.whitgift.co.uk/admissions/',
    papers: [
      { label: 'Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'emmanuel-tiffin',
    name: 'Emanuel School',
    shortName: 'Emanuel',
    category: 'private',
    examFormat: 'Own papers (Maths, English, Reasoning)',
    location: 'Battersea, South London',
    gender: 'mixed',
    officialAdmissionsUrl: 'https://www.emanuel.org.uk/admissions/',
    papers: [
      { label: 'Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'brighton-college',
    name: 'Brighton College',
    shortName: 'Brighton College',
    category: 'private',
    examFormat: 'Own papers + interview',
    location: 'Brighton, East Sussex',
    gender: 'mixed',
    officialAdmissionsUrl: 'https://www.brightoncollege.org.uk/admissions/',
    papers: [
      { label: 'Sample Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'withington-girls',
    name: "Withington Girls' School",
    shortName: 'Withington',
    category: 'private',
    examFormat: 'Own papers (Maths, English, Reasoning)',
    location: 'West Didsbury, Manchester',
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.withington.manchester.sch.uk/admissions/',
    papers: [
      { label: 'Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'manchester-grammar',
    name: 'Manchester Grammar School',
    shortName: 'MGS',
    category: 'private',
    examFormat: 'Own papers (Maths, English, Reasoning + interview)',
    location: 'Rusholme, Manchester',
    gender: 'boys',
    officialAdmissionsUrl: 'https://www.mgs.org/admissions/',
    papers: [
      { label: 'Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'hch-year7-8',
    name: 'Hampton Court House',
    shortName: 'Hampton Court House',
    category: 'private',
    examFormat: 'Own assessment + interview',
    location: 'East Molesey, Surrey',
    gender: 'mixed',
    officialAdmissionsUrl: 'https://www.hamptoncourthouse.co.uk/admissions/',
    papers: [
      { label: 'Assessment Information Pack', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'harrow',
    name: 'Harrow School',
    shortName: 'Harrow',
    category: 'private',
    examFormat: 'ISEB Pre-Test + own papers + interview',
    location: 'Harrow-on-the-Hill, North London',
    gender: 'boys',
    officialAdmissionsUrl: 'https://www.harrowschool.org.uk/admissions/',
    papers: [
      { label: 'ISEB Pre-Test Familiarisation', type: 'familiarisation', status: 'coming-soon' },
    ],
    note: 'Harrow admits at 13+ only.',
  },
  {
    id: 'surbiton-high',
    name: 'Surbiton High School',
    shortName: 'Surbiton High',
    category: 'private',
    examFormat: 'Own papers (Maths, English, Reasoning)',
    location: 'Surbiton, Kingston',
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.surbitonhigh.com/admissions/',
    papers: [
      { label: 'Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
  {
    id: 'lady-eleanor-holles',
    name: 'Lady Eleanor Holles School',
    shortName: 'LEH',
    category: 'private',
    examFormat: 'Own papers (Maths, English, Reasoning + interview)',
    location: 'Hampton, Surrey',
    gender: 'girls',
    officialAdmissionsUrl: 'https://www.lehs.org.uk/admissions/',
    papers: [
      { label: 'Sample Maths Paper', type: 'sample', status: 'coming-soon' },
      { label: 'Sample English Paper', type: 'sample', status: 'coming-soon' },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: PaperStatus }) {
  if (status === 'available') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        Available
      </span>
    );
  }
  if (status === 'official-only') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-100 text-blue-700 border border-blue-200">
        <ExternalLink size={9} />
        Official site
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 text-slate-500 border border-slate-200">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
      Coming soon
    </span>
  );
}

function PaperRow({ paper, schoolId }: { paper: Paper; schoolId: string }) {
  const iconColor = paper.status === 'available' ? 'text-emerald-600' : 'text-slate-300';

  return (
    <div className="flex items-center justify-between gap-3 py-2.5 border-b border-slate-50 last:border-0">
      <div className="flex items-center gap-2.5 min-w-0">
        <FileText size={14} className={iconColor} />
        <div className="min-w-0">
          <span className="text-sm text-slate-700 font-medium">{paper.label}</span>
          {paper.year && <span className="text-xs text-slate-400 ml-1.5">({paper.year})</span>}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <StatusBadge status={paper.status} />

        {paper.status === 'available' && paper.filename ? (
          <a
            href={`/papers/${paper.filename}`}
            download
            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            <Download size={11} /> PDF
          </a>
        ) : paper.status === 'official-only' && paper.officialUrl ? (
          <a
            href={paper.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <ExternalLink size={11} /> View
          </a>
        ) : (
          <button
            disabled
            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-400 cursor-not-allowed"
          >
            <Download size={11} /> Soon
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PapersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'grammar' | 'private'>('all');

  const filtered = useMemo(() => {
    return SCHOOL_PAPERS.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.shortName.toLowerCase().includes(search.toLowerCase()) ||
        s.location.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'all' || s.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const grammarSchools = filtered.filter((s) => s.category === 'grammar');
  const privateSchools = filtered.filter((s) => s.category === 'private');

  const totalAvailable = SCHOOL_PAPERS.flatMap((s) => s.papers).filter(
    (p) => p.status === 'available'
  ).length;

  return (
    <>
      <SiteNav />

      <main className="bg-white min-h-screen">

        {/* ── Hero ── */}
        <section className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 pt-20 pb-14 px-4 border-b border-slate-100">
          <div className="max-w-6xl mx-auto">

            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-indigo-200">
              <FileText size={12} /> Past Papers Library
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              11+ Past & Sample Papers
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed mb-8">
              Download free practice papers for grammar and independent school 11+ entrance exams.
              We cover {SCHOOL_PAPERS.length} schools with papers added regularly.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mb-10">
              {[
                { value: `${SCHOOL_PAPERS.length}`, label: 'Schools covered' },
                { value: `${grammarSchools.length + (filter === 'private' ? 0 : 0)}`, label: 'Grammar schools' },
                { value: `${SCHOOL_PAPERS.filter(s => s.category === 'private').length}`, label: 'Independent schools' },
                { value: totalAvailable > 0 ? `${totalAvailable}` : 'Growing', label: 'Papers available' },
              ].map((s) => (
                <div key={s.label} className="px-5 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm text-center min-w-[110px]">
                  <div className="text-xl font-black text-indigo-600">{s.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Copyright notice */}
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl max-w-3xl">
              <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 leading-relaxed">
                <strong>Important:</strong> Past papers remain the copyright of the school or exam board that created them. 
                We only host papers that have been made publicly available by the school or GL Assessment/CEM. 
                Where a school does not release papers publicly, we link to their official admissions page.
              </p>
            </div>
          </div>
        </section>

        {/* ── Search & Filter ── */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by school name or location…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
              />
            </div>

            <div className="flex gap-2">
              {(['all', 'grammar', 'private'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold capitalize transition-all border ${
                    filter === f
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {f === 'all' ? 'All Schools' : f === 'grammar' ? 'Grammar' : 'Independent'}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <Search size={32} className="mx-auto mb-3 opacity-30" />
              <p className="font-semibold">No schools found for "{search}"</p>
            </div>
          )}
        </section>

        {/* ── Grammar Schools ── */}
        {grammarSchools.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 pb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                <GraduationCap size={16} className="text-indigo-600" />
              </div>
              <h2 className="text-xl font-black text-slate-900">Grammar Schools</h2>
              <span className="px-2.5 py-0.5 text-xs font-bold bg-indigo-100 text-indigo-700 rounded-full">{grammarSchools.length}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {grammarSchools.map((school) => (
                <div
                  key={school.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-sm transition-all overflow-hidden"
                >
                  {/* Card header */}
                  <div className="p-4 border-b border-slate-100 bg-slate-50">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-black text-slate-900 text-sm leading-snug">{school.name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{school.location} · {
                          school.gender === 'boys' ? 'Boys' : school.gender === 'girls' ? 'Girls' : 'Mixed'
                        }</p>
                      </div>
                      {school.officialAdmissionsUrl && (
                        <a
                          href={school.officialAdmissionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
                        >
                          Admissions <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[11px] text-slate-600 font-medium">
                      <BookOpen size={10} className="text-indigo-400" />
                      {school.examFormat}
                    </div>
                  </div>

                  {/* Papers list */}
                  <div className="p-4">
                    {school.papers.map((paper, i) => (
                      <PaperRow key={i} paper={paper} schoolId={school.id} />
                    ))}
                    {school.note && (
                      <p className="text-xs text-slate-400 mt-3 leading-relaxed italic">{school.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Independent Schools ── */}
        {privateSchools.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 pb-20">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Building2 size={16} className="text-emerald-600" />
              </div>
              <h2 className="text-xl font-black text-slate-900">Independent Schools</h2>
              <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-full">{privateSchools.length}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {privateSchools.map((school) => (
                <div
                  key={school.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-sm transition-all overflow-hidden"
                >
                  <div className="p-4 border-b border-slate-100 bg-slate-50">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-black text-slate-900 text-sm leading-snug">{school.name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{school.location} · {
                          school.gender === 'boys' ? 'Boys' : school.gender === 'girls' ? 'Girls' : 'Mixed'
                        }</p>
                      </div>
                      {school.officialAdmissionsUrl && (
                        <a
                          href={school.officialAdmissionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-xs text-emerald-600 hover:text-emerald-800 font-bold flex items-center gap-1"
                        >
                          Admissions <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[11px] text-slate-600 font-medium">
                      <BookOpen size={10} className="text-emerald-400" />
                      {school.examFormat}
                    </div>
                  </div>

                  <div className="p-4">
                    {school.papers.map((paper, i) => (
                      <PaperRow key={i} paper={paper} schoolId={school.id} />
                    ))}
                    {school.note && (
                      <p className="text-xs text-slate-400 mt-3 leading-relaxed italic">{school.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="bg-indigo-50 border-t border-indigo-100 py-14 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-black text-slate-900 mb-3">
              Want to practise with interactive questions?
            </h2>
            <p className="text-slate-500 mb-6">
              Try our AI-powered mock exams — timed, school-specific, and fully interactive.
            </p>
            <Link
              href="/mock-exams"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
            >
              Try a free mock exam <ChevronRight size={18} />
            </Link>
          </div>
        </section>

      </main>

      <SiteFooter />
    </>
  );
}
