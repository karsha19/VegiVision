import React from 'react';

export default function ProgressSteps({ steps, currentStep }) {
  return (
    <div style={{ display: 'flex', gap: 8, width: '100%', maxWidth: 420, margin: '0 auto' }}>
      {steps.map((step, idx) => (
        <div key={step} style={{ flex: 1, textAlign: 'center' }}>
          <div
            style={{
              height: 6,
              borderRadius: 4,
              background: idx <= currentStep ? 'var(--color-primary)' : 'var(--color-border)',
              transition: 'background 0.3s ease',
              marginBottom: 8,
            }}
          />
          <span
            style={{
              fontSize: '0.75rem',
              color: idx <= currentStep ? 'var(--color-primary)' : 'var(--color-text-muted)',
              fontWeight: idx === currentStep ? 600 : 400,
            }}
          >
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}
