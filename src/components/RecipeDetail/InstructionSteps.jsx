import React, { useState } from 'react';

export default function InstructionSteps({ instructions }) {
  const [checked, setChecked] = useState({});

  const toggle = (idx) => setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));

  return (
    <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {instructions.map((step, idx) => (
        <li
          key={idx}
          onClick={() => toggle(idx)}
          style={{
            display: 'flex',
            gap: 14,
            padding: '14px 0',
            borderBottom: idx < instructions.length - 1 ? '1px solid var(--color-border)' : 'none',
            cursor: 'pointer',
            opacity: checked[idx] ? 0.55 : 1,
            transition: 'opacity 0.2s ease',
          }}
        >
          <span
            style={{
              flexShrink: 0,
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: checked[idx] ? 'var(--color-primary)' : 'var(--color-bg)',
              border: '1.5px solid var(--color-primary)',
              color: checked[idx] ? '#fff' : 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem',
            }}
          >
            {checked[idx] ? '✓' : idx + 1}
          </span>
          <span style={{ textDecoration: checked[idx] ? 'line-through' : 'none' }}>{step}</span>
        </li>
      ))}
    </ol>
  );
}
