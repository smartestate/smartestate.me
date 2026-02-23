import React, { useEffect } from "react";

export default function EmbeddedWaitlist(): JSX.Element {
  // Defaults from the snippet provided by the user
  const defaultForm = "cbmaomft";
  const defaultBase = "https://app.youform.com";
  const formId = (import.meta.env.VITE_YOUFORM_EMBED_FORM as string) || defaultForm;
  const baseUrl = (import.meta.env.VITE_YOUFORM_EMBED_BASE as string) || defaultBase;
  const width = (import.meta.env.VITE_YOUFORM_EMBED_WIDTH as string) || "100%";
  const height = (import.meta.env.VITE_YOUFORM_EMBED_HEIGHT as string) || "500";

  useEffect(() => {
    // If the page loaded with #waitlist, scroll to this element
    if (typeof window === "undefined") return;
    if (window.location.hash === "#waitlist") {
      const el = document.getElementById("waitlist-embed");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      history.replaceState({}, "", window.location.pathname + window.location.search);
    }

    // Load YouForm embed script once
    const scriptSrc = `${baseUrl}/embed.js`;
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const s = document.createElement("script");
      s.src = scriptSrc;
      s.async = true;
      document.body.appendChild(s);
    }
  }, [baseUrl]);

  return (
    <section id="waitlist-embed" className="w-full max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold mb-4">Join the waitlist</h2>
      <div className="bg-card border border-border rounded-2xl p-6">
        <div
          data-youform-embed
          data-form={formId}
          data-base-url={baseUrl}
          data-width={width}
          data-height={height}
        ></div>
      </div>
    </section>
  );
}
