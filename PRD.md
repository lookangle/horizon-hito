# Horizon Timelapse - Product Requirements Document (PRD)

## 1. Product Overview

### 1.1 Introduction
Horizon Timelapse is a dynamic visual representation of time passage through an abstract horizon line visualization. The application displays a stack of color blocks that represent different hours of the day, with colors changing based on the time they represent (morning, afternoon, evening, night). The visualization creates an animated, evolving landscape of color blocks that subtly change in size and appearance over time.

### 1.2 Purpose
The purpose of Horizon Timelapse is to create a visually appealing, ambient display that represents the passage of time through abstract color blocks resembling a horizon or landscape. It provides a calming, artistic visualization that can serve as a background display or screensaver-like experience.

### 1.3 Target Audience
- Digital artists
- Users interested in ambient displays
- Web developers looking for interactive animation examples
- Anyone interested in creative time visualization

## 2. System Architecture

### 2.1 Technology Stack
- Frontend: HTML5, CSS3, JavaScript (ES6+)
- Build tools: Vite.js
- No backend requirements (client-side only)

### 2.2 Component Structure
The application follows a modular architecture with these main components:

- Main Application (App.js): Orchestrates the overall functionality
- Block Manager: Manages the creation and updating of visual blocks
- UI Controller: Handles user interface and interactions
- Animation System: Controls visual effects and transitions
- Utility Modules: Color generation, time formatting, etc.
- Constants: Configuration parameters for visual appearance and timing

## 3. Core Features

### 3.1 Block Visualization System

#### 3.1.1 Block Creation
- Each block represents one hour of the day
- New blocks are added at the top of the stack every simulated hour
- Maximum of 24 blocks displayed at once
- Blocks start with minimal height and grow over time (60 seconds to reach full height)
- Block heights have natural variation (using random factors between 0.1 and 2.2)

#### 3.1.2 Block Types
- Full-width blocks: Standard blocks spanning the entire container width (70% chance)
- Split blocks: Blocks divided into two sections (30% chance)
  - Split position is randomly chosen from presets: 25%, 33%, 50%, 67%, or 75%
  - Split blocks can have dynamic width animation (horizontally shifting split point)
  - Animation occurs at random intervals (5-12 seconds between updates)
  - Animation durations range from 60-120 seconds

#### 3.1.3 Color System
Colors are based on the hour of day they represent:
- Midnight to sunrise (0-5): Deep blues
- Sunrise (5-7): Yellow-orange hues
- Morning to midday (7-12): Light blue to azure
- Midday to afternoon (12-17): Blue range
- Sunset (5-8 PM): Orange-red to pink hues
- Night (8 PM-midnight): Deep blues, purples, pinks, and reds

Block color variations:
- 50% chance of solid color blocks
- 50% chance of gradient blocks:
  - 50% chance of vertical gradient
  - 50% chance of horizontal gradient
- 10% chance of increased color saturation for any block

#### 3.1.4 Block Animation Effects
- Subtle "breathing" animation effect on blocks
- Different animation speeds and intensities based on block ID
- Phase shifts to prevent synchronized movement
- Blur effects that increase with depth (blocks further down have more blur)
  - Base blur of 0.1px with variation up to 0.5px
- Background color changes to match the newest block's color scheme

### 3.2 Time Simulation
- One real second represents one minute in simulation
- Complete day cycle takes 24 minutes (real time)
- Initial time starts at 5:00 AM
- Time display shows current simulated hour and minute
- New block is added with each new simulated hour

### 3.3 User Interface

#### 3.3.1 Core Controls
- Time display (showing simulated time)
- Block counter (showing number of blocks)
- Pause/Play button
- Reset button (resets time to initial hour and clears blocks)
- Toggle UI button (can hide interface with 'H' key as well)

#### 3.3.2 Blur Controls
- Adjustable blur intensity via slider (0-100px)
- Blur overlay with customizable intensity
- Default blur value is 50px

## 4. Visual Design

### 4.1 Layout
- Full viewport application (100vw × 100vh)
- Blocks stacked vertically
- Interface elements positioned at top-right
- Toggle UI button at bottom-right

