import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: '28px 0',
        marginTop: 60,
        textAlign: 'center',
        color: 'var(--color-text-muted)',
        fontSize: '0.85rem',
      }}
    >
      <div className="container">
        <p>🌿 Vegetable Recipe Maker — turn your fridge photo into dinner ideas, instantly.</p>
        <p>Powered by Gemini Vision &amp; Gemini Text Generation</p>
      </div>
    </footer>
  );
}
