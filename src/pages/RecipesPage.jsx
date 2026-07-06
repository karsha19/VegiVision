import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RecipeGrid from '../components/RecipeCard/RecipeGrid.jsx';
import RecipeFilters from '../components/RecipeCard/RecipeFilters.jsx';

export default function RecipesPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const recipes = state?.recipes;
  const vegetables = state?.vegetables || [];

  const [search, setSearch] = useState('');
  const [cuisine, setCuisine] = useState('All');
  const [dietary, setDietary] = useState([]);

  const filtered = useMemo(() => {
    if (!recipes) return [];
    return recipes.filter((r) => {
      const matchesSearch =
        !search ||
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.ingredients?.some((i) => i.toLowerCase().includes(search.toLowerCase()));
      const matchesCuisine = cuisine === 'All' || r.cuisine === cuisine;
      const matchesDietary = dietary.length === 0 || dietary.every((d) => r.dietary?.includes(d));
      return matchesSearch && matchesCuisine && matchesDietary;
    });
  }, [recipes, search, cuisine, dietary]);

  if (!recipes) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2>No recipes to show yet</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 20 }}>
          Upload a vegetable photo first to generate recipes.
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Upload an Image
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '32px 20px 60px' }}>
      <h2 style={{ marginBottom: 6 }}>Recipes For You</h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 24 }}>
        Based on: {vegetables.join(', ')}
      </p>

      <RecipeFilters
        search={search}
        setSearch={setSearch}
        cuisine={cuisine}
        setCuisine={setCuisine}
        dietary={dietary}
        setDietary={setDietary}
      />

      <RecipeGrid recipes={filtered} />
    </div>
  );
}
