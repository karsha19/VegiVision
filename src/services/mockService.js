// Mock service simulates Gemini responses so the app is fully demoable
// without an API key. Swap calls in RecipeContext/pages to geminiService
// once VITE_GEMINI_API_KEY is set.

const SAMPLE_VEGETABLES = [
  { name: 'Tomato', confidence: 0.96 },
  { name: 'Onion', confidence: 0.91 },
  { name: 'Bell Pepper', confidence: 0.88 },
  { name: 'Carrot', confidence: 0.82 },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function mockDetectVegetables() {
  await delay(1600);
  return SAMPLE_VEGETABLES;
}

function buildRecipe(id, name, cuisine, dietary, vegetables) {
  return {
    id,
    name,
    cuisine,
    dietary,
    description: `A vibrant, flavor-packed ${cuisine} dish built around fresh ${vegetables[0]?.toLowerCase() || 'vegetables'}.`,
    prepTime: '15 mins',
    cookTime: '25 mins',
    totalTime: '40 mins',
    difficulty: ['Easy', 'Medium', 'Hard'][id % 3],
    servings: 4,
    image: `https://images.unsplash.com/photo-${1546069901 + id}?w=600&h=400&fit=crop`,
    ingredients: [
      ...vegetables.map((v) => `1 cup chopped ${v.toLowerCase()}`),
      '2 tbsp olive oil',
      '1 tsp salt',
      '1/2 tsp black pepper',
      '2 cloves garlic, minced',
    ],
    instructions: [
      'Wash and chop all vegetables into bite-sized pieces.',
      'Heat oil in a pan over medium heat and sauté garlic until fragrant.',
      'Add vegetables and cook, stirring occasionally, for 8-10 minutes.',
      'Season with salt and pepper, then simmer for another 5 minutes.',
      'Garnish and serve hot.',
    ],
    nutrition: { calories: 220 + id * 15, protein: `${6 + id}g`, carbs: `${25 + id}g`, fat: `${8 + id}g` },
    tips: ['Cut vegetables uniformly for even cooking.', 'Taste and adjust seasoning before serving.'],
    substitutions: ['Use any seasonal vegetable in place of listed ones.', 'Swap olive oil for butter for a richer taste.'],
  };
}

export async function mockGenerateRecipes(vegetables) {
  await delay(2000);
  const names = vegetables.map((v) => (v.name ? v.name : v));
  const templates = [
    ['Vegetable Stir Fry', 'Chinese', ['Vegetarian', 'Vegan']],
    ['Garden Vegetable Curry', 'Indian', ['Vegetarian', 'Gluten-Free']],
    ['Roasted Veggie Pasta', 'Italian', ['Vegetarian']],
    ['Mexican Veggie Tacos', 'Mexican', ['Vegan', 'High Protein']],
    ['Mediterranean Veggie Bowl', 'Mediterranean', ['Vegan', 'Low Calorie']],
    ['Thai Basil Vegetables', 'Thai', ['Vegetarian', 'Gluten-Free']],
  ];
  return templates.map(([name, cuisine, dietary], idx) =>
    buildRecipe(idx, name, cuisine, dietary, names)
  );
}
