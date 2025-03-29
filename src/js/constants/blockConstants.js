/**
 * Constants for block randomness and styling
 */
export const MIN_HEIGHT_FACTOR = 0.3;
export const MAX_HEIGHT_FACTOR = 1.7;
export const ANIMATION_DELAY_MIN = 0;
export const ANIMATION_DELAY_MAX = 10; // Increased delay range for more varied motion
export const GRADIENT_CHANCE = 0.5; // 25% chance of any block being gradient
export const VERTICAL_GRADIENT_CHANCE = 0.5; // 50% chance of gradient being vertical (vs horizontal)

/**
 * Constants for block animation
 */
export const GROWTH_DURATION = 30000; // 30 seconds to reach full height (faster growth)
export const HEIGHT_UPDATE_INTERVAL = 100; // Update heights more frequently (every 100ms)

/**
 * Constants for block blur effects
 */
export const BLUR_BASE = 0.5; // Base blur in pixels
export const BLUR_VARIATION = 1; // Variation amount for different blocks 