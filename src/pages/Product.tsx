import React from 'react';
import { Link } from 'react-router-dom';

export default function Product() {
  return (
    <div className="min-h-screen bg-background py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Product</h1>
        <p className="text-muted-foreground mb-6">Overview of Smart Estate product and features.</p>
        <Link to="/" className="text-sm text-primary">Back home</Link>
      </div>
    </div>
  );
}
