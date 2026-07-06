import React from 'react';

export default function Spinner({ size = 40, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: `${Math.max(3, size / 10)}px solid var(--color-border)`,
          borderTopColor: 'var(--color-primary)',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      {label && (
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>{label}</p>
      )}
    </div>
  );
}
