import { getRandomRange } from '../utils/colorUtils.js';
import { 
  ANIMATION_DELAY_MIN, 
  ANIMATION_DELAY_MAX,
  MIN_HEIGHT_FACTOR,
  MAX_HEIGHT_FACTOR,
  BLUR_BASE,
  BLUR_VARIATION
} from '../constants/blockConstants.js';

/**
 * Determine if a block should be split or full width
 */
export function getBlockType(hour) {
  // Increase likelihood of split blocks at transition periods
  const transitionPeriod = 
    (hour >= 5 && hour < 7) ||  // Sunrise
    (hour >= 17 && hour < 20);  // Sunset
  
  // Force split blocks during transition periods and random splits other times
  if (transitionPeriod || Math.random() < 0.3) {
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
    // Ensure the block has a visible initial height
    wrapper.style.height = `${Math.max(block.currentHeight, 2)}%`;
  }
  
  // Set random animation delay for continuous motion effect
  const randomDelay = getRandomRange(ANIMATION_DELAY_MIN, ANIMATION_DELAY_MAX);
  wrapper.style.setProperty('--delay', `${randomDelay}s`);
  
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