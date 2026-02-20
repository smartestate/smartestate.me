import React from 'react';
import { Link } from 'react-router-dom';

export default function Press() {
  return (
    <div className="min-h-screen bg-background py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Press</h1>
        <p className="text-muted-foreground mb-6">Press resources and media kit.</p>
        <Link to="/" className="text-sm text-primary">Back home</Link>
      </div>
    </div>
  );
}
