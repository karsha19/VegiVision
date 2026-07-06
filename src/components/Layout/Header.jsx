import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useFavorites } from '../../context/FavoritesContext.jsx';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 68,
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.6rem' }}>🥦</span>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '1.15rem',
              color: 'var(--color-primary)',
            }}
          >
            Veggie Recipe Maker
          </span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="btn btn-ghost" onClick={() => navigate('/favorites')} style={{ position: 'relative' }}>
            ❤️ Favorites
            {favorites.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  background: 'var(--color-danger)',
                  color: '#fff',
                  fontSize: '0.65rem',
                  borderRadius: '50%',
                  width: 18,
                  height: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {favorites.length}
              </span>
            )}
          </button>
          <button
            className="btn btn-ghost"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  );
}
