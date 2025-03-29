// Import styles
import './styles/main.css?url';
import './styles/blocks.css?url';
import './styles/interface.css?url';

// Import app
import { HorizonTimelapse } from './js/App.js';

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new HorizonTimelapse();
  app.init();
  
  // Expose app to window for debugging
  window.horizonApp = app;
}); 