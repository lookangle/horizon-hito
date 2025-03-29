import { getSkyColor, getRandomRange } from '../utils/colorUtils.js';
import { getBlockType, createBlockElement } from './Block.js';
import { updateBackgroundColor } from '../animations/BlockAnimations.js';
import { MIN_HEIGHT_FACTOR, MAX_HEIGHT_FACTOR } from '../constants/blockConstants.js';
import { MAX_BLOCKS } from '../constants/timeConstants.js';

/**
 * Block Manager - Handles creating and managing blocks
 */
export class BlockManager {
  constructor(container, onUpdateCounter) {
    this.blocks = [];
    this.blocksContainer = container;
    this.onUpdateCounter = onUpdateCounter;
  }

  /**
   * Add a new block to the visualization
   */
  addBlock(hour) {
    const skyColor = getSkyColor(hour);
    const blockType = getBlockType(hour);
    
    // Calculate target height with more dramatic randomness
    // Use a non-linear distribution for more variance
    // Apply slight adjustment to ensure full coverage with scaling
    const baseHeight = (100 / Math.min(MAX_BLOCKS, 24)) * 0.98; // 0.98 factor to account for 1.05 scaling
    let randomHeight;
    
    // Sometimes create very tall or very short blocks for variety
    if (Math.random() < 0.2) {
      // 20% chance of dramatic height (very tall or very short)
      randomHeight = baseHeight * (Math.random() < 0.5 ? 
                      getRandomRange(0.4, 0.7) :   // Extra short
                      getRandomRange(1.5, 2.2));   // Extra tall
    } else {
      // 80% chance of more moderate variation
      randomHeight = baseHeight * getRandomRange(0.8, 1.4);
    }
    
    // Create the new block data
    const newBlock = {
      id: Date.now(),
      hour: hour,
      color: skyColor,
      type: blockType,
      height: randomHeight,         // Target height to grow to
      currentHeight: 0.05,          // Start extremely small (0.05%)
      timestamp: Date.now(),
      heightFactor: getRandomRange(MIN_HEIGHT_FACTOR, MAX_HEIGHT_FACTOR),
      growthProgress: 0             // Track growth from 0 to 1
    };
    
    // Add the new block to the beginning of the array
    this.blocks.unshift(newBlock);
    
    // Limit to max blocks
    if (this.blocks.length > MAX_BLOCKS) {
      this.blocks = this.blocks.slice(0, MAX_BLOCKS);
    }
    
    // Create and add the DOM element with tiny initial height
    const blockElement = createBlockElement(newBlock);
    blockElement.style.height = `${newBlock.currentHeight}%`; // Start super small
    blockElement.style.zIndex = this.blocks.length; // Ensure proper stacking order
    
    if (this.blocksContainer.firstChild) {
      this.blocksContainer.insertBefore(blockElement, this.blocksContainer.firstChild);
    } else {
      this.blocksContainer.appendChild(blockElement);
    }
    
    // Remove excess block elements
    const blockElements = this.blocksContainer.querySelectorAll('.block-wrapper');
    if (blockElements.length > MAX_BLOCKS) {
      for (let i = MAX_BLOCKS; i < blockElements.length; i++) {
        this.blocksContainer.removeChild(blockElements[i]);
      }
    }
    
    // Update background color to match the new block
    const backgroundColor = updateBackgroundColor(newBlock);
    document.body.style.background = backgroundColor;
    
    // Update UI
    this.updateBlockCounter();
    
    return newBlock;
  }

  /**
   * Apply height updates to block elements
   */
  applyHeightUpdates(blockHeights) {
    if (!blockHeights) return;
    
    blockHeights.forEach(({ id, targetHeight, zIndex, blurAmount }) => {
      const blockElement = document.getElementById(`block-${id}`);
      if (!blockElement) return;
      
      // Apply the height with a 1.05x scaling factor to eliminate bottom gap
      blockElement.style.height = `${targetHeight * 1.05}%`;
      
      // Set z-index to create proper stacking (newer blocks on top)
      blockElement.style.zIndex = zIndex;
      
      // Apply dynamic blur effect if available
      if (blurAmount !== undefined) {
        // Find the .block or .split-block element within the wrapper
        const innerBlock = blockElement.querySelector('.block, .split-block');
        if (innerBlock) {
          innerBlock.style.filter = `blur(${blurAmount}px)`;
        }
      }
    });
  }

  /**
   * Update block counter
   */
  updateBlockCounter() {
    if (this.onUpdateCounter) {
      this.onUpdateCounter(this.blocks.length);
    }
  }

  /**
   * Reset all blocks
   */
  reset() {
    this.blocks = [];
    this.blocksContainer.innerHTML = '';
  }

  /**
   * Get all blocks
   */
  getBlocks() {
    return this.blocks;
  }
} 