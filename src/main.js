// Import styles
import './styles/main.css';
import './styles/blocks.css';
import './styles/interface.css';

// Import app
import { HorizonTimelapse } from './js/App.js';

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new HorizonTimelapse();
  app.init();
  
  // Expose app to window for debugging
  window.horizonApp = app;
}); 