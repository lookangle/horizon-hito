import { GRADIENT_CHANCE, VERTICAL_GRADIENT_CHANCE } from '../constants/blockConstants.js';

/**
 * Get random value within range
 */
export function getRandomRange(min, max) {
  return min + Math.random() * (max - min);
}

/**
 * Get the sky color based on hour
 */
export function getSkyColor(hour) {
  // Determine if this block should be a gradient (25% chance)
  const useGradient = Math.random() < GRADIENT_CHANCE;
  // Determine if gradient should be vertical (50% chance) or horizontal
  const isVertical = Math.random() < VERTICAL_GRADIENT_CHANCE;
  const gradientDirection = isVertical ? 'to bottom' : 'to right';
  
  // Early morning (midnight to sunrise)
  if (hour >= 0 && hour < 5) {
    const baseHue = 240; // Deep blue
    const saturation = 30 + hour * 5;
    const lightness = 5 + hour * 2;
    
    if (useGradient) {
      return {
        type: 'gradient',
        colors: [
          `hsl(${baseHue - 10}, ${saturation}%, ${lightness - 2}%)`,
          `hsl(${baseHue + 10}, ${saturation - 5}%, ${lightness + 3}%)`
        ],
        direction: gradientDirection
      };
    } else {
      return { 
        type: 'solid',
        color: `hsl(${baseHue}, ${saturation}%, ${lightness}%)`
      };
    }
  }
  // Sunrise (5AM to 7AM)
  else if (hour >= 5 && hour < 7) {
    const progress = hour - 5; // 0 to 2
    // Keep in yellow-orange range (50-30), avoiding green (>60)
    const baseHue = 50 - (progress * 10); 
    const saturation = 85 - (progress * 5);
    const lightness = 60 + (progress * 10);
    
    if (useGradient) {
      return {
        type: 'gradient',
        colors: [
          `hsl(${baseHue - 5}, ${saturation + 5}%, ${lightness - 5}%)`, // Slightly darker, warmer
          `hsl(${baseHue + 10}, ${saturation - 5}%, ${lightness + 10}%)` // Yellower but staying below 60
        ],
        direction: gradientDirection
      };
    } else {
      return {
        type: 'solid',
        color: `hsl(${baseHue}, ${saturation}%, ${lightness}%)`
      };
    }
  }
  // Morning to midday (7AM to 12PM)
  else if (hour >= 7 && hour < 12) {
    const progress = hour - 7; // 0 to 5
    // Transition from light blue to azure blue (200-220)
    const baseHue = 220 - (progress * 4); 
    const saturation = 70 - (progress * 5);
    const lightness = 70 + (progress * 2);
    
    if (useGradient) {
      return {
        type: 'gradient',
        colors: [
          `hsl(${baseHue - 5}, ${saturation + 5}%, ${lightness - 5}%)`,
          `hsl(${baseHue + 5}, ${saturation - 5}%, ${lightness + 5}%)`
        ],
        direction: gradientDirection
      };
    } else {
      return {
        type: 'solid',
        color: `hsl(${baseHue}, ${saturation}%, ${lightness}%)`
      };
    }
  }
  // Midday to afternoon (12PM to 5PM)
  else if (hour >= 12 && hour < 17) {
    const progress = hour - 12; // 0 to 5
    // Midday to afternoon - stay in blue range (200-225)
    const baseHue = 200 + (progress * 5); 
    const saturation = 55 - (progress * 3);
    const lightness = 80 - (progress * 3);
    
    if (useGradient) {
      return {
        type: 'gradient',
        colors: [
          `hsl(${baseHue - 5}, ${saturation + 5}%, ${lightness - 3}%)`,
          `hsl(${baseHue + 5}, ${saturation - 5}%, ${lightness + 3}%)`
        ],
        direction: gradientDirection
      };
    } else {
      return {
        type: 'solid',
        color: `hsl(${baseHue}, ${saturation}%, ${lightness}%)`
      };
    }
  }
  // Sunset (5PM to 8PM)
  else if (hour >= 17 && hour < 20) {
    const progress = hour - 17; // 0 to 3
    const baseHue = progress < 1.5 ? 
                    20 - (progress * 10) : // Start with orange-red (20) toward red (5)
                    355 - ((progress - 1.5) * 20); // Then toward pink/purple (355-325)
    const saturation = 85 - (progress * 8);
    const lightness = 55 - (progress * 10);
    
    if (useGradient) {
      return {
        type: 'gradient',
        colors: [
          `hsl(${baseHue - 10}, ${saturation + 10}%, ${lightness - 5}%)`, // Darker, more saturated
          `hsl(${baseHue + 15}, ${saturation - 5}%, ${lightness + 10}%)` // Add pink/purple tint, lighter
        ],
        direction: gradientDirection
      };
    } else {
      return {
        type: 'solid',
        color: `hsl(${baseHue}, ${saturation}%, ${lightness}%)`
      };
    }
  }
  // Night (8PM to midnight)
  else {
    const baseHue = 240; // Night blue
    const saturation = 40 - (hour-20)*5;
    const lightness = 15 - (hour-20)*3;
    
    if (useGradient) {
      return {
        type: 'gradient',
        colors: [
          `hsl(${baseHue - 10}, ${saturation + 5}%, ${lightness - 2}%)`,
          `hsl(${baseHue + 10}, ${saturation - 5}%, ${lightness + 2}%)`
        ],
        direction: gradientDirection
      };
    } else {
      return {
        type: 'solid',
        color: `hsl(${baseHue}, ${saturation}%, ${lightness}%)`
      };
    }
  }
} 