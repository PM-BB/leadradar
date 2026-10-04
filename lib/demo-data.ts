import type { LeadResult, SearchIntent, SearchResponse } from './types';

const baseLeads: LeadResult[] = [
  {
    id: 'ld-1',
    title: '32 FT CONTAINER VEHICLE REQUIRED',
    requirement: 'Someone is looking for a 32 ft container vehicle for transportation from Kolkata to Guwahati.',
    product_or_service: '32 ft container truck',
    location: 'Kolkata, West Bengal',
    destination: 'Guwahati',
    quantity: 1,
    urgency: 'urgent',
    posted_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: 'Public Website',
    source_url: 'https://example.com/transport-requirement/32ft-container-kolkata',
    confidence: 96,
    match_reason: 'Strong match because the post requests a 32 ft container vehicle in Kolkata and was published 3 hours ago.',
    contact_available: true,
    company_name: 'Logistics Connect',
    public_contact: '+91 98765 43210',
    category: 'Transport',
    is_demo: true,
  },
  {
    id: 'ld-2',
    title: 'TRUCK REQUIRED FOR PAN-INDIA DELIVERY',
    requirement: 'Business looking for a reliable 32 ft truck for bulk freight movement from Eastern India.',
    product_or_service: '32 ft truck',
    location: 'Howrah, West Bengal',
    destination: 'Bhubaneswar',
    quantity: 2,
    urgency: 'high',
    posted_at: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    source: 'Classified Ad',
    source_url: 'https://example.com/jobs/truck-required-howrah',
    confidence: 91,
    match_reason: 'Matches the requested vehicle type and regional demand with a fresh business requirement.',
    contact_available: false,
    company_name: 'Eastline Cargo',
    category: 'Logistics',
    is_demo: true,
  },
  {
    id: 'ld-3',
    title: 'NEED WEB DEVELOPER FOR ECOMMERCE SITE',
    requirement: 'A local business is seeking a web developer for a small ecommerce platform and product catalog.',
    product_or_service: 'web developer',
    location: 'Mumbai, Maharashtra',
    quantity: 1,
    urgency: 'medium',
    posted_at: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    source: 'Community Post',
    source_url: 'https://example.com/community/need-web-developer-mumbai',
    confidence: 89,
    match_reason: 'The post clearly describes a current web development need in Mumbai and fits the service category.',
    contact_available: true,
    public_contact: 'hello@brandlaunch.in',
    company_name: 'Brand Launch',
    category: 'Digital Services',
    is_demo: true,
  },
  {
    id: 'ld-4',
    title: 'HOTELS LOOKING FOR FOOD SUPPLIERS',
    requirement: 'Hotel procurement teams are sourcing fresh food and kitchen supply vendors for immediate supply contracts.',
    product_or_service: 'food supplier',
    location: 'Bengaluru, Karnataka',
    quantity: 3,
    urgency: 'high',
    posted_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    source: 'Business Inquiry',
    source_url: 'https://example.com/b2b/food-supplier-rfq-bangalore',
    confidence: 87,
    match_reason: 'A direct supplier requirement is visible and the event was posted within the last 48 hours.',
    contact_available: true,
    public_contact: '+91 99887 66554',
    company_name: 'Bharat Hospitality Group',
    category: 'Procurement',
    is_demo: true,
  },
  {
    id: 'ld-5',
    title: 'COLD STORAGE TRANSPORT REQUIRED',
    requirement: 'Cold chain transport needed for dairy supply across West Bengal with urgent scheduling.',
    product_or_service: 'cold storage transport',
    location: 'Kolkata, West Bengal',
    destination: 'Durgapur',
    quantity: 2,
    urgency: 'urgent',
    posted_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: 'Forum',
    source_url: 'https://example.com/threads/cold-storage-transport-west-bengal',
    confidence: 94,
    match_reason: 'Exact service need and immediate urgency in the target location.',
    contact_available: false,
    company_name: 'Fresh Line Distribution',
    category: 'Cold Chain',
    is_demo: true,
  },
];

const keywords = ['truck', 'vehicle', 'container', 'transport', 'developers', 'supplier', 'food', 'cold', 'web'];

export function buildSearchIntent(query: string, city?: string, state?: string, country?: string, radius = 50, freshness: '24h' | '3d' | '7d' | '30d' = '7d'): SearchIntent {
  const normalized = query.trim();
  const product = normalized.replace(/\b(find|customers|looking|need|required|requirement|for|in|near|around)\b/gi, '').trim();
  const derivedProduct = product || 'requested goods or service';

  return {
    product_or_service: derivedProduct || 'general service need',
    intent: 'customer_requirement',
    location: [city, state, country].filter(Boolean).join(', ') || 'Anywhere',
    radius,
    freshness,
  };
}

export function generateSearchVariations(query: string, location: string): string[] {
  const base = query
    .replace(/\s+/g, ' ')
    .replace(/\b(find|customers|looking|need|required|requirement)\b/gi, '')
    .trim();

  const root = base || 'transport requirement';
  const variations = [
    `${root} ${location}`,
    `${root} near ${location}`,
    `${root} required ${location}`,
    `${root} in ${location}`,
    `${root} urgent ${location}`,
  ];

  const keywordBundles = ['vehicle', 'truck', 'container', 'transport', 'supplier', 'developer', 'service'];
  keywordBundles.forEach((term) => {
    variations.push(`${root} ${term} ${location}`);
  });

  return Array.from(new Set(variations.filter(Boolean))).slice(0, 8);
}

export function getFreshnessLabel(timestamp: string): string {
  const diffHours = (Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60);

  if (diffHours <= 6) return '🔥 Very Fresh';
  if (diffHours <= 24) return '🟢 Fresh';
  if (diffHours <= 72) return '🟡 Recent';
  if (diffHours <= 168) return '🟠 Aging';
  return '⚪ Old';
}

export function getRelativeTime(timestamp: string): string {
  const seconds = Math.max(1, Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000));

  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

export function generateDemoResults(query: string, city?: string, state?: string, country?: string, freshness: '24h' | '3d' | '7d' | '30d' = '7d'): SearchResponse {
  const locationText = [city, state, country].filter(Boolean).join(', ') || 'India';
  const intent = buildSearchIntent(query, city, state, country, 50, freshness);
  const variations = generateSearchVariations(query, locationText);

  const matches = baseLeads.filter((lead) => {
    const haystack = `${lead.requirement} ${lead.product_or_service} ${lead.location} ${lead.category} ${lead.company_name ?? ''}`.toLowerCase();
    const needle = query.toLowerCase();
    const containsAnyKeyword = keywords.some((word) => needle.includes(word) || haystack.includes(word));

    if (!query) return true;
    return containsAnyKeyword || haystack.includes(needle) || lead.product_or_service.toLowerCase().includes(needle.split(' ')[0]);
  });

  const leads = matches.length ? matches : baseLeads.slice(0, 3);

  const sourceSummary = Array.from(
    leads.reduce((acc, lead) => {
      acc.set(lead.source, (acc.get(lead.source) ?? 0) + 1);
      return acc;
    }, new Map<string, number>())
  ).map(([label, count]) => ({ label, count }));

  return {
    query,
    intent,
    generated_variations: variations,
    total: leads.length,
    leads: leads.map((lead) => ({
      ...lead,
      confidence: Math.min(99, Math.max(80, lead.confidence + (freshness === '24h' ? 3 : 0))),
      match_reason: lead.match_reason,
    })),
    sourceSummary,
  };
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
