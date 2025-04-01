/**
 * Constants for block randomness and styling
 */
export const MIN_HEIGHT_FACTOR = 0.1;
export const MAX_HEIGHT_FACTOR = 2.2;
export const ANIMATION_DELAY_MIN = 0;
export const ANIMATION_DELAY_MAX = 10; // Increased delay range for more varied motion
export const GRADIENT_CHANCE = 0.5; // 50% chance of any block being gradient
export const VERTICAL_GRADIENT_CHANCE = 0.5; // 50% chance of gradient being vertical (vs horizontal)

/**
 * Constants for block animation
 */
export const GROWTH_DURATION = 60000; // 60 seconds to reach full height (much slower growth)
export const HEIGHT_UPDATE_INTERVAL = 100; // Update heights more frequently (every 100ms)

/**
 * Constants for block blur effects
 */
export const BLUR_BASE = 0.1; // Base blur in pixels
export const BLUR_VARIATION = 0.5; // Variation amount for different blocks

/**
 * Constants for block breathing animation control (default values)
 */
export const BREATHING_INTENSITY_BASE = 2.5; // Base percentage for breathing intensity
export const BREATHING_INTENSITY_VARIATION = 5; // Maximum additional percentage
export const BREATHING_SPEED_BASE = 2500; // Base speed in milliseconds
export const BREATHING_SPEED_VARIATION = 7500; // Maximum additional milliseconds

/**
 * Constants for split block horizontal motion
 */
export const SPLIT_MOTION_ENABLED = true; // Toggle for horizontal motion
export const SPLIT_MOTION_DURATION_MIN = 60; // Minimum animation duration in seconds
export const SPLIT_MOTION_DURATION_MAX = 120; // Maximum animation duration in seconds
export const SPLIT_MOTION_MIN_POSITION = 10; // Minimum split position (%)
export const SPLIT_MOTION_MAX_POSITION = 90; // Maximum split position (%)
export const SPLIT_MOTION_UPDATE_MIN = 5000; // Minimum time between updates (ms)
export const SPLIT_MOTION_UPDATE_MAX = 12000; // Maximum time between updates (ms)