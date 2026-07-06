import React from 'react';

function confidenceColor(score) {
  if (score >= 0.85) return 'var(--color-primary)';
  if (score >= 0.6) return 'var(--color-accent)';
  return 'var(--color-danger)';
}

export default function VegetableList({ vegetables, onGenerateRecipes, isGenerating }) {
  if (!vegetables || vegetables.length === 0) return null;

  return (
    <div className="card slide-up" style={{ padding: 24 }}>
      <h3 style={{ marginBottom: 16 }}>🥕 Detected Vegetables</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        {vegetables.map((veg, idx) => (
          <div
            key={`${veg.name}-${idx}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 16px',
            }}
          >
            <span style={{ fontWeight: 600 }}>{veg.name}</span>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: confidenceColor(veg.confidence),
              }}
            >
              {Math.round(veg.confidence * 100)}%
            </span>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" style={{ width: '100%' }} onClick={onGenerateRecipes} disabled={isGenerating}>
        {isGenerating ? 'Generating Recipes…' : '✨ Generate Recipes'}
      </button>
    </div>
  );
}
