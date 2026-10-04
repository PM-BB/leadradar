import { NextRequest } from 'next/server';
import { generateDemoResults } from '@/lib/demo-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '32 ft container trucks Kolkata';
  const city = searchParams.get('city') || '';
  const state = searchParams.get('state') || '';
  const country = searchParams.get('country') || 'India';
  const radius = Number(searchParams.get('radius') || '50');
  const freshness = (searchParams.get('freshness') || '7d') as '24h' | '3d' | '7d' | '30d';

  const payload = generateDemoResults(query, city, state, country, freshness);

  return Response.json({
    ok: true,
    ...payload,
    radius,
    demoMode: true,
  });
}
