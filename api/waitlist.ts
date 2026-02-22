import type { VercelRequest, VercelResponse } from '@vercel/node';

function parseBody(req: VercelRequest) {
  const ct = req.headers['content-type'] || '';

  // If body is already an object (Vercel / body parser), return it.
  if (req.body && typeof req.body === 'object') return req.body;

  // If JSON string
  if (typeof req.body === 'string') {
    const raw = req.body.trim();
    if (raw.startsWith('{')) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        // fallthrough to try urlencoded
      }
    }

    // Try urlencoded
    try {
      const params = new URLSearchParams(raw);
      const out: Record<string, string> = {};
      for (const [k, v] of params.entries()) out[k] = v;
      return out;
    } catch (e) {
      return { raw };
    }
  }

  // Unknown — return as-is
  return req.body;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).send({ error: 'Method Not Allowed' });
  }

  try {
    const payload = parseBody(req) || {};
    console.log('[waitlist webhook] parsed payload:', JSON.stringify(payload));

    // Basic validation: expect at least 4 fields from the form
    const keys = Object.keys(payload).filter(Boolean);
    if (keys.length < 4) {
      console.warn('[waitlist webhook] unexpected payload fields:', keys);
      return res.status(400).json({ ok: false, error: 'expected at least 4 form fields' });
    }

    // Optional forwarding: if FORWARD_URL is set, POST the parsed payload there
    const forwardUrl = process.env.FORWARD_URL;
    if (forwardUrl) {
      try {
        const resp = await fetch(forwardUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ source: 'youform', payload }),
        });

        if (!resp.ok) {
          console.error('[waitlist webhook] forward failed', resp.status);
        } else {
          console.log('[waitlist webhook] forwarded to', forwardUrl);
        }
      } catch (err) {
        console.error('[waitlist webhook] forward error', err);
      }
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[waitlist webhook] error', err);
    return res.status(500).json({ ok: false, error: 'internal error' });
  }
}
