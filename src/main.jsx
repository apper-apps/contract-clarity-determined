import '@/index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";

// Error handler for Apper SDK
const handleApperError = (error) => {
  console.warn('Apper SDK Error:', error);
  // Fallback behavior - app continues to work without SDK
  if (window.Apper) {
    window.Apper.handleError?.(error);
  }
};

// Canvas error prevention
const preventCanvasErrors = () => {
  const originalDrawImage = CanvasRenderingContext2D.prototype.drawImage;
  CanvasRenderingContext2D.prototype.drawImage = function(...args) {
    try {
      const canvas = args[0];
      if (canvas && canvas.width === 0 || canvas.height === 0) {
        console.warn('Prevented canvas drawImage with zero dimensions');
        return;
      }
      return originalDrawImage.apply(this, args);
    } catch (error) {
      console.warn('Canvas drawImage error prevented:', error);
      handleApperError(error);
    }
  };
};

// Initialize SDK safely after DOM is ready
const initializeApperSDK = () => {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      window.addEventListener('load', resolve);
    }
  }).then(() => {
    // Add small delay to ensure CSS is applied
    return new Promise(resolve => setTimeout(resolve, 100));
  }).then(() => {
    if (window.Apper) {
      try {
        window.Apper.init?.({
          projectId: import.meta.env.VITE_APPER_PROJECT_ID,
          publicKey: import.meta.env.VITE_APPER_PUBLIC_KEY,
          onError: handleApperError
        });
      } catch (error) {
        handleApperError(error);
      }
    }
  });
};

// Apply canvas protection immediately
preventCanvasErrors();

// Initialize app
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)