import { Link } from "react-router-dom";
import TextPressure from "../ui/TextPressure";

export default function Footer(): JSX.Element {
  return (
    <footer className="border-t border-border bg-card">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between gap-12">
        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground">Property maintenance, reimagined</h3>
        </div>
        <div className="flex gap-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div className="space-y-3">
              {/* Links removed for production build */}
            </div>
            <div className="space-y-3">
              {/* Links removed for production build */}
            </div>
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="px-6 pb-4 overflow-hidden" style={{ height: 300 }}>
        <div className="max-w-7xl mx-auto h-full">
          <div style={{ position: 'relative', height: '300px' }}>
            {/* TextPressure handles responsive sizing and interactive pressure */}
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <TextPressure text="Smart Estate" minFontSize={48} textColor="rgba(17,24,39,0.2)" />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground">Smart Estate</span>
          <div className="flex gap-6">
            {/* Bottom links intentionally removed to avoid repetition */}
          </div>
        </div>
      </div>
    </footer>
  );
}
