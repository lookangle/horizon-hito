import { formatTime } from '../utils/timeUtils.js';
import { INITIAL_HOUR, INITIAL_MINUTE } from '../constants/timeConstants.js';

/**
 * UI Controller - Handles UI interactions and updates
 */
export class UIController {
  constructor(elements, onReset, onTogglePause) {
    this.timeDisplay = elements.timeDisplay;
    this.blockCounter = elements.blockCounter;
    this.pauseButton = elements.pauseButton;
    this.resetButton = elements.resetButton;
    this.toggleInterface = elements.toggleInterface;
    this.interfaceElement = elements.interfaceElement;
    this.keyIndicator = document.getElementById('key-indicator');
    
    // State
    this.currentHour = INITIAL_HOUR;
    this.currentMinute = INITIAL_MINUTE;
    this.isPaused = false;
    this.showInterface = true;
    this.keyIndicatorTimeout = null;
    
    // Callbacks
    this.onReset = onReset;
    this.onTogglePause = onTogglePause;
    
    // Initialize
    this.setupEventListeners();
    this.updateTimeDisplay();
  }
  
  /**
   * Set up event listeners
   */
  setupEventListeners() {
    this.resetButton.addEventListener('click', () => this.handleReset());
    this.toggleInterface.addEventListener('click', () => this.handleToggleInterface());
    this.pauseButton.addEventListener('click', () => this.handleTogglePause());
    
    // Add keyboard event listener for 'H' key
    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'h') {
        this.handleToggleInterface();
        this.showKeyIndicator();
      }
    });
  }
  
  /**
   * Show the key indicator briefly then fade
   */
  showKeyIndicator() {
    // Clear any existing timeout
    if (this.keyIndicatorTimeout) {
      clearTimeout(this.keyIndicatorTimeout);
    }
    
    // Update key indicator text based on current state
    this.keyIndicator.textContent = this.showInterface ? 'UI Hidden (Press H to show)' : 'UI Shown (Press H to hide)';
    
    // Show the indicator
    this.keyIndicator.classList.add('visible');
    this.keyIndicator.classList.remove('fade');
    
    // Set timeout to fade it after 2 seconds
    this.keyIndicatorTimeout = setTimeout(() => {
      this.keyIndicator.classList.add('fade');
      
      // Remove the visible class after fade completes
      setTimeout(() => {
        this.keyIndicator.classList.remove('visible');
      }, 300);
    }, 2000);
  }
  
  /**
   * Update time display
   */
  updateTimeDisplay() {
    this.timeDisplay.textContent = formatTime(this.currentHour, this.currentMinute);
  }
  
  /**
   * Update block counter
   */
  updateBlockCounter(count) {
    this.blockCounter.textContent = `Blocks: ${count}`;
  }
  
  /**
   * Reset the visualization
   */
  handleReset() {
    // Reset time to 5:00 AM
    this.currentHour = INITIAL_HOUR;
    this.currentMinute = INITIAL_MINUTE;
    this.updateTimeDisplay();
    
    // Call reset callback
    if (this.onReset) {
      this.onReset();
    }
  }
  
  /**
   * Toggle interface visibility
   */
  handleToggleInterface() {
    this.showInterface = !this.showInterface;
    if (this.showInterface) {
      this.interfaceElement.classList.remove('hidden');
    } else {
      this.interfaceElement.classList.add('hidden');
    }
    
    // No need to update the toggle button text, as it's now hidden
  }
  
  /**
   * Toggle pause/play
   */
  handleTogglePause() {
    this.isPaused = !this.isPaused;
    this.pauseButton.textContent = this.isPaused ? 'Play' : 'Pause';
    
    // Call pause callback
    if (this.onTogglePause) {
      this.onTogglePause(this.isPaused);
    }
  }
  
  /**
   * Advance time by one minute
   */
  advanceTime() {
    if (this.isPaused) return false;
    
    this.currentMinute = (this.currentMinute + 1) % 60;
    this.updateTimeDisplay();
    
    // When a full minute passes, advance hour
    if (this.currentMinute === 0) {
      this.currentHour = (this.currentHour + 1) % 24;
      return true; // Indicate hour change
    }
    
    return false; // No hour change
  }
  
  /**
   * Get current hour
   */
  getCurrentHour() {
    return this.currentHour;
  }
  
  /**
   * Check if visualization is paused
   */
  isPaused() {
    return this.isPaused;
  }
} 