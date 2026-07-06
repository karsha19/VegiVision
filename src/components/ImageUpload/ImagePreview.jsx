import React from 'react';

export default function ImagePreview({ imageSrc, onRemove, onReplace, disabled }) {
  return (
    <div className="card slide-up" style={{ padding: 20, textAlign: 'center' }}>
      <div
        style={{
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          maxHeight: 360,
          marginBottom: 16,
        }}
      >
        <img src={imageSrc} alt="Uploaded vegetables" style={{ width: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-ghost" onClick={onReplace} disabled={disabled}>
          🔄 Replace
        </button>
        <button
          className="btn btn-ghost"
          onClick={onRemove}
          disabled={disabled}
          style={{ color: 'var(--color-danger)' }}
        >
          🗑️ Remove
        </button>
      </div>
    </div>
  );
}
