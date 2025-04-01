import { formatTime } from '../utils/timeUtils.js';
import { INITIAL_HOUR, INITIAL_MINUTE } from '../constants/timeConstants.js';

/**
 * UI Controller - Handles UI interactions and updates
 */
export class UIController {
  constructor(elements, onReset, onTogglePause, onAnimationSettingsChange) {
    this.timeDisplay = elements.timeDisplay;
    this.blockCounter = elements.blockCounter;
    this.pauseButton = elements.pauseButton;
    this.resetButton = elements.resetButton;
    this.toggleInterface = elements.toggleInterface;
    this.interfaceElement = elements.interfaceElement;
    this.keyIndicator = document.getElementById('key-indicator');
    this.blurOverlay = document.querySelector('.blur-overlay');
    this.blurSlider = null;
    this.blurValue = null;
    this.saturationSlider = null;
    this.saturationValue = null;
    this.motionIntensitySlider = null;
    this.motionIntensityValue = null;
    this.motionSpeedSlider = null;
    this.motionSpeedValue = null;
    
    // Default blur value (50px)
    this.currentBlur = 10;
    
    // Default saturation value (100%)
    this.currentSaturation = 100;
    
    // Default animation values
    this.currentMotionIntensity = 100; // 100% = default intensity
    this.currentMotionSpeed = 100; // 100% = default speed
    
    // State
    this.currentHour = INITIAL_HOUR;
    this.currentMinute = INITIAL_MINUTE;
    this.isPaused = false;
    this.showInterface = true;
    this.keyIndicatorTimeout = null;
    
    // Callbacks
    this.onReset = onReset;
    this.onTogglePause = onTogglePause;
    this.onAnimationSettingsChange = onAnimationSettingsChange;
    
    // Initialize
    this.createSliderControls();
    this.setupEventListeners();
    this.updateTimeDisplay();
  }
  
  /**
   * Create all slider controls
   */
  createSliderControls() {
    // Create a container for all slider controls
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'slider-controls-container';
    
    // Create each control
    this.createBlurControl(sliderContainer);
    this.createSaturationControl(sliderContainer);
    this.createMotionIntensityControl(sliderContainer);
    this.createMotionSpeedControl(sliderContainer);
    
    // Append container to interface
    this.interfaceElement.appendChild(sliderContainer);
  }
  
  /**
   * Create the blur control elements
   */
  createBlurControl(container) {
    // Create the container
    const blurControl = document.createElement('div');
    blurControl.className = 'blur-control slider-control';
    
    // Create label
    const label = document.createElement('label');
    label.textContent = 'blur:';
    
    // Create slider
    this.blurSlider = document.createElement('input');
    this.blurSlider.type = 'range';
    this.blurSlider.min = '0';
    this.blurSlider.max = '100';
    this.blurSlider.value = this.currentBlur;
    
    // Create value display
    this.blurValue = document.createElement('span');
    this.blurValue.className = 'blur-value slider-value';
    this.blurValue.textContent = this.currentBlur + 'px';
    
    // Append elements
    blurControl.appendChild(label);
    blurControl.appendChild(this.blurSlider);
    blurControl.appendChild(this.blurValue);
    
    // Append to container
    container.appendChild(blurControl);
  }
  
  /**
   * Create the saturation control elements
   */
  createSaturationControl(container) {
    // Create the container
    const saturationControl = document.createElement('div');
    saturationControl.className = 'saturation-control slider-control';
    
    // Create label
    const label = document.createElement('label');
    label.textContent = 'saturation:';
    
    // Create slider
    this.saturationSlider = document.createElement('input');
    this.saturationSlider.type = 'range';
    this.saturationSlider.min = '0';
    this.saturationSlider.max = '200';
    this.saturationSlider.value = this.currentSaturation;
    
    // Create value display
    this.saturationValue = document.createElement('span');
    this.saturationValue.className = 'saturation-value slider-value';
    this.saturationValue.textContent = this.currentSaturation + '%';
    
    // Append elements
    saturationControl.appendChild(label);
    saturationControl.appendChild(this.saturationSlider);
    saturationControl.appendChild(this.saturationValue);
    
    // Append to container
    container.appendChild(saturationControl);
    
    // Apply initial saturation
    this.handleSaturationChange(this.currentSaturation);
  }
  
