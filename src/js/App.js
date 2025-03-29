import { BlockManager } from './components/BlockManager.js';
import { UIController } from './controllers/UIController.js';
import { updateBlockHeights } from './animations/BlockAnimations.js';
import { HEIGHT_UPDATE_INTERVAL } from './constants/blockConstants.js';
import { INITIAL_HOUR } from './constants/timeConstants.js';

/**
 * Main App - Orchestrates the Horizon Timelapse application
 */
export class HorizonTimelapse {
  constructor() {
    // DOM Elements
    this.blocksContainer = document.getElementById('blocks-container');
    this.timeDisplay = document.getElementById('time-display');
    this.blockCounter = document.getElementById('block-counter');
    this.pauseButton = document.getElementById('pause-button');
    this.resetButton = document.getElementById('reset-button');
    this.toggleInterface = document.getElementById('toggle-interface');
    this.interfaceElement = document.getElementById('interface');
    
    // Initialize UI controller and block manager
    this.initComponents();
    
    // State
    this.isPaused = false;
    this.timers = {
      minute: null,
      animation: null
    };
  }
  
  /**
   * Initialize components in correct order
   */
  initComponents() {
    // Create UI controller first
    this.ui = new UIController(
      {
        timeDisplay: this.timeDisplay,
        blockCounter: this.blockCounter,
        pauseButton: this.pauseButton,
        resetButton: this.resetButton,
        toggleInterface: this.toggleInterface,
        interfaceElement: this.interfaceElement
      },
      () => this.handleReset(),
      (isPaused) => this.handlePauseToggle(isPaused)
    );
    
    // Create block manager with UI callback
    this.blockManager = new BlockManager(
      this.blocksContainer, 
      (count) => this.ui.updateBlockCounter(count)
    );
  }
  
  /**
   * Initialize the application
   */
  init() {
    // Add initial block
    this.blockManager.addBlock(INITIAL_HOUR);
    
    // Start timers
    this.startTimers();
  }
  
  /**
   * Start application timers
   */
  startTimers() {
    // Timer to update minutes every second
    this.timers.minute = setInterval(() => {
      const hourChanged = this.ui.advanceTime();
      
      // When a full minute passes, add new block (representing an hour)
      if (hourChanged) {
        this.blockManager.addBlock(this.ui.getCurrentHour());
      }
    }, 1000); // Update every second
    
    // Animation timer to update block heights with natural variation
    this.timers.animation = setInterval(() => {
      if (this.isPaused) return;
      
      // Calculate updated heights for all blocks
      const blocks = this.blockManager.getBlocks();
      const blockHeights = updateBlockHeights(blocks);
      
      // Apply the height updates to DOM elements
      this.blockManager.applyHeightUpdates(blockHeights);
    }, HEIGHT_UPDATE_INTERVAL);
  }
  
  /**
   * Handle reset action
   */
  handleReset() {
    this.blockManager.reset();
    this.blockManager.addBlock(this.ui.getCurrentHour());
  }
  
  /**
   * Handle pause toggle
   */
  handlePauseToggle(isPaused) {
    this.isPaused = isPaused;
  }
  
  /**
   * Clean up resources
   */
  destroy() {
    // Clear timers
    clearInterval(this.timers.minute);
    clearInterval(this.timers.animation);
    
    // Clear event listeners (handled by UIController)
  }
} 