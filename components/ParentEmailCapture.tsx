'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle, Loader2, X } from 'lucide-react';

interface Props {
  /** Optional context message shown above the form */
  context?: string;
  /** Called when the form is dismissed */
  onDismiss?: () => void;
  /** Style variant */
  variant?: 'inline' | 'modal';
}

type State = 'idle' | 'loading' | 'success' | 'error';

export function ParentEmailCapture({ context, onDismiss, variant = 'inline' }: Props) {
  const [email, setEmail] = useState('');
  const [childName, setChildName] = useState('');
  const [targetSchool, setTargetSchool] = useState('');
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setState('loading');
    setError('');

    // TODO: Replace this stub with your actual email capture endpoint (e.g. n8n webhook, Mailchimp, etc.)
    // For now we simulate a successful submission after a short delay.
    await new Promise((r) => setTimeout(r, 900));

    // In production: POST to /api/email-capture with { email, childName, targetSchool }
    // const res = await fetch('/api/email-capture', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, childName, targetSchool }),
    // });

    setState('success');
  };

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle size={28} className="text-emerald-600" />
        </div>
        <h3 className="text-lg font-black text-slate-900">You're on the list!</h3>
        <p className="text-slate-500 text-sm max-w-xs">
          We'll send you{childName ? ` ${childName}'s` : ' your child\'s'} progress updates and revision tips to{' '}
          <strong>{email}</strong>.
        </p>
        {onDismiss && (
          <button onClick={onDismiss} className="mt-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${variant === 'modal' ? 'p-6' : ''}`}>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-0 right-0 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
        >
          <X size={14} className="text-slate-500" />
        </button>
      )}

      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
          <Mail size={18} className="text-indigo-600" />
        </div>
        <div>
          <h3 className="font-black text-slate-900 text-sm">Save your child's progress</h3>
          <p className="text-xs text-slate-500">{context || 'Get exam tips and results summaries by email.'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Child's first name (optional)"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white placeholder-slate-400"
          />
          <input
            type="text"
            placeholder="Target school (optional)"
            value={targetSchool}
            onChange={(e) => setTargetSchool(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white placeholder-slate-400"
          />
        </div>

        <div className="flex gap-2">
          <input
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
            className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white placeholder-slate-400"
          />
          <button
            type="submit"
            disabled={state === 'loading'}
            className="px-5 py-2.5 rounded-xl font-black text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center gap-1.5 shrink-0"
          >
            {state === 'loading' ? <Loader2 size={15} className="animate-spin" /> : null}
            {state === 'loading' ? 'Saving…' : 'Save progress'}
          </button>
        </div>

        {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}

        <p className="text-[11px] text-slate-400 leading-relaxed">
          No spam, ever. Unsubscribe at any time. We never share your details.
        </p>
      </form>
    </div>
  );
}
