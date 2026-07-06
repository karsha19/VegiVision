import React from 'react';
import RecipeCard from './RecipeCard.jsx';

export default function RecipeGrid({ recipes }) {
  if (!recipes || recipes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--color-text-muted)' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔍</div>
        <p>No recipes match your filters. Try adjusting search or filters.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 24,
      }}
    >
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