### 4.2 Block Styling
- Slight scale transformation (1.15) to prevent gaps
- Negative margins (-3px) to ensure seamless appearance
- Transition effects for height changes (1.5s ease-out)
- GPU acceleration optimizations (will-change, backface-visibility, transform properties)

### 4.3 Typography and UI Design
- JetBrains Mono font (preloaded from Google Fonts)
- Minimal, monospace aesthetic
- Dark theme with white text
- Subtle interface elements that don't distract from the visualization

## 5. Interactions and Behaviors

### 5.1 Block Growth
- New blocks start at 0.05% height (almost invisible)
- Grow to their target height over 60 seconds
- Use cubic easing function for natural growth (slow start)
- Heights are distributed proportionally when approaching max blocks

### 5.2 Animation Details
- Continuous subtle movement with "breathing" animation
- Random animation delays per block (0-10s)
- For split blocks with horizontal motion enabled:
  - Motion range from 10% to 90% of block width
  - Random transitions between positions
  - Varied durations (60-120s) scaled by distance
  - Natural acceleration/deceleration (ease-in-out)

### 5.3 User Controls
- Pause/Play: Stops/resumes time progression and animations
- Reset: Clears all blocks and resets to 5:00 AM
- Toggle Interface: Shows/hides UI elements (keyboard shortcut: 'H')
- Blur Slider: Adjusts intensity of blur overlay effect (0-100px)

## 6. Technical Requirements

### 6.1 Performance Considerations
- GPU acceleration for smooth animations
- Optimized rendering with CSS transforms
- Will-change properties for better browser optimization
- Cleanup of animation timers when removing blocks

### 6.2 Browser Compatibility
- Modern browsers supporting CSS variables and transitions
- Support for backdrop-filter (or fallback for -webkit-backdrop-filter)
- ES6+ JavaScript support

### 6.3 Project Structure
*[Section appears to be empty in original document]*

## 7. Configuration Parameters
Key configuration constants that developers may want to modify:

### 7.1 Block Appearance
- MIN_HEIGHT_FACTOR, MAX_HEIGHT_FACTOR: Control block height variation (0.1 to 2.2)
- BLUR_BASE, BLUR_VARIATION: Control blur effects (0.1px base, 0.5px variation)
- GRADIENT_CHANCE: Probability of gradient vs. solid blocks (0.5 = 50%)
- VERTICAL_GRADIENT_CHANCE: Probability of vertical vs. horizontal gradients (0.5 = 50%)

### 7.2 Animation Settings
- GROWTH_DURATION: Time for new blocks to reach full height (60000ms = 60s)
- HEIGHT_UPDATE_INTERVAL: How frequently block heights update (100ms)
- ANIMATION_DELAY_MIN, ANIMATION_DELAY_MAX: Range for animation delays (0-10s)

### 7.3 Split Block Motion
- SPLIT_MOTION_ENABLED: Toggle for horizontal split motion (true/false)
- SPLIT_MOTION_DURATION_MIN, SPLIT_MOTION_DURATION_MAX: Animation duration range (60-120s)
- SPLIT_MOTION_MIN_POSITION, SPLIT_MOTION_MAX_POSITION: Range of movement (10-90%)
- SPLIT_MOTION_UPDATE_MIN, SPLIT_MOTION_UPDATE_MAX: Time between position updates (5000-12000ms)

### 7.4 Time Settings
- INITIAL_HOUR, INITIAL_MINUTE: Starting time (5:00 AM by default)
- CYCLE_DURATION_MINUTES: Time for full day cycle (24 minutes)
- SECONDS_PER_HOUR: Conversion rate from real seconds to simulated hours (60s = 1h)
- MAX_BLOCKS: Maximum number of blocks to display (24)

## 8. Implementation Guidelines
- Start by creating the basic HTML structure with necessary containers
- Implement the core JavaScript modules in this order:
  - Constants
  - Utility functions
  - Block creation and management
  - Animation system
  - UI controller
  - Main application initialization
- Style the application with CSS for basic appearance first, then add animations
- Test with various time settings to ensure color transitions are smooth
- Optimize performance for long-running animations
- Add UI controls and interaction features