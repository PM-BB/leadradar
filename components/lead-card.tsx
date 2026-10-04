import { getLeadBadge, getLeadScoreClass } from '@/lib/demo-data';
import { formatRelativeDate } from '@/lib/demo-data';
import { LeadResult } from '@/lib/types';

export function LeadCard({ lead, compact = false }: { lead: LeadResult; compact?: boolean }) {
  const relativeTime = formatRelativeDate(lead.posted_at);

  return (
    <article className="lead-card card-surface rounded-2xl border border-slate-200 p-5 shadow-soft transition duration-200">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-rose-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-rose-700">
              {lead.is_demo ? 'DEMO DATA' : 'PUBLIC SOURCE'}
            </span>
            <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${getLeadBadge(lead.urgency)}`}>
              {lead.urgency.toUpperCase()}
            </span>
          </div>

          <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900">{lead.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-700">{lead.requirement}</p>
        </div>

        <div className="min-w-[140px] rounded-xl border border-slate-200 bg-slate-50 p-3 text-right">
          <div className="text-[10px] uppercase tracking-wide text-slate-500">Relevance</div>
          <div className={`mt-1 text-2xl font-bold ${getLeadScoreClass(lead.confidence)}`}>{lead.confidence}%</div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-600">
        <span className="rounded-full bg-slate-100 px-2.5 py-1.5">📍 {lead.location}</span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1.5">🎯 {lead.category}</span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1.5">⏱ {relativeTime}</span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1.5">🚛 {lead.product_or_service}</span>
      </div>

      <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/70 p-3 text-sm text-blue-900">
        <div className="font-semibold">Why this matches</div>
        <p className="mt-1 text-blue-800">{lead.match_reason}</p>
      </div>

      <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span>Source: {lead.source}</span>
          <span>•</span>
          <span>{lead.company_name || 'Public posting'}</span>
          {lead.contact_available ? <span>•</span> : null}
          {lead.contact_available ? <span>Contact available</span> : <span>No public contact found</span>}
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-blue-200 hover:text-blue-700">
            View Original
          </button>
          {lead.contact_available ? (
            <button className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Contact
            </button>
          ) : null}
        </div>
      </div>

      {!compact && lead.public_contact ? (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
          Public info: <span className="font-semibold">{lead.public_contact}</span>
        </div>
      ) : null}
    </article>
  );
}
