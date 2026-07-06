import React, { useRef, useState, useCallback } from 'react';
import { validateImageFile } from '../../utils/imageUtils.js';

export default function Dropzone({ onFileSelected, onError }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (files) => {
      const file = files?.[0];
      if (!file) return;
      const { valid, error } = validateImageFile(file);
      if (!valid) {
        onError(error);
        return;
      }
      onFileSelected(file);
    },
    [onFileSelected, onError]
  );

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      className="card fade-in"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      style={{
        padding: '48px 24px',
        textAlign: 'center',
        cursor: 'pointer',
        border: `2px dashed ${isDragging ? 'var(--color-primary)' : 'var(--color-border)'}`,
        background: isDragging ? 'rgba(46,125,50,0.06)' : 'var(--color-surface)',
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div style={{ fontSize: '3rem', marginBottom: 12 }}>📷</div>
      <h3 style={{ marginBottom: 6 }}>Drag &amp; drop a vegetable photo</h3>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 16 }}>
        or click to browse — JPG, PNG, WEBP up to 8MB
      </p>
      <button type="button" className="btn btn-primary">
        Choose Image
      </button>
    </div>
  );
}
