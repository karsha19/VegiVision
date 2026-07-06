import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext.jsx';

const difficultyColors = {
  Easy: 'var(--color-primary)',
  Medium: 'var(--color-accent)',
  Hard: 'var(--color-danger)',
};

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(recipe.id);

  return (
    <div
      className="card slide-up"
      style={{ overflow: 'hidden', cursor: 'pointer' }}
      onClick={() => navigate(`/recipe/${recipe.id}`, { state: { recipe } })}
    >
      <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
        <img
          src={recipe.image}
          alt={recipe.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = 'https://placehold.co/600x400/2e7d32/ffffff?text=' + encodeURIComponent(recipe.name);
          }}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(recipe);
          }}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: 'rgba(255,255,255,0.9)',
            borderRadius: '50%',
            width: 36,
            height: 36,
            fontSize: '1.1rem',
          }}
          aria-label="Toggle favorite"
        >
          {fav ? '❤️' : '🤍'}
        </button>
        <span
          style={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            background: 'rgba(0,0,0,0.6)',
            color: '#fff',
            padding: '4px 10px',
            borderRadius: 20,
            fontSize: '0.75rem',
          }}
        >
          {recipe.cuisine}
        </span>
      </div>
      <div style={{ padding: 18 }}>
        <h4 style={{ marginBottom: 6 }}>{recipe.name}</h4>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginBottom: 12, minHeight: 40 }}>
          {recipe.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
          <span>⏱ {recipe.totalTime}</span>
          <span style={{ color: difficultyColors[recipe.difficulty] || 'inherit', fontWeight: 600 }}>
            {recipe.difficulty}
          </span>
          <span>🍽 {recipe.servings} servings</span>
        </div>
        {recipe.dietary?.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
            {recipe.dietary.map((d) => (
              <span
                key={d}
                style={{
                  fontSize: '0.7rem',
                  background: 'rgba(46,125,50,0.1)',
                  color: 'var(--color-primary)',
                  padding: '3px 8px',
                  borderRadius: 12,
                }}
              >
                {d}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
