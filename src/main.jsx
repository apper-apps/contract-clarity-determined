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
  // Check if canvas context is available
  if (typeof window === 'undefined' || !window.CanvasRenderingContext2D) {
    console.warn('Canvas context not available, skipping canvas error prevention');
    return;
  }

  const originalDrawImage = window.CanvasRenderingContext2D.prototype.drawImage;
  window.CanvasRenderingContext2D.prototype.drawImage = function(...args) {
    try {
      const image = args[0];
      
      // Validate image argument exists
      if (!image) {
        console.warn('Canvas drawImage: No image provided');
        return;
      }
      
      // Handle different image types with safe type checking
      if (window.HTMLCanvasElement && image instanceof window.HTMLCanvasElement) {
        // Check canvas dimensions
        if (image.width === 0 || image.height === 0) {
          console.warn('Prevented canvas drawImage with zero dimensions:', {
            width: image.width,
            height: image.height,
            type: 'HTMLCanvasElement'
          });
          return;
        }
      } else if (window.HTMLImageElement && image instanceof window.HTMLImageElement) {
        // Check image loading state and dimensions
        if (!image.complete || image.naturalWidth === 0 || image.naturalHeight === 0) {
          console.warn('Prevented canvas drawImage with invalid image:', {
            complete: image.complete,
            naturalWidth: image.naturalWidth,
            naturalHeight: image.naturalHeight,
            src: image.src,
            type: 'HTMLImageElement'
          });
          return;
        }
      } else if (window.HTMLVideoElement && image instanceof window.HTMLVideoElement) {
        // Check video readiness and dimensions
        if (image.readyState < 2 || image.videoWidth === 0 || image.videoHeight === 0) {
          console.warn('Prevented canvas drawImage with invalid video:', {
            readyState: image.readyState,
            videoWidth: image.videoWidth,
            videoHeight: image.videoHeight,
            type: 'HTMLVideoElement'
          });
          return;
        }
      } else if (window.ImageBitmap && image instanceof window.ImageBitmap) {
        // Check ImageBitmap dimensions
        if (image.width === 0 || image.height === 0) {
          console.warn('Prevented canvas drawImage with zero ImageBitmap dimensions:', {
            width: image.width,
            height: image.height,
            type: 'ImageBitmap'
          });
          return;
        }
      }
      
      // Validate destination canvas context
      if (this.canvas && (this.canvas.width === 0 || this.canvas.height === 0)) {
        console.warn('Prevented drawImage on canvas with zero dimensions:', {
          canvasWidth: this.canvas.width,
          canvasHeight: this.canvas.height
        });
        return;
      }
      
      return originalDrawImage.apply(this, args);
    } catch (error) {
      console.warn('Canvas drawImage error prevented:', {
        error: error.message,
        stack: error.stack,
        imageType: args[0]?.constructor?.name || 'unknown',
        args: args.length
      });
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