import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Brain, Trophy, Sparkles, Target, Zap, Check, Star,
  ArrowRight, ShieldCheck, Mail, HelpCircle, GraduationCap, CheckCircle,
  Gamepad2,
} from 'lucide-react';
import { SiteNav } from './SiteNav';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-inter">
      <SiteNav ctaLabel="Explore resources" ctaHref="/mock-exams" />

      {/* Hero */}
      <div className="relative pt-8 pb-16 sm:pt-16 sm:pb-24 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center lg:items-start text-center lg:text-left z-10"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-700 font-bold text-sm mb-6 border border-indigo-100 shadow-sm">
              <Sparkles size={16} /> Mock exams, practice papers and tutor support
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight mb-6 leading-[1.1]">
              11+ <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">exam preparation</span> built for real exam conditions.
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-slate-500 font-medium mb-10 max-w-xl leading-relaxed">
              High-quality 11+ practice for grammar and independent schools. Build confidence in Maths, English, Verbal and Non-Verbal Reasoning with clear explanations and structured practice.
            </motion.p>

            <motion.div variants={itemVariants} className="w-full max-w-lg mb-10 flex flex-col items-center lg:items-start">
              {/* Primary CTA */}
              <Link
                href="/mock-exams"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-xl sm:text-2xl rounded-full shadow-xl shadow-indigo-200 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/40 overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                <span className="absolute inset-0 rounded-full ring-2 ring-white/30 animate-pulse"></span>
                <span className="relative flex items-center gap-2">
                  Explore mock exams <ArrowRight className="w-6 h-6" strokeWidth={3} />
                </span>
              </Link>

              {/* Secondary CTAs */}
              <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-3">
                <button
                  onClick={onStart}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-slate-200 bg-white text-slate-900 font-bold hover:bg-slate-50 transition-colors"
                >
                  <Gamepad2 size={16} /> Start practising
                </button>
                <Link href="/schools" className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-100 transition-colors">
                  School-specific mock exams
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 px-2 text-sm font-bold text-slate-500">
                <span className="flex items-center gap-2"><Check size={16} className="text-emerald-500" strokeWidth={3} /> Free access</span>
                <span className="flex items-center gap-2"><Check size={16} className="text-emerald-500" strokeWidth={3} /> No sign-up required</span>
              </div>
            </motion.div>

            {/* Social Proof */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
              <div className="flex -space-x-3">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i*13}`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col text-sm">
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-400">{[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}</div>
                  <span className="font-bold text-slate-800">Trusted approach</span>
                </div>
                <span className="font-medium text-slate-500">Used by families preparing for the 11+</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="absolute top-10 -right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-10 right-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute top-40 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-200/50 border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500 hover:scale-[1.02]">
              <img
                src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=2070&auto=format&fit=crop"
                alt="Happy student studying with tablet"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 flex items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <Check size={20} strokeWidth={3} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">Maths Quiz</p>
                  <p className="text-emerald-600 text-xs font-bold">Full marks!</p>
                </div>
              </div>
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/50 animate-bounce-slow animation-delay-2000">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Zap size={16} fill="currentColor" />
                  <span>Timed practice</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Feature: Mock Exams */}
      <div className="py-24 bg-slate-50 overflow-hidden border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-200/30 rounded-full blur-3xl -z-10" />
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-200/40 border-4 border-white transform -rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-[1.02]">
                <img src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2069&auto=format&fit=crop" alt="Exam-style practice" className="w-full h-auto object-cover" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6"><Target size={24} /></div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">Mock exams that reflect real exam structure</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">Our mock exams are built to feel like the real thing: clear sections, realistic timing, and familiar 11+ question formats.</p>
              <ul className="space-y-4 mb-8">
                {[
                  "Structured, timed mock exams using our existing quiz engine",
                  "Clear marking and explanations to support focused revision",
                  "Designed for common 11+ formats across the UK"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center shrink-0"><Check size={14} strokeWidth={3} /></div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/mock-exams" className="inline-flex items-center justify-center px-6 py-3 rounded-2xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200">Explore mock exams</Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Feature: Tutor Support */}
      <div className="py-24 bg-white overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="order-1">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6"><Brain size={24} /></div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">Tutor support when you want 1:1 guidance</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">Use our tutor pages to learn about local grammar schools and send a tutor enquiry when you want individual support alongside structured practice.</p>
              <ul className="space-y-4 mb-8">
                {[
                  "Local tutor enquiry pages (e.g. 11 Plus Tutor in London)",
                  "Grammar school context for each area",
                  "A simple enquiry form to request help"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center shrink-0"><Check size={14} strokeWidth={3} /></div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/tutors" className="inline-flex items-center justify-center px-6 py-3 rounded-2xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200">Find tutor support</Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative order-2">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-200/30 rounded-full blur-3xl -z-10" />
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-200/50 border-4 border-white transform rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-[1.02]">
                <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop" alt="Girl studying with focus" className="w-full h-auto object-cover" />
                <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 flex flex-col gap-1">
                  <div className="text-xs font-bold text-slate-400 uppercase">Current topic</div>
                  <div className="font-black text-slate-800 flex items-center gap-2"><GraduationCap className="text-indigo-600" size={18} /> Verbal Reasoning</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Grid Features */}
      <div className="relative z-10 bg-slate-50 py-24 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Everything your child needs for the 11+</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">A complete 11+ curriculum aligned to the topics and question styles used in entrance exams.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Brain, bg: "bg-indigo-100", color: "text-indigo-600", border: "hover:border-indigo-100", title: "Smart progress tracking", desc: "See what to focus on next with clear progress and topic insights." },
              { icon: Trophy, bg: "bg-emerald-100", color: "text-emerald-600", border: "hover:border-emerald-100", title: "Extensive 11+ practice", desc: "A large set of 11+ practice questions across Maths, English, Verbal and Non-Verbal Reasoning." },
              { icon: Target, bg: "bg-amber-100", color: "text-amber-600", border: "hover:border-amber-100", title: "Exam-board aligned", desc: "Practice tailored to GL Assessment, CEM-style, ISEB Pre-Test and CSSE formats." },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-3xl bg-white border border-slate-100 ${f.border} transition-all group shadow-sm hover:shadow-xl`}>
                <div className={`w-14 h-14 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}><f.icon size={28} /></div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{f.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="relative z-10 py-24 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-500">Three simple steps to get started</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-slate-100 -z-10 rounded-full" />
            {[
              { title: "Choose a mock", desc: "Pick a general or school-specific mock and sit it online — no downloads.", icon: Target, color: "blue" },
              { title: "Practise with structure", desc: "Use timed, exam-style practice and review clear explanations.", icon: ShieldCheck, color: "purple" },
              { title: "Get tutor support", desc: "If you want 1:1 help, use our tutor pages to send an enquiry.", icon: Mail, color: "emerald" },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-3xl bg-white border-4 border-slate-100 flex items-center justify-center text-${step.color}-600 mb-6 shadow-xl relative z-10`}>
                  <step.icon size={36} />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold border-4 border-white">{idx + 1}</div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-slate-500 font-medium max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="relative z-10 bg-slate-50 py-24 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Parent Testimonials</h2>
            <p className="text-lg text-slate-500">Real results from real families</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sarah J.", role: "Mother of 2", text: "My daughter actually asks to do her 11+ practice now. The structured practice made such a difference." },
              { name: "David P.", role: "Father of Tom", text: "We were struggling with Non-Verbal Reasoning until we found 11 Plus Exam Papers. The explanations are brilliant." },
              { name: "Emily R.", role: "Parent", text: "Clear, exam-style questions and explanations made it much easier to plan our child's preparation." },
            ].map((t, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:scale-105 transition-transform duration-300">
                <div className="flex text-amber-400 mb-4">{[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}</div>
                <p className="text-slate-700 font-medium mb-6 text-lg">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 uppercase">{t.name.charAt(0)}</div>
                  <div>
                    <div className="font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="relative z-10 py-24 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Is 11 Plus Exam Papers suitable for GL and CEM-style 11+ exams?", a: "Yes. You can choose your target exam style during onboarding, and practice questions will match the format and difficulty." },
              { q: "What year groups is this for?", a: "Designed for Year 3 to Year 6 (roughly ages 7-11), including focused Year 5 and Year 6 11+ preparation." },
              { q: "Does it work on iPads and tablets?", a: "Yes — 11 Plus Exam Papers works smoothly on iPad, Android tablets, laptops and phones." },
              { q: "How much does it cost?", a: "Access is free for now. In future, we may add optional gated resources, but the core library will remain focused on high-quality 11+ preparation." }
            ].map((faq, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-lg text-slate-800 mb-2 flex items-start gap-3">
                  <HelpCircle className="text-indigo-500 shrink-0 mt-1" size={20} />
                  {faq.q}
                </h3>
                <p className="text-slate-600 pl-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
            Take the stress out of 11+ preparation. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">Start with confidence.</span>
          </h2>
          <p className="text-lg sm:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Access free 11+ mock-style practice, online mocks, and tutor support resources in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/mock-exams"
              className="group relative inline-flex items-center gap-3 px-8 py-4 sm:px-12 sm:py-6 bg-white text-indigo-900 rounded-2xl font-black text-xl sm:text-2xl shadow-2xl shadow-indigo-900/50 hover:scale-[1.02] hover:shadow-white/20 transition-all duration-300"
            >
              Explore mock exams
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight size={20} strokeWidth={3} />
              </span>
            </Link>
            <button
              onClick={onStart}
              className="inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-6 border-2 border-white/20 text-white rounded-2xl font-bold text-lg hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            >
              <Gamepad2 size={20} /> Start practising
            </button>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-bold text-slate-400">
            <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> Free access</span>
            <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> 1,000+ questions</span>
            <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> Tutor support resources</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-white">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold">11+</div>
              <span className="font-extrabold text-xl">11 Plus Exam Papers</span>
            </div>
            <p className="text-sm">Helping children feel confident for the 11+.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/mock-exams" className="hover:text-white transition-colors">Mock Exams</Link></li>
              <li><Link href="/papers" className="hover:text-white transition-colors">Past Papers</Link></li>
              <li><Link href="/schools" className="hover:text-white transition-colors">Schools</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/exam-dates" className="hover:text-white transition-colors">Exam Dates</Link></li>
              <li><Link href="/guides/gl-vs-cem" className="hover:text-white transition-colors">GL vs CEM Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>Privacy</li>
              <li>Terms of use</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          <p>&copy; 2025 11 Plus Exam Papers. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};