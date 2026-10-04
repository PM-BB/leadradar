'use client';

import { useEffect, useState } from 'react';

const storageKey = 'leadradar-saved-leads';

export default function SavedPage() {
  const [saved, setSaved] = useState<any[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    setSaved(raw ? JSON.parse(raw) : []);
  }, []);

  if (saved.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900">Saved Leads</h1>
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-600 shadow-soft">
          No leads saved yet. Search and save promising opportunities.
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Saved Leads</h1>
      <div className="mt-6 space-y-4">
        {saved.map((lead: any) => (
          <div key={lead.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-blue-600">{lead.category}</div>
                <h3 className="mt-2 text-xl font-bold text-slate-900">{lead.title}</h3>
              </div>
              <button className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-600">Remove</button>
            </div>
            <div className="mt-3 text-sm text-slate-700">{lead.location}</div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">{lead.urgency}</span>
              <span className="rounded-full bg-slate-100 px-2 py-1">Posted {lead.posted_at}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