  /**
   * Create the motion intensity control elements
   */
  createMotionIntensityControl(container) {
    // Create the container
    const intensityControl = document.createElement('div');
    intensityControl.className = 'motion-control slider-control';
    
    // Create label
    const label = document.createElement('label');
    label.textContent = 'motion intensity:';
    
    // Create slider
    this.motionIntensitySlider = document.createElement('input');
    this.motionIntensitySlider.type = 'range';
    this.motionIntensitySlider.min = '0';
    this.motionIntensitySlider.max = '300';
    this.motionIntensitySlider.value = this.currentMotionIntensity;
    
    // Create value display
    this.motionIntensityValue = document.createElement('span');
    this.motionIntensityValue.className = 'motion-value slider-value';
    this.motionIntensityValue.textContent = this.currentMotionIntensity + '%';
    
    // Append elements
    intensityControl.appendChild(label);
    intensityControl.appendChild(this.motionIntensitySlider);
    intensityControl.appendChild(this.motionIntensityValue);
    
    // Append to container
    container.appendChild(intensityControl);
  }
  
  /**
   * Create the motion speed control elements
   */
  createMotionSpeedControl(container) {
    // Create the container
    const speedControl = document.createElement('div');
    speedControl.className = 'motion-control slider-control';
    
    // Create label
    const label = document.createElement('label');
    label.textContent = 'motion speed:';
    
    // Create slider
    this.motionSpeedSlider = document.createElement('input');
    this.motionSpeedSlider.type = 'range';
    this.motionSpeedSlider.min = '20';
    this.motionSpeedSlider.max = '300';
    this.motionSpeedSlider.value = this.currentMotionSpeed;
    
    // Create value display
    this.motionSpeedValue = document.createElement('span');
    this.motionSpeedValue.className = 'motion-value slider-value';
    this.motionSpeedValue.textContent = this.currentMotionSpeed + '%';
    
    // Append elements
    speedControl.appendChild(label);
    speedControl.appendChild(this.motionSpeedSlider);
    speedControl.appendChild(this.motionSpeedValue);
    
    // Append to container
    container.appendChild(speedControl);
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
      }
    });
    
    // Add blur slider event listener
    this.blurSlider.addEventListener('input', (e) => this.handleBlurChange(e.target.value));
    
    // Add saturation slider event listener
    this.saturationSlider.addEventListener('input', (e) => this.handleSaturationChange(e.target.value));
    
    // Add motion intensity slider event listener
    this.motionIntensitySlider.addEventListener('input', (e) => this.handleMotionIntensityChange(e.target.value));
    
    // Add motion speed slider event listener
    this.motionSpeedSlider.addEventListener('input', (e) => this.handleMotionSpeedChange(e.target.value));
  }
  
  /**
   * Handle blur intensity change
   */
  handleBlurChange(value) {
    this.currentBlur = parseInt(value, 10);
    this.blurValue.textContent = `${this.currentBlur}px`;
    
    // Apply the blur to the overlay
    if (this.blurOverlay) {
      this.blurOverlay.style.backdropFilter = `blur(${this.currentBlur}px)`;
      this.blurOverlay.style.webkitBackdropFilter = `blur(${this.currentBlur}px)`;
    }
  }
  
  /**
   * Handle saturation change
   */
  handleSaturationChange(value) {
    this.currentSaturation = parseInt(value, 10);
    this.saturationValue.textContent = `${this.currentSaturation}%`;
    
    // Apply the saturation to the document body
    document.documentElement.style.setProperty('--global-saturation', `${this.currentSaturation}%`);
  }
  
  /**
   * Handle motion intensity change
   */
  handleMotionIntensityChange(value) {
    this.currentMotionIntensity = parseInt(value, 10);
    this.motionIntensityValue.textContent = `${this.currentMotionIntensity}%`;
    
    // Notify about animation settings change
    this.notifyAnimationSettingsChange();
  }
  
  /**
   * Handle motion speed change
   */
  handleMotionSpeedChange(value) {
    this.currentMotionSpeed = parseInt(value, 10);
    this.motionSpeedValue.textContent = `${this.currentMotionSpeed}%`;
    
    // Notify about animation settings change
    this.notifyAnimationSettingsChange();
  }
  
  /**
   * Notify subscribers about animation settings change
   */
  notifyAnimationSettingsChange() {
    if (this.onAnimationSettingsChange) {
      this.onAnimationSettingsChange({
        intensityFactor: this.currentMotionIntensity / 100,
        speedFactor: this.currentMotionSpeed / 100
      });
    }
  }
  
  /**
   * Get current animation settings
   */
  getAnimationSettings() {
    return {
      intensityFactor: this.currentMotionIntensity / 100,
      speedFactor: this.currentMotionSpeed / 100
    };
  }
  
  /**
   * Update time display
   */
  updateTimeDisplay() {
    this.timeDisplay.textContent = 'time: ' + formatTime(this.currentHour, this.currentMinute);
  }
  
  /**
   * Update block counter
   */
  updateBlockCounter(count) {
    this.blockCounter.textContent = `blocks: ${count}`;
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