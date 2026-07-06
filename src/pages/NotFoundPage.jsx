import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: '3rem' }}>🥕</div>
      <h1>404 — Page Not Found</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 20 }}>
        Looks like this page got cooked away.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
