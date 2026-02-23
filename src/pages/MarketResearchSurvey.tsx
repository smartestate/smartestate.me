import { useEffect, useState } from "react";

export default function MarketResearchSurvey(): JSX.Element {
  const [showNotice, setShowNotice] = useState(true);

  useEffect(() => {
    const src = "https://app.youform.com/embed.js";
    if (!document.querySelector(`script[src='${src}']`)) {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const scrollToEmbed = () => {
    const el = document.getElementById("market-research-embed");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto py-8 px-4">
        <div id="market-research-embed">
          <div data-youform-embed data-form="xehdqwp1" data-base-url="https://app.youform.com" data-width="100%" data-height="700"></div>
        </div>
      </div>

      {showNotice && (
        <div className="fixed right-6 bottom-6 w-80 max-w-xs bg-white/95 border border-border rounded-lg shadow-lg p-3 z-50">
          <div className="flex items-start gap-3">
            <div className="flex-1 text-sm">
              We're running a short market research survey to improve Smart Estate — your feedback helps shape our product.
            </div>
            <button
              aria-label="Close notice"
              onClick={() => setShowNotice(false)}
              className="text-muted-foreground"
            >
              ✕
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2">
            <button onClick={scrollToEmbed} className="rounded bg-primary text-primary-foreground px-3 py-1 text-sm">
              Start survey
            </button>
            <a href="/market-research-survey" className="text-sm text-muted-foreground hover:text-foreground">Open page</a>
          </div>
        </div>
      )}
    </main>
  );
}
