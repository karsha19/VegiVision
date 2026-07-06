import React from 'react';

export default function ErrorBanner({ message, onRetry, onDismiss }) {
  if (!message) return null;
  return (
    <div
      className="fade-in"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'rgba(214, 69, 69, 0.1)',
        border: '1px solid rgba(214, 69, 69, 0.3)',
        color: 'var(--color-danger)',
        padding: '14px 18px',
        borderRadius: 'var(--radius-md)',
        margin: '16px 0',
      }}
      role="alert"
    >
      <span style={{ fontSize: '1.2rem' }}>⚠️</span>
      <span style={{ flex: 1, fontSize: '0.9rem' }}>{message}</span>
      {onRetry && (
        <button className="btn btn-outline" style={{ borderColor: 'var(--color-danger)', color: 'var(--color-danger)', padding: '6px 14px' }} onClick={onRetry}>
          Retry
        </button>
      )}
      {onDismiss && (
        <button onClick={onDismiss} style={{ fontSize: '1.1rem', color: 'var(--color-danger)' }} aria-label="Dismiss">
          ×
        </button>
      )}
    </div>
  );
}
