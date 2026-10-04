export type FreshnessRange = '24h' | '3d' | '7d' | '30d';

export type LeadUrgency = 'urgent' | 'high' | 'medium' | 'low';

export type LeadSource = 'Public Website' | 'Forum' | 'Classified Ad' | 'Business Inquiry' | 'Community Post';

export type LeadResult = {
  id: string;
  title: string;
  requirement: string;
  product_or_service: string;
  location: string;
  destination?: string;
  quantity?: number;
  urgency: LeadUrgency;
  posted_at: string;
  source: LeadSource;
  source_url: string;
  confidence: number;
  match_reason: string;
  contact_available: boolean;
  company_name?: string;
  public_contact?: string;
  category: string;
  is_demo: boolean;
};

export type SearchRequest = {
  query: string;
  city?: string;
  state?: string;
  country?: string;
  radius?: number;
  freshness: FreshnessRange;
};

export type SearchIntent = {
  product_or_service: string;
  intent: 'customer_requirement' | 'buying_request' | 'service_need';
  location: string;
  radius: number;
  freshness: FreshnessRange;
};

export type SearchResponse = {
  query: string;
  intent: SearchIntent;
  generated_variations: string[];
  total: number;
  leads: LeadResult[];
  sourceSummary: { label: string; count: number }[];
};
