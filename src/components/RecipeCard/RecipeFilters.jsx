import React from 'react';

const CUISINES = ['All', 'Indian', 'Chinese', 'Italian', 'Mexican', 'Continental', 'Thai', 'Mediterranean'];
const DIETARY = ['Vegetarian', 'Vegan', 'Gluten-Free', 'High Protein', 'Low Calorie'];

export default function RecipeFilters({ search, setSearch, cuisine, setCuisine, dietary, setDietary }) {
  const toggleDietary = (tag) => {
    setDietary((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  return (
    <div className="card" style={{ padding: 20, marginBottom: 24 }}>
      <input
        type="text"
        placeholder="🔍 Search recipes by name or ingredient…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          background: 'var(--color-bg)',
          color: 'var(--color-text)',
          marginBottom: 16,
          fontSize: '0.95rem',
        }}
      />

      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>Cuisine</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CUISINES.map((c) => (
            <button
              key={c}
              onClick={() => setCuisine(c)}
              className={cuisine === c ? 'btn btn-primary' : 'btn btn-ghost'}
              style={{ padding: '6px 14px', fontSize: '0.82rem' }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>Dietary Preference</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {DIETARY.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleDietary(tag)}
              className={dietary.includes(tag) ? 'btn btn-primary' : 'btn btn-ghost'}
              style={{ padding: '6px 14px', fontSize: '0.82rem' }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
