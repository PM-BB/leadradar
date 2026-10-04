import { SearchForm } from '@/components/search-form';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid items-center gap-10 pb-12 pt-6 lg:grid-cols-[1.1fr_0.9fr] lg:pt-14">
        <div>
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            Lead intelligence platform
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Find People Who Need What You Sell
          </h1>

          <p className="mt-5 max-w-xl text-lg text-slate-600">
            Search recent public requirements, requests and opportunities across the web.
          </p>

          <div className="mt-8">
            <SearchForm />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <span className="font-medium text-slate-500">Search freshness</span>
            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1">Last 24 hours</span>
            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1">Last 3 days</span>
            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1">Last 7 days</span>
            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1">Last 30 days</span>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
          <div className="rounded-2xl bg-slate-900 p-5 text-white">
            <div className="text-xs uppercase tracking-[0.2em] text-blue-200">Live intent</div>
            <div className="mt-4 text-2xl font-bold">32 ft truck requirements in Kolkata</div>
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              23 potential matches
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {[
              { label: 'Very fresh', value: '9 leads', tone: 'bg-rose-100 text-rose-700' },
              { label: 'Fresh', value: '12 leads', tone: 'bg-emerald-100 text-emerald-700' },
              { label: 'Recent', value: '4 leads', tone: 'bg-amber-100 text-amber-700' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-600">{item.label}</span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${item.tone}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { title: 'Recent customer intent', text: 'Find buyers and businesses that are actively looking for your product or service.' },
          { title: 'Source transparent', text: 'Every lead keeps attribution to the originating public source and original URL.' },
          { title: 'Built for sales teams', text: 'Track urgency, location, relevance, and lead state without a bulky CRM layer.' },
        ].map((card) => (
          <div key={card.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <h2 className="text-lg font-semibold text-slate-900">{card.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{card.text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
