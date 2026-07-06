import axios from 'axios';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const VISION_MODEL = import.meta.env.VITE_GEMINI_VISION_MODEL || 'gemini-1.5-flash';
const TEXT_MODEL = import.meta.env.VITE_GEMINI_TEXT_MODEL || 'gemini-1.5-flash';

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

/**
 * Strips the data URL prefix from a base64 image string.
 */
function stripBase64Prefix(base64) {
  const commaIndex = base64.indexOf(',');
  return commaIndex !== -1 ? base64.slice(commaIndex + 1) : base64;
}

function getMimeType(base64) {
  const match = base64.match(/^data:(image\/[a-zA-Z]+);base64,/);
  return match ? match[1] : 'image/jpeg';
}

/**
 * Extracts the first valid JSON block from a text response
 * (Gemini sometimes wraps JSON in markdown fences).
 */
function extractJson(text) {
  const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    const match = cleaned.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw new Error('Could not parse AI response as JSON');
  }
}

async function callGemini(model, payload) {
  if (!API_KEY) {
    throw new Error(
      'Missing Gemini API key. Add VITE_GEMINI_API_KEY to your .env file (see .env.example).'
    );
  }
  try {
    const { data } = await axios.post(
      `${BASE_URL}/${model}:generateContent?key=${API_KEY}`,
      payload,
      { headers: { 'Content-Type': 'application/json' }, timeout: 45000 }
    );
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Empty response from Gemini API');
    return text;
  } catch (err) {
    if (err.response) {
      const msg = err.response.data?.error?.message || 'Gemini API request failed';
      throw new Error(msg);
    } else if (err.request) {
      throw new Error('Network error: could not reach Gemini API. Check your connection.');
    } else {
      throw err;
    }
  }
}

/**
 * Detects vegetables in an image using Gemini Vision.
 * Returns an array of { name, confidence } objects.
 */
export async function detectVegetables(base64Image) {
  const mimeType = getMimeType(base64Image);
  const imageData = stripBase64Prefix(base64Image);

  const prompt = `You are a produce recognition expert. Look at this image carefully and identify every distinct vegetable visible.
Respond ONLY with a raw JSON array (no markdown, no explanation) in this exact format:
[{"name": "Tomato", "confidence": 0.97}, {"name": "Onion", "confidence": 0.89}]
Confidence must be a number between 0 and 1 reflecting how certain you are.
If NO vegetables are visible in the image, respond with an empty array: []`;

  const payload = {
    contents: [
      {
        parts: [
          { text: prompt },
          { inline_data: { mime_type: mimeType, data: imageData } },
        ],
      },
    ],
    generationConfig: { temperature: 0.2, maxOutputTokens: 1024 },
  };

  const text = await callGemini(VISION_MODEL, payload);
  const result = extractJson(text);
  if (!Array.isArray(result)) throw new Error('Unexpected response format from vision model');
  return result;
}

/**
 * Generates multiple recipes based on a list of detected vegetable names.
 */
export async function generateRecipes(vegetables) {
  const veggieList = vegetables.join(', ');

  const prompt = `Create 6 diverse, delicious recipes using some or all of these vegetables: ${veggieList}.
Include a variety of cuisines (e.g. Indian, Chinese, Italian, Mexican, Continental) and dietary types where sensible (Vegetarian, Vegan, Gluten-Free, High Protein, Low Calorie).
Respond ONLY with a raw JSON array (no markdown fences, no commentary) where each object has exactly this shape:
{
  "id": "unique-slug-string",
  "name": "Recipe Name",
  "cuisine": "Indian | Chinese | Italian | Mexican | Continental | Thai | Mediterranean",
  "dietary": ["Vegetarian"],
  "description": "One or two sentence appetizing description",
  "prepTime": "15 mins",
  "cookTime": "20 mins",
  "totalTime": "35 mins",
  "difficulty": "Easy | Medium | Hard",
  "servings": 4,
  "ingredients": ["1 cup chopped tomato", "2 tbsp olive oil"],
  "instructions": ["Step one text", "Step two text"],
  "nutrition": { "calories": 250, "protein": "8g", "carbs": "30g", "fat": "10g" },
  "tips": ["Helpful cooking tip"],
  "substitutions": ["Swap X for Y if unavailable"]
}
Ensure valid JSON syntax, double-quoted keys and strings, and no trailing commas.`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.8, maxOutputTokens: 8192 },
  };

  const text = await callGemini(TEXT_MODEL, payload);
  const result = extractJson(text);
  if (!Array.isArray(result)) throw new Error('Unexpected response format from text model');

  // Attach a deterministic placeholder image + guard against missing ids
  return result.map((recipe, idx) => ({
    ...recipe,
    id: recipe.id || `recipe-${Date.now()}-${idx}`,
    image: `https://source.unsplash.com/600x400/?${encodeURIComponent(
      recipe.name || 'vegetable,food'
    )},food`,
  }));
}
