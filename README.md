# 🥦 Vegetable Recipe Maker from Image

An AI-powered React app: upload or capture a photo of vegetables, detect them with
Gemini Vision, and generate complete recipes with Gemini's text model.

## Features

- Drag-and-drop image upload + camera capture, with preview/remove/replace
- AI vegetable detection with confidence scores (Gemini Vision API)
- AI recipe generation: name, image, description, prep/cook time, difficulty,
  servings, ingredients, steps, nutrition, tips, substitutions
- Search recipes by name/ingredient; filter by cuisine & dietary preference
- Favorites (Local Storage) + Recently Viewed
- Share (Web Share API / clipboard fallback), Print, Download as PDF
- Dark mode toggle, responsive layout, smooth animations
- Graceful error handling (invalid file, network failure, API errors, no vegetables found)
- Runs in **demo mode** out of the box (mock AI responses) if no API key is set

## Getting Started

```bash
npm install
cp .env.example .env
# then edit .env and add your Gemini API key
npm run dev
```

Get a free Gemini API key at https://aistudio.google.com/app/apikey

Without a key set, the app automatically falls back to `mockService.js` so you
can still explore the full UI/UX.

## Project Structure

```
src/
  assets/styles/theme.css       Design tokens & global styles (green/white food theme)
  components/
    ImageUpload/                Dropzone, CameraCapture, ImagePreview
    VegetableDetection/         VegetableList (confidence badges)
    RecipeCard/                 RecipeCard, RecipeGrid, RecipeFilters
    RecipeDetail/               NutritionInfo, InstructionSteps, ShareActions
    Layout/                     Header, Footer
    Common/                     Spinner, ProgressSteps, ErrorBanner, ErrorBoundary
  context/                      ThemeContext (dark mode), FavoritesContext (LS)
  hooks/                        useCamera, useRecipePdf
  services/                     geminiService.js (real API), mockService.js (demo)
  utils/                        imageUtils.js (validation, resize, base64)
  pages/                        HomePage, RecipesPage, RecipeDetailPage, FavoritesPage, NotFoundPage
  App.jsx, main.jsx
```

## Switching from Demo Mode to Live Gemini API

`HomePage.jsx` checks `VITE_GEMINI_API_KEY` and automatically routes calls to
`geminiService.js` instead of `mockService.js` — no code changes needed beyond
setting the environment variable.

## Build

```bash
npm run build
npm run preview
```

## Notes

- Recipe images use Unsplash source URLs as placeholders (swap in an image-gen
  API in `geminiService.js` if you want fully AI-generated recipe photography).
- PDF export uses `html2canvas` + `jsPDF` to snapshot the recipe detail card.
