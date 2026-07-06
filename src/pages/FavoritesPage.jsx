import React from 'react';
import { useFavorites } from '../context/FavoritesContext.jsx';
import RecipeGrid from '../components/RecipeCard/RecipeGrid.jsx';

export default function FavoritesPage() {
  const { favorites, recentlyViewed } = useFavorites();

  return (
    <div className="container" style={{ padding: '32px 20px 60px' }}>
      <h2 style={{ marginBottom: 20 }}>❤️ Your Favorite Recipes</h2>
      <RecipeGrid recipes={favorites} />

      {recentlyViewed.length > 0 && (
        <div style={{ marginTop: 48 }}>
          <h2 style={{ marginBottom: 20 }}>🕓 Recently Viewed</h2>
          <RecipeGrid recipes={recentlyViewed} />
        </div>
      )}
    </div>
  );
}
