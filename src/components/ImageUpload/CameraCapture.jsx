import React, { useEffect } from 'react';
import { useCamera } from '../../hooks/useCamera.js';

export default function CameraCapture({ onCapture, onClose }) {
  const { videoRef, isActive, error, startCamera, stopCamera, capturePhoto } = useCamera();

  useEffect(() => {
    startCamera();
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCapture = () => {
    const photo = capturePhoto();
    if (photo) {
      onCapture(photo);
      stopCamera();
    }
  };

  return (
    <div
      className="fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
      onClick={() => {
        stopCamera();
        onClose();
      }}
    >
      <div
        className="card"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: 20, maxWidth: 480, width: '100%', textAlign: 'center' }}
      >
        <h3>Capture Photo</h3>
        {error ? (
          <p style={{ color: 'var(--color-danger)' }}>{error}</p>
        ) : (
          <video
            ref={videoRef}
            playsInline
            muted
            style={{ width: '100%', borderRadius: 'var(--radius-md)', background: '#000' }}
          />
        )}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16 }}>
          <button className="btn btn-ghost" onClick={() => { stopCamera(); onClose(); }}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleCapture} disabled={!isActive}>
            📸 Capture
          </button>
        </div>
      </div>
    </div>
  );
}
