import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Download(): JSX.Element {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-lg p-8">
          <h1 className="text-2xl font-semibold mb-4">Download</h1>
          <p className="text-sm text-muted-foreground mb-6">Resources and downloads for Smart Estate.</p>

          <ul className="space-y-3 mb-6">
            <li>
              <a href="#" className="text-primary hover:underline">Smart Estate Desktop App (Windows)</a>
            </li>
            <li>
              <a href="#" className="text-primary hover:underline">Smart Estate Desktop App (macOS)</a>
            </li>
            <li>
              <a href="#" className="text-primary hover:underline">Release Notes</a>
            </li>
          </ul>

          <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
