import React, { useEffect } from 'react';
import FuzzyText from '../components/landing/FuzzyText';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Ghost } from 'lucide-react';

function NotFound(): JSX.Element {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Ghost className="w-8 h-8 text-primary" />
        </div>
        <FuzzyText className="text-6xl md:text-[clamp(2rem,10vw,10rem)] font-bold text-foreground mb-3">404</FuzzyText>
        <p className="text-muted-foreground mb-8">Oops! This page doesn't exist.</p>
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

export default NotFound;
