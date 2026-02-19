import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/download": "Download",
  "/docs": "Documentation",
  "/changelog": "Changelog",
  "/releases": "Releases",
  "/press": "Press",
  "/pricing": "Pricing",
  "/updates": "Updates",
  "/about": "About",
  "/privacy": "Privacy Policy",
  "/terms": "Terms of Service",
};

export default function PlaceholderPage() {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] || "Page";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Construction className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-3">{title}</h1>
        <p className="text-muted-foreground mb-8">
          This page is coming soon. We're working hard to bring you something great.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
