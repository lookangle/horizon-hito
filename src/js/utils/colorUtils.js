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
  // Determine if this block should be a gradient (50% chance)
  const useGradient = Math.random() < GRADIENT_CHANCE;
  // Determine if gradient should be vertical (50% chance) or horizontal
  const isVertical = Math.random() < VERTICAL_GRADIENT_CHANCE;
  const gradientDirection = isVertical ? 'to bottom' : 'to right';
  
  // 10% chance of increased saturation
  const increasedSaturation = Math.random() < 0.1;
  const saturationBoost = increasedSaturation ? 20 : 0;
  
  // Early morning (midnight to sunrise)
  if (hour >= 0 && hour < 5) {
    const baseHue = 240; // Deep blue
    const saturation = 30 + hour * 5 + saturationBoost;
    const lightness = 5 + hour * 2;
    
    if (useGradient) {
      return {
        type: 'gradient',
        colors: [
          `hsl(${baseHue - 10}, ${saturation + 15}%, ${lightness - 2}%)`,
          `hsl(${baseHue + 10}, ${saturation - 15}%, ${lightness + 3}%)`
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
    const saturation = 50 - (progress * 5) + saturationBoost;
    const lightness = 60 + (progress * 10);
    
    if (useGradient) {
      return {
        type: 'gradient',
        colors: [
          `hsl(${baseHue - 5}, ${saturation + 15}%, ${lightness - 5}%)`, // Darker, more saturated
          `hsl(${baseHue + 10}, ${saturation - 15}%, ${lightness + 10}%)` // Yellower but staying below 60
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
    const saturation = 50 - (progress * 5) + saturationBoost;
    const lightness = 70 + (progress * 2);
    
    if (useGradient) {
      return {
        type: 'gradient',
        colors: [
          `hsl(${baseHue - 5}, ${saturation + 20}%, ${lightness - 5}%)`,
          `hsl(${baseHue + 5}, ${saturation - 15}%, ${lightness + 5}%)`
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
    const saturation = 25 - (progress * 3) + saturationBoost;
    const lightness = 80 - (progress * 3);
    
    if (useGradient) {
      return {
        type: 'gradient',
        colors: [
          `hsl(${baseHue - 5}, ${saturation + 25}%, ${lightness - 3}%)`,
          `hsl(${baseHue + 5}, ${saturation - 15}%, ${lightness + 3}%)`
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
    // Increased pink tones during sunset
    const baseHue = progress < 1.5 ? 
                    15 - (progress * 8) : // Start with orange-red (15) toward red
                    340 - ((progress - 1.5) * 15); // More pink hues (340-325)
    const saturation = 75 - (progress * 8) + saturationBoost;
    const lightness = 55 - (progress * 10);
    
    if (useGradient) {
      return {
        type: 'gradient',
        colors: [
          `hsl(${baseHue - 10}, ${saturation + 15}%, ${lightness - 5}%)`, // Darker, more saturated
          `hsl(${baseHue + 25}, ${saturation - 10}%, ${lightness + 10}%)` // Add stronger pink/purple tint
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
    // Choose one of several aurora colors
    const auroraColors = [
      { hue: 240, sat: 40 + saturationBoost, light: 15 }, // Deep blue
      { hue: 270, sat: 50 + saturationBoost, light: 20 }, // Purple
      { hue: 160, sat: 60 + saturationBoost, light: 18 }, // Green
      { hue: 190, sat: 55 + saturationBoost, light: 16 }  // Teal
    ];
    
    const colorIndex = Math.floor(Math.random() * auroraColors.length);
    const baseColor = auroraColors[colorIndex];
    
    if (useGradient) {
      // For gradients, mix two aurora colors
      const secondIndex = (colorIndex + 1 + Math.floor(Math.random() * 2)) % auroraColors.length;
      const secondColor = auroraColors[secondIndex];
      
      return {
        type: 'gradient',
        colors: [
          `hsl(${baseColor.hue}, ${baseColor.sat + 15}%, ${baseColor.light - 2}%)`,
          `hsl(${secondColor.hue}, ${secondColor.sat}%, ${secondColor.light + 5}%)`
        ],
        direction: gradientDirection
      };
    } else {
      return {
        type: 'solid',
        color: `hsl(${baseColor.hue}, ${baseColor.sat}%, ${baseColor.light}%)`
      };
    }
  }
} 