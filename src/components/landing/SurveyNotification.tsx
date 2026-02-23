import { useState, useEffect } from "react";

export default function SurveyNotification(): JSX.Element | null {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="max-w-xs bg-white/95 border border-border rounded-lg shadow-lg p-3 flex items-start gap-3">
        <div className="flex-1">
          <div className="text-sm font-semibold">We’re running a short survey</div>
          <div className="text-xs text-muted-foreground">Help shape Smart Estate — please take our market research survey.</div>
          <div className="mt-3 flex items-center gap-2">
            <a
              href="/market-research-survey"
              className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded text-sm"
            >
              Take survey
            </a>
            <button
              aria-label="Dismiss"
              onClick={() => setVisible(false)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
