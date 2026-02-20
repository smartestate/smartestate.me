import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-background py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">About</h1>
        <p className="text-muted-foreground mb-6">Smart Estate is building better property maintenance tools that help teams respond faster and tenants stay happier.</p>
        <Link to="/" className="text-sm text-primary">Back home</Link>
      </div>
    </div>
  );
}
