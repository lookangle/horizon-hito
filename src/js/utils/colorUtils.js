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
    const baseHue = 30 - ((hour - 5) * 10); // Warm sunrise colors
    const saturation = 80 - ((hour - 5) * 10);
    const lightness = 50 + ((hour - 5) * 10);
    
    if (useGradient) {
      return {
        type: 'gradient',
        colors: [
          `hsl(${baseHue - 10}, ${saturation}%, ${lightness - 5}%)`, // Slightly darker, warmer
          `hsl(${baseHue + 10}, ${saturation - 10}%, ${lightness + 10}%)` // Slightly lighter, cooler
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
    const baseHue = 210; // Morning blue
    const saturation = 70 - (hour-7)*5;
    const lightness = 70 + (hour-7)*2;
    
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
    const baseHue = 210; // Midday blue
    const saturation = 55 - (hour-12)*5;
    const lightness = 80 - (hour-12)*2;
    
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
    const baseHue = 25 + ((hour - 17) * 5); // Orange/red sunset colors
    const saturation = 80 - ((hour - 17) * 10);
    const lightness = 60 - ((hour - 17) * 15);
    
    if (useGradient) {
      return {
        type: 'gradient',
        colors: [
          `hsl(${baseHue - 10}, ${saturation + 10}%, ${lightness - 5}%)`, // Darker, more saturated
          `hsl(${baseHue + 10}, ${saturation - 10}%, ${lightness + 10}%)` // Lighter, less saturated
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