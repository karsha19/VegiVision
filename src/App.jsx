import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header.jsx';
import Footer from './components/Layout/Footer.jsx';
import ErrorBoundary from './components/Common/ErrorBoundary.jsx';
import HomePage from './pages/HomePage.jsx';
import RecipesPage from './pages/RecipesPage.jsx';
import RecipeDetailPage from './pages/RecipeDetailPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <ErrorBoundary>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
