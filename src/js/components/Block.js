import { getRandomRange } from '../utils/colorUtils.js';
import { 
  ANIMATION_DELAY_MIN, 
  ANIMATION_DELAY_MAX,
  MIN_HEIGHT_FACTOR,
  MAX_HEIGHT_FACTOR,
  BLUR_BASE,
  BLUR_VARIATION,
  SPLIT_MOTION_ENABLED,
  SPLIT_MOTION_DURATION_MIN,
  SPLIT_MOTION_DURATION_MAX,
  SPLIT_MOTION_MIN_POSITION,
  SPLIT_MOTION_MAX_POSITION,
  SPLIT_MOTION_UPDATE_MIN,
  SPLIT_MOTION_UPDATE_MAX
} from '../constants/blockConstants.js';

/**
 * Determine if a block should be split or full width
 */
export function getBlockType(hour) {
  // 30% chance of a split block, regardless of time
  if (Math.random() < 0.3) {
    // Randomly choose a split position
    const splitPositions = [25, 33, 50, 67, 75];
    const randomIndex = Math.floor(Math.random() * splitPositions.length);
    return {
      type: 'split',
      splitPosition: splitPositions[randomIndex]
    };
  }
  return { type: 'full' };
}

/**
 * Create a block element
 */
export function createBlockElement(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'block-wrapper';
  wrapper.id = `block-${block.id}`;
  
  // For new blocks, we'll set the height in addBlock
  // Otherwise use the currentHeight or calculated height
  if (block.currentHeight === undefined) {
    const randomHeightFactor = getRandomRange(MIN_HEIGHT_FACTOR, MAX_HEIGHT_FACTOR);
    wrapper.style.height = `${block.height * randomHeightFactor}%`;
  } else {
    // Use exact currentHeight no matter how small
    wrapper.style.height = `${block.currentHeight}%`;
  }
  
  // Set random animation delay for continuous motion effect
  const randomDelay = getRandomRange(ANIMATION_DELAY_MIN, ANIMATION_DELAY_MAX);
  wrapper.style.setProperty('--delay', `${randomDelay}s`);
  
  // Ensure position is set to handle stacking properly
  wrapper.style.position = 'relative';
  wrapper.style.marginBottom = '-1px'; // Add negative margin to eliminate gaps
  
  if (block.type.type === 'full') {
    // Full-width block
    const blockElement = document.createElement('div');
    blockElement.className = 'block';
    
    if (block.color.type === 'solid') {
      blockElement.style.backgroundColor = block.color.color;
    } else {
      // Use the direction specified in the color object
      const direction = block.color.direction || 'to right';
      blockElement.style.background = `linear-gradient(${direction}, ${block.color.colors[0]}, ${block.color.colors[1]})`;
    }
    
    // Apply subtle blur with minor random variation
    const blurAmount = BLUR_BASE + getRandomRange(-BLUR_VARIATION, BLUR_VARIATION);
    blockElement.style.filter = `blur(${blurAmount.toFixed(2)}px)`;
    
    wrapper.appendChild(blockElement);
  } else {
    // Split block
    const blockElement = document.createElement('div');
    blockElement.className = 'split-block';
    
    const leftElement = document.createElement('div');
    leftElement.className = 'split-left';
    leftElement.style.width = `${block.type.splitPosition}%`;
    
    const rightElement = document.createElement('div');
    rightElement.className = 'split-right';
    rightElement.style.width = `${100 - block.type.splitPosition}%`;
    
    // Apply dynamic width animation if enabled
    if (SPLIT_MOTION_ENABLED) {
      // Initialize with base split position
      let currentPosition = block.type.splitPosition;
      let targetPosition = currentPosition;
      let transitionInProgress = false;
      
      // Set transition duration based on distance to travel
      const setTransitionDuration = (start, end) => {
        const distance = Math.abs(end - start);
        const baseDuration = getRandomRange(SPLIT_MOTION_DURATION_MIN, SPLIT_MOTION_DURATION_MAX);
        // Scale duration by distance - longer distances take proportionally longer
        const scaledDuration = baseDuration * (distance / 50);
        
        leftElement.style.transition = `width ${scaledDuration}s ease-in-out`;
        rightElement.style.transition = `width ${scaledDuration}s ease-in-out`;
        
        return scaledDuration * 1000; // Return in milliseconds
      };
      
      // Choose a new random target position that's meaningfully different from current
      const chooseNewPosition = (current) => {
        // Define how far we need to move to consider it meaningful
        const minChange = 15; 
        
        // Generate possible new position
        let newPos;
        
        // 2/3 chance to pick completely random position across entire range
        if (Math.random() < 0.67) {
          newPos = getRandomRange(SPLIT_MOTION_MIN_POSITION, SPLIT_MOTION_MAX_POSITION);
        } else {
          // 1/3 chance to pick a position near one of the extremes
          newPos = Math.random() < 0.5 ? 
            getRandomRange(SPLIT_MOTION_MIN_POSITION, SPLIT_MOTION_MIN_POSITION + 15) : 
            getRandomRange(SPLIT_MOTION_MAX_POSITION - 15, SPLIT_MOTION_MAX_POSITION);
        }
        
        // If it's too close to current position, adjust it further away
        if (Math.abs(newPos - current) < minChange) {
          newPos = current + (current < 50 ? minChange : -minChange);
          // Ensure it's within bounds
          newPos = Math.max(SPLIT_MOTION_MIN_POSITION, 
                   Math.min(SPLIT_MOTION_MAX_POSITION, newPos));
        }
        
        return newPos;
      };
      
      // Animation function to smoothly change split position
      const animateSplitPosition = () => {
        if (transitionInProgress) return;
        
        // Choose new target position
        targetPosition = chooseNewPosition(currentPosition);
        
        // Calculate transition duration based on distance
        const transitionDuration = setTransitionDuration(currentPosition, targetPosition);
        
        // Start transition
        transitionInProgress = true;
        leftElement.style.width = `${targetPosition}%`;
        rightElement.style.width = `${100 - targetPosition}%`;
        
        // Update current position after transition finishes
        setTimeout(() => {
          currentPosition = targetPosition;
          transitionInProgress = false;
        }, transitionDuration);
        
        // Schedule next update with variable timing
        setTimeout(animateSplitPosition, 
          transitionDuration + getRandomRange(SPLIT_MOTION_UPDATE_MIN, SPLIT_MOTION_UPDATE_MAX));
      };
      
      // Initial random delay before starting animation
      const initialDelay = getRandomRange(1000, 7000);
      const timeoutId = setTimeout(animateSplitPosition, initialDelay);
      
      // Store timeout ID on the element for cleanup
      blockElement.dataset.animationTimeout = timeoutId;
    }
    
    if (block.color.type === 'solid') {
      // Use slight variations of the same color for split blocks
      const hslMatch = block.color.color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
      
      if (hslMatch) {
        const h = parseInt(hslMatch[1]);
        const s = parseInt(hslMatch[2]);
        const l = parseInt(hslMatch[3]);
        
        leftElement.style.backgroundColor = `hsl(${h-5}, ${s}%, ${l-3}%)`;
        rightElement.style.backgroundColor = `hsl(${h+5}, ${s}%, ${l+3}%)`;
      } else {
        leftElement.style.backgroundColor = block.color.color;
        rightElement.style.backgroundColor = block.color.color;
      }
    } else {
      // Use the direction specified in the color object
      const direction = block.color.direction || 'to right';
      
      // Use the gradient colors but in reverse order for right side
      leftElement.style.background = `linear-gradient(${direction}, ${block.color.colors[0]}, ${block.color.colors[1]})`;
      rightElement.style.background = `linear-gradient(${direction}, ${block.color.colors[1]}, ${block.color.colors[0]})`;
    }
    
    // Apply subtle blur with minor random variation
    const blurAmount = BLUR_BASE + getRandomRange(-BLUR_VARIATION, BLUR_VARIATION);
    blockElement.style.filter = `blur(${blurAmount.toFixed(2)}px)`;
    
    blockElement.appendChild(leftElement);
    blockElement.appendChild(rightElement);
    wrapper.appendChild(blockElement);
  }
  
  return wrapper;
} 