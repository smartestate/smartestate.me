import { useEffect } from "react";

export default function MarketResearchSurvey(): JSX.Element {
  useEffect(() => {
    const src = "https://app.youform.com/embed.js";
    // Remove any existing embed script to force re-initialization on client-side navigation,
    // then append a fresh script so the embed library scans the DOM and renders the form.
    const existing = document.querySelectorAll(`script[src='${src}']`);
    existing.forEach((el) => el.remove());
    const s = document.createElement("script");
    // add cache-buster to ensure the script re-executes
    s.src = `${src}?_=${Date.now()}`;
    s.async = true;
    document.body.appendChild(s);

    return () => {
      // cleanup appended script on unmount
      try {
        s.remove();
      } catch (e) {
        // ignore
      }
    };
  }, []);

  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto py-12 px-4">
        <div id="market-research-embed">
          <div data-youform-embed="" data-form="xehdqwp1" data-base-url="https://app.youform.com" data-width="100%" data-height="700"></div>
        </div>
      </div>
    </main>
  );
}
