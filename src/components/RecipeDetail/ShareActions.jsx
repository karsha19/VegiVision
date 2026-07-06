import React, { useState } from 'react';
import { useRecipePdf } from '../../hooks/useRecipePdf.js';

export default function ShareActions({ recipe, printRef }) {
  const { downloadPdf, isGenerating } = useRecipePdf();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: recipe.name,
      text: `Check out this recipe for ${recipe.name}!`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <button className="btn btn-ghost" onClick={handleShare}>
        {copied ? '✓ Link Copied' : '🔗 Share'}
      </button>
      <button className="btn btn-ghost" onClick={() => window.print()}>
        🖨️ Print
      </button>
      <button
        className="btn btn-ghost"
        onClick={() => downloadPdf(printRef, recipe.name.replace(/\s+/g, '_'))}
        disabled={isGenerating}
      >
        {isGenerating ? 'Preparing PDF…' : '⬇️ Download PDF'}
      </button>
    </div>
  );
}
