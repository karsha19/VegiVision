import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

const FAV_KEY = 'vrm_favorites';
const RECENT_KEY = 'vrm_recent';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    } catch {
      return [];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const isFavorite = (id) => favorites.some((r) => r.id === id);

  const toggleFavorite = (recipe) => {
    setFavorites((prev) =>
      prev.some((r) => r.id === recipe.id)
        ? prev.filter((r) => r.id !== recipe.id)
        : [...prev, recipe]
    );
  };

  const addRecentlyViewed = (recipe) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((r) => r.id !== recipe.id);
      return [recipe, ...filtered].slice(0, 10);
    });
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite, recentlyViewed, addRecentlyViewed }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
