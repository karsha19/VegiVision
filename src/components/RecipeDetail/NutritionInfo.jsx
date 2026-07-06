import React from 'react';

const items = [
  { key: 'calories', label: 'Calories', icon: '🔥' },
  { key: 'protein', label: 'Protein', icon: '💪' },
  { key: 'carbs', label: 'Carbs', icon: '🌾' },
  { key: 'fat', label: 'Fat', icon: '🥑' },
];

export default function NutritionInfo({ nutrition }) {
  if (!nutrition) return null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12 }}>
      {items.map(({ key, label, icon }) => (
        <div
          key={key}
          className="card"
          style={{ padding: 16, textAlign: 'center', boxShadow: 'none' }}
        >
          <div style={{ fontSize: '1.4rem' }}>{icon}</div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', margin: '4px 0' }}>{nutrition[key]}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{label}</div>
        </div>
      ))}
    </div>
  );
}
