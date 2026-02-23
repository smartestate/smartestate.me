import React, { useEffect } from "react";

export default function EmbeddedWaitlist(): JSX.Element {
  // If you have a YouForm embed URL, set VITE_YOUFORM_EMBED_URL in env
  const embedUrl = (import.meta.env.VITE_YOUFORM_EMBED_URL as string) || "";

  useEffect(() => {
    // If the page loaded with #waitlist, scroll to this element
    if (typeof window === "undefined") return;
    if (window.location.hash === "#waitlist") {
      const el = document.getElementById("waitlist-embed");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      // remove hash so subsequent loads aren't auto-scrolled
      history.replaceState({}, "", window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <section id="waitlist-embed" className="w-full max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold mb-4">Join the waitlist</h2>
      <div className="bg-card border border-border rounded-2xl p-6">
        {embedUrl ? (
          <iframe
            title="Waitlist"
            src={embedUrl}
            className="w-full h-[700px] border-0"
            aria-label="Waitlist embed"
          />
        ) : (
          <div className="text-sm text-muted-foreground">
            No embed configured. Set <code>VITE_YOUFORM_EMBED_URL</code> to your YouForm embed URL.
          </div>
        )}
      </div>
    </section>
  );
}
