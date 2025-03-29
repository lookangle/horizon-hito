// Import styles (removed - will be added to index.html)

// Import app
import { HorizonTimelapse } from './js/App.js';

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new HorizonTimelapse();
  app.init();
  
  // Expose app to window for debugging
  window.horizonApp = app;
}); 