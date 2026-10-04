import { LeadResult } from './types';

export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-IN').format(value);
}

export function formatRelativeDate(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.max(1, Math.round(diffMs / 60000));

  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function getLeadBadge(urgency: LeadResult['urgency']) {
  const mapping = {
    urgent: 'bg-rose-100 text-rose-700',
    high: 'bg-orange-100 text-orange-700',
    medium: 'bg-amber-100 text-amber-700',
    low: 'bg-slate-100 text-slate-700',
  };

  return mapping[urgency] || 'bg-slate-100 text-slate-700';
}

export function getFreshnessColor(label: string) {
  if (label.includes('Very Fresh')) return 'bg-rose-100 text-rose-700';
  if (label.includes('Fresh')) return 'bg-emerald-100 text-emerald-700';
  if (label.includes('Recent')) return 'bg-amber-100 text-amber-700';
  if (label.includes('Aging')) return 'bg-orange-100 text-orange-700';
  return 'bg-slate-100 text-slate-700';
}

export function getLeadScoreClass(score: number) {
  if (score >= 90) return 'text-emerald-600';
  if (score >= 80) return 'text-blue-600';
  if (score >= 70) return 'text-amber-600';
  return 'text-slate-500';
}
