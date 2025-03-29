import { GROWTH_DURATION, HEIGHT_UPDATE_INTERVAL, BLUR_BASE, BLUR_VARIATION } from '../constants/blockConstants.js';

/**
 * Update block heights with growth animation and variation
 */
export function updateBlockHeights(blocks) {
  if (blocks.length === 0) return;
  
  const totalHeight = 100; // 100% of available height
  
  // Handle the growth of the newest block
  if (blocks.length > 0) {
    const newestBlock = blocks[0];
    const elapsedTime = Date.now() - newestBlock.timestamp;
    newestBlock.growthProgress = Math.min(elapsedTime / GROWTH_DURATION, 1);
    
    // Exponential ease-out growth for smoother, more natural expansion
    // Make it even more gradual with cube root for ultra slow initial growth
    const easing = Math.pow(newestBlock.growthProgress, 1/3); 
    newestBlock.currentHeight = 0.05 + (newestBlock.height * newestBlock.heightFactor * easing);
  }
  
  // First pass: calculate remaining height after accounting for newest block
  const heightUsedByNewestBlock = blocks.length > 0 ? blocks[0].currentHeight : 0;
  const remainingHeight = totalHeight - heightUsedByNewestBlock;
  
  // Calculate total needed height for other blocks
  let totalNeededHeight = 0;
  for (let i = 1; i < blocks.length; i++) {
    totalNeededHeight += blocks[i].height * blocks[i].heightFactor;
  }
  
  // Adjust heights proportionally
  const scaleFactor = totalNeededHeight > 0 ? remainingHeight / totalNeededHeight : 0;
  
  // Return heights for all blocks
  return blocks.map((block, i) => {
    let targetHeight;
    
    if (i === 0) {
      // The newest block uses its current growth progress
      targetHeight = block.currentHeight;
    } else {
      // Existing blocks distribute the remaining space
      targetHeight = block.height * block.heightFactor * scaleFactor;
      
      // Add extremely subtle breathing animation to older blocks
      const elapsedTime = Date.now() - block.timestamp;
      
      // Enhanced breathing animation with more variation and speed
      // Each block gets a unique breathing cycle based on its ID
      const uniqueSpeed = 3000 + (block.id.charCodeAt(0) % 5) * 500; // Speeds between 3000-5500ms
      const uniqueIntensity = 0.01 + (block.id.charCodeAt(1) % 10) * 0.002; // Intensity between 1-3%
      
      // Add a slight phase shift for each block to prevent synchronized movement
      const phaseShift = (block.id.charCodeAt(2) % 100) * 0.0628; // Random phase (0 to 2π)
      const breatheFactor = 1 + uniqueIntensity * Math.sin((elapsedTime / uniqueSpeed) + phaseShift);
      
      targetHeight *= breatheFactor;
    }
    
    // Calculate blur based on position - deeper blocks have slightly more blur
    // Creates depth perception with top blocks being sharper
    const positionFactor = Math.min(i / (blocks.length - 1 || 1), 1);
    const blurAmount = BLUR_BASE + (positionFactor * BLUR_VARIATION);
    
    return {
      id: block.id,
      targetHeight,
      zIndex: blocks.length - i,
      blurAmount: blurAmount.toFixed(2)
    };
  });
}

/**
 * Update background color based on the latest block
 */
export function updateBackgroundColor(block) {
  if (block.color.type === 'solid') {
    return block.color.color;
  } else {
    // Use the direction specified in the color object
    const direction = block.color.direction || 'to right';
    return `linear-gradient(${direction}, ${block.color.colors[0]}, ${block.color.colors[1]})`;
  }
} 