'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LeadCard } from '@/components/lead-card';
import { SearchForm } from '@/components/search-form';
import { getFreshnessColor } from '@/lib/demo-data';
import type { SearchResponse } from '@/lib/types';

export default function ResultsPage() {
  const params = useSearchParams();
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = params.get('query') || '32 ft container trucks Kolkata';
    const city = params.get('city') || '';
    const state = params.get('state') || '';
    const country = params.get('country') || 'India';
    const radius = params.get('radius') || '50';
    const freshness = params.get('freshness') || '7d';

    const url = `/api/search?query=${encodeURIComponent(query)}&city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&country=${encodeURIComponent(country)}&radius=${encodeURIComponent(radius)}&freshness=${encodeURIComponent(freshness)}`;

    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params]);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-600 shadow-soft">Loading leads...</div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-600 shadow-soft">No data available.</div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <SearchForm
          initialQuery={data.query}
          initialCity=""
          initialState=""
          initialCountry="India"
          initialRadius={50}
          initialFreshness={data.intent.freshness}
        />
      </div>

      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-sm font-medium uppercase tracking-[0.18em] text-blue-600">Lead matches</div>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">{data.total} potential matches</h1>
        </div>

        <div className="rounded-full bg-white px-4 py-2 text-sm text-slate-600 shadow-soft border border-slate-200">
          Search: <span className="font-semibold text-slate-800">{data.query}</span>
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <div className="text-xs uppercase tracking-wide text-slate-500">Freshness</div>
          <div className="mt-2 inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">{data.intent.freshness}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <div className="text-xs uppercase tracking-wide text-slate-500">Location</div>
          <div className="mt-2 font-semibold text-slate-800">{data.intent.location}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <div className="text-xs uppercase tracking-wide text-slate-500">Intent</div>
          <div className="mt-2 font-semibold text-slate-800">{data.intent.product_or_service}</div>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {['Freshness', 'Distance', 'Relevance', 'Category', 'Contact available', 'Source', 'Urgency'].map((filter) => (
          <button key={filter} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:border-blue-200 hover:text-blue-700">
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft h-fit">
          <div className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Sources</div>
          <div className="mt-4 space-y-3">
            {data.sourceSummary.map((source) => (
              <div key={source.label} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
                <span>{source.label}</span>
                <span className="font-semibold">{source.count}</span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Smart Variations</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {data.generated_variations.map((variation) => (
                <li key={variation} className="rounded-lg bg-slate-50 px-3 py-2">{variation}</li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="space-y-5">
          {data.leads.map((lead) => (
            <div key={lead.id} className="space-y-2">
              <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${getFreshnessColor('🔥 Very Fresh')}`}>
                {lead.is_demo ? 'DEMO DATA' : 'LIVE'}
              </span>
              <LeadCard lead={lead} />
            </div>
          ))}
        </section>
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:border-blue-200 hover:text-blue-700">
          Back to search
        </Link>
      </div>
    </main>
  );
}
