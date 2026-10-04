'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const sampleQueries = [
  'Need 32 ft trucks in Kolkata',
  'People looking for web developers in Mumbai',
  'Hotels looking for food suppliers',
  'Cold storage transport required',
  'Wholesale buyers for women clothing',
];

export function SearchForm({
  initialQuery = '',
  initialCity = '',
  initialState = '',
  initialCountry = 'India',
  initialRadius = 50,
  initialFreshness = '7d',
}: {
  initialQuery?: string;
  initialCity?: string;
  initialState?: string;
  initialCountry?: string;
  initialRadius?: number;
  initialFreshness?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [city, setCity] = useState(initialCity);
  const [state, setState] = useState(initialState);
  const [country, setCountry] = useState(initialCountry);
  const [radius, setRadius] = useState(initialRadius);
  const [freshness, setFreshness] = useState(initialFreshness);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      query: query || '32 ft trucks in Kolkata',
      city,
      state,
      country,
      radius: String(radius),
      freshness,
    });

    router.push(`/results?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-5xl">
      <div className="search-glow overflow-hidden rounded-[28px] border border-slate-200 bg-white p-3 shadow-soft">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex-1">
            <label className="sr-only">What are you looking for?</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-lg outline-none ring-0 transition focus:border-blue-500 focus:bg-white"
            />
          </div>
          <button
            type="submit"
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/20 hover:opacity-95"
          >
            Find Leads
          </button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500" />
          <input value={state} onChange={(e) => setState(e.target.value)} placeholder="State" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500" />
          <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500" />
          <input type="number" min={1} value={radius} onChange={(e) => setRadius(Number(e.target.value) || 50)} placeholder="Radius" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500" />
          <select value={freshness} onChange={(e) => setFreshness(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500">
            <option value="24h">Last 24 hours</option>
            <option value="3d">Last 3 days</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {sampleQueries.map((sample) => (
          <button
            key={sample}
            type="button"
            onClick={() => setQuery(sample)}
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
          >
            {sample}
          </button>
        ))}
      </div>
    </form>
  );
}
