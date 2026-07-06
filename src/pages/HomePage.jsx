import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropzone from '../components/ImageUpload/Dropzone.jsx';
import CameraCapture from '../components/ImageUpload/CameraCapture.jsx';
import ImagePreview from '../components/ImageUpload/ImagePreview.jsx';
import VegetableList from '../components/VegetableDetection/VegetableList.jsx';
import Spinner from '../components/Common/Spinner.jsx';
import ProgressSteps from '../components/Common/ProgressSteps.jsx';
import ErrorBanner from '../components/Common/ErrorBanner.jsx';
import { fileToBase64, resizeImage } from '../utils/imageUtils.js';
import { detectVegetables, generateRecipes } from '../services/geminiService.js';
import { mockDetectVegetables, mockGenerateRecipes } from '../services/mockService.js';

const USE_MOCK = !import.meta.env.VITE_GEMINI_API_KEY;
const STEPS = ['Upload', 'Detect Vegetables', 'Generate Recipes'];

export default function HomePage() {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [vegetables, setVegetables] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const currentStep = imageSrc ? (vegetables ? 2 : 1) : 0;

  const processImage = async (base64) => {
    setError(null);
    setVegetables(null);
    setImageSrc(base64);
    setIsDetecting(true);
    try {
      const resized = await resizeImage(base64);
      const result = USE_MOCK ? await mockDetectVegetables() : await detectVegetables(resized);
      if (!result || result.length === 0) {
        setError('No vegetables detected in this image. Try a clearer, well-lit photo of vegetables.');
        setVegetables([]);
      } else {
        setVegetables(result);
      }
    } catch (err) {
      setError(err.message || 'Failed to detect vegetables. Please try again.');
    } finally {
      setIsDetecting(false);
    }
  };

  const handleFileSelected = async (file) => {
    try {
      const base64 = await fileToBase64(file);
      await processImage(base64);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCameraCapture = async (base64) => {
    setShowCamera(false);
    await processImage(base64);
  };

  const handleRemove = () => {
    setImageSrc(null);
    setVegetables(null);
    setError(null);
  };

  const handleGenerateRecipes = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const names = vegetables.map((v) => v.name);
      const recipes = USE_MOCK
        ? await mockGenerateRecipes(vegetables)
        : await generateRecipes(names);
      navigate('/recipes', { state: { recipes, vegetables: names } });
    } catch (err) {
      setError(err.message || 'Failed to generate recipes. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px 60px' }}>
      <section style={{ textAlign: 'center', marginBottom: 36 }} className="fade-in">
        <h1 style={{ fontSize: '2.2rem', color: 'var(--color-primary-dark)' }}>
          Turn Your Veggies Into a Feast 🍽️
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: 560, margin: '0 auto' }}>
          Snap or upload a photo of your vegetables — our AI will identify them and whip up delicious
          recipe ideas in seconds.
        </p>
        {USE_MOCK && (
          <p style={{ fontSize: '0.8rem', color: 'var(--color-accent)', marginTop: 10 }}>
            Demo mode: add VITE_GEMINI_API_KEY in .env to enable live Gemini AI detection.
          </p>
        )}
      </section>

      <div style={{ maxWidth: 640, margin: '0 auto 32px' }}>
        <ProgressSteps steps={STEPS} currentStep={currentStep} />
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <ErrorBanner message={error} onDismiss={() => setError(null)} />

        {!imageSrc && (
          <>
            <Dropzone onFileSelected={handleFileSelected} onError={setError} />
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>or</span>
            </div>
            <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => setShowCamera(true)}>
              📸 Use Camera
            </button>
          </>
        )}

        {imageSrc && (
          <ImagePreview
            imageSrc={imageSrc}
            onRemove={handleRemove}
            onReplace={handleRemove}
            disabled={isDetecting || isGenerating}
          />
        )}

        {isDetecting && (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <Spinner label="Detecting vegetables with AI…" />
          </div>
        )}

        {vegetables && vegetables.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <VegetableList
              vegetables={vegetables}
              onGenerateRecipes={handleGenerateRecipes}
              isGenerating={isGenerating}
            />
          </div>
        )}

        {isGenerating && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <Spinner label="Cooking up recipe ideas…" />
          </div>
        )}
      </div>

      {showCamera && (
        <CameraCapture onCapture={handleCameraCapture} onClose={() => setShowCamera(false)} />
      )}
    </div>
  );
}
