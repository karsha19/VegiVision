import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import NutritionInfo from '../components/RecipeDetail/NutritionInfo.jsx';
import InstructionSteps from '../components/RecipeDetail/InstructionSteps.jsx';
import ShareActions from '../components/RecipeDetail/ShareActions.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';

const difficultyColors = {
  Easy: 'var(--color-primary)',
  Medium: 'var(--color-accent)',
  Hard: 'var(--color-danger)',
};

export default function RecipeDetailPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, addRecentlyViewed, favorites, recentlyViewed } = useFavorites();
  const printRef = useRef(null);

  const recipe =
    state?.recipe ||
    favorites.find((r) => r.id === id) ||
    recentlyViewed.find((r) => r.id === id);

  useEffect(() => {
    if (recipe) addRecentlyViewed(recipe);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe?.id]);

  if (!recipe) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2>Recipe not found</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 20 }}>
          This recipe may have expired from this session. Try generating recipes again.
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  const fav = isFavorite(recipe.id);

  return (
    <div className="container" style={{ padding: '32px 20px 60px' }}>
      <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
        ← Back
      </button>

      <div ref={printRef} className="card slide-up" style={{ overflow: 'hidden' }}>
        <div style={{ position: 'relative', height: 300 }}>
          <img
            src={recipe.image}
            alt={recipe.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = 'https://placehold.co/900x400/2e7d32/ffffff?text=' + encodeURIComponent(recipe.name);
            }}
          />
        </div>

        <div style={{ padding: '28px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <span
                style={{
                  fontSize: '0.78rem',
                  background: 'rgba(46,125,50,0.1)',
                  color: 'var(--color-primary)',
                  padding: '4px 12px',
                  borderRadius: 20,
                }}
              >
                {recipe.cuisine}
              </span>
              <h1 style={{ margin: '10px 0 6px' }}>{recipe.name}</h1>
              <p style={{ color: 'var(--color-text-muted)' }}>{recipe.description}</p>
            </div>
            <button
              onClick={() => toggleFavorite(recipe)}
              className="btn btn-ghost"
              style={{ fontSize: '1.3rem' }}
              aria-label="Toggle favorite"
            >
              {fav ? '❤️' : '🤍'}
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 24,
              flexWrap: 'wrap',
              margin: '20px 0',
              padding: '16px 0',
              borderTop: '1px solid var(--color-border)',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <Stat label="Prep Time" value={recipe.prepTime} />
            <Stat label="Cook Time" value={recipe.cookTime} />
            <Stat label="Servings" value={recipe.servings} />
            <Stat
              label="Difficulty"
              value={recipe.difficulty}
              color={difficultyColors[recipe.difficulty]}
            />
          </div>

          {recipe.dietary?.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
              {recipe.dietary.map((d) => (
                <span
                  key={d}
                  style={{
                    fontSize: '0.75rem',
                    background: 'rgba(46,125,50,0.1)',
                    color: 'var(--color-primary)',
                    padding: '4px 10px',
                    borderRadius: 12,
                  }}
                >
                  {d}
                </span>
              ))}
            </div>
          )}

          <div style={{ marginBottom: 8 }}>
            <ShareActions recipe={recipe} printRef={printRef} />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.4fr',
              gap: 32,
              marginTop: 28,
            }}
            className="detail-grid"
          >
            <div>
              <h3>🛒 Ingredients</h3>
              <ul style={{ paddingLeft: 20, lineHeight: 1.9 }}>
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx}>{ing}</li>
                ))}
              </ul>

              {recipe.substitutions?.length > 0 && (
                <>
                  <h4 style={{ marginTop: 20 }}>🔄 Substitutions</h4>
                  <ul style={{ paddingLeft: 20, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    {recipe.substitutions.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div>
              <h3>👩‍🍳 Instructions</h3>
              <InstructionSteps instructions={recipe.instructions} />

              {recipe.tips?.length > 0 && (
                <>
                  <h4 style={{ marginTop: 20 }}>💡 Cooking Tips</h4>
                  <ul style={{ paddingLeft: 20, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    {recipe.tips.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          <h3 style={{ marginTop: 28 }}>🥗 Nutrition (per serving)</h3>
          <NutritionInfo nutrition={recipe.nutrition} />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div>
      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{label}</div>
      <div style={{ fontWeight: 700, color: color || 'inherit' }}>{value}</div>
    </div>
  );
}
