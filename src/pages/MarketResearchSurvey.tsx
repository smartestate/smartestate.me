import { useEffect } from "react";

export default function MarketResearchSurvey(): JSX.Element {
  useEffect(() => {
    const src = "https://app.youform.com/embed.js";
    if (!document.querySelector(`script[src='${src}']`)) {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <main className="min-h-screen">
      <div className="container mx-auto pt-24 py-6 px-4">
        <div id="market-research-embed">
          <div data-youform-embed data-form="xehdqwp1" data-base-url="https://app.youform.com" data-width="100%" data-height="700"></div>
        </div>
      </div>
    </main>
  );
}
