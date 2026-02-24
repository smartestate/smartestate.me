import React, { useEffect } from "react";

export default function EmbeddedWaitlist(): JSX.Element {
  // Defaults from the snippet provided by the user
  const defaultForm = "cbmaomft";
  const defaultBase = "https://app.youform.com";
  const formId = (import.meta.env.VITE_YOUFORM_EMBED_FORM as string) || defaultForm;
  const baseUrl = (import.meta.env.VITE_YOUFORM_EMBED_BASE as string) || defaultBase;
  const width = (import.meta.env.VITE_YOUFORM_EMBED_WIDTH as string) || "100%";
  const height = (import.meta.env.VITE_YOUFORM_EMBED_HEIGHT as string) || "333";

  useEffect(() => {
    // If the page loaded with #waitlist, scroll to this element
    if (typeof window === "undefined") return;
    if (window.location.hash === "#waitlist") {
      const el = document.getElementById("waitlist-embed");
      if (el) {
        // Center the element in the viewport so CTA is visible
        const rect = el.getBoundingClientRect();
        const elTop = window.scrollY + rect.top;
        const target = Math.max(0, Math.round(elTop - window.innerHeight / 2 + rect.height / 2));
        window.scrollTo({ top: target, behavior: "smooth" });
      }
      history.replaceState({}, "", window.location.pathname + window.location.search);
    }

    // No script required — we'll embed via iframe so the form loads reliably in SPAs
  }, [baseUrl]);

  return (
    <section id="waitlist-embed" className="w-full max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold mb-4">Join the waitlist</h2>
      <div className="bg-card border border-border rounded-2xl p-6">
        <iframe
          src={`${baseUrl}/forms/${formId}`}
          loading="lazy"
          width="100%"
          height={700}
          frameBorder={0}
          marginHeight={0}
          marginWidth={0}
          style={{ border: "none" }}
          title="Join the waitlist"
        />
        <div className="mt-4 text-sm text-muted-foreground">
          Can't see the form? <a href={`${baseUrl}/forms/${formId}`} target="_blank" rel="noreferrer" className="text-primary hover:underline">Open the waitlist in a new tab</a>.
        </div>
      </div>
    </section>
  );
}
