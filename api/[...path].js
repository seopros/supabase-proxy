export default async function handler(req) {
  const url = new URL(req.url);
  const targetUrl = `https://rhwcujqrlluqikzysxqy.supabase.co${url.pathname}${url.search}`;
  
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      },
    });
  }

  const response = await fetch(targetUrl, {
    method: req.method,
    headers: { ...Object.fromEntries(req.headers), host: 'rhwcujqrlluqikzysxqy.supabase.co' },
    body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
    duplex: 'half',
  });

  const responseHeaders = new Headers(response.headers);
  responseHeaders.set('Access-Control-Allow-Origin', '*');

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
}

export const config = { runtime: 'edge' };
