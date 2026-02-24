import React, { useEffect } from "react";

export default function EmbeddedWaitlist(): JSX.Element {
  const DEFAULT_FORM = 'cbmaomft';
  const DEFAULT_BASE = 'https://app.youform.com';

  const formId = (import.meta.env.VITE_YOUFORM_EMBED_FORM as string) || DEFAULT_FORM;
  const baseUrl = (import.meta.env.VITE_YOUFORM_EMBED_BASE as string) || DEFAULT_BASE;
  const heightStr = (import.meta.env.VITE_YOUFORM_EMBED_HEIGHT as string) || '700';
  const height = Number(heightStr) || 700;

  const formUrl = `${baseUrl}/forms/${formId}`;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash === '#waitlist') {
      const el = document.getElementById('waitlist-embed');
      if (el) {
        const rect = el.getBoundingClientRect();
        const elTop = window.scrollY + rect.top;
        const target = Math.max(0, Math.round(elTop - window.innerHeight / 2 + rect.height / 2));
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
      window.history.replaceState({}, '', window.location.pathname + window.location.search);
    }
  }, [formUrl]);

  return (
    <section id="waitlist-embed" className="w-full max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold mb-4">Join the waitlist</h2>
      <div className="bg-card border border-border rounded-2xl p-6">
        <iframe
          src={formUrl}
          loading="lazy"
          width="100%"
          height={height}
          frameBorder={0}
          marginHeight={0}
          marginWidth={0}
          style={{ border: 'none' }}
          title="Join the waitlist"
        />
        <div className="mt-4 text-sm text-muted-foreground">
          Can't see the form?{' '}
          <a href={formUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">
            Open the waitlist in a new tab
          </a>
          .
        </div>
      </div>
    </section>
  );
}
