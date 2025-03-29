# Horizon Timelapse

A dynamic visualization that represents the passage of time through evolving color blocks, each representing an hour of the day, with smooth transitions and subtle animations.

## Features

- Displays a stack of color blocks representing hours of the day
- Each block's color corresponds to the time of day (morning, afternoon, evening, night)
- Smooth animations and transitions between states
- Interactive UI controls for pausing, resetting, and hiding interface
- Responsive design that works across devices

## Project Structure

```
src/
├── js/
│   ├── animations/     # Animation-related functionality
│   │   └── BlockAnimations.js
│   ├── components/     # UI and visual components
│   │   ├── Block.js
│   │   └── BlockManager.js
│   ├── constants/      # Application constants and configuration
│   │   ├── blockConstants.js
│   │   └── timeConstants.js
│   ├── controllers/    # UI and interaction controllers
│   │   └── UIController.js
│   ├── utils/          # Utility functions
│   │   ├── colorUtils.js
│   │   └── timeUtils.js
│   └── App.js          # Main application class
├── styles/             # CSS styles
│   ├── blocks.css
│   ├── interface.css
│   └── main.css
└── main.js             # Application entry point
```

## Architecture

The application follows a modular architecture with clear separation of concerns:

- **State Management**: Centralized in the BlockManager and UIController classes
- **Animation Foundation**: BlockAnimations handles all animation calculations
- **UI Controls**: UIController manages all user interactions
- **Rendering**: DOM manipulations are isolated to specific components

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Building for Production

```bash
npm run build
```

This will generate optimized files in the `dist` directory.

## Performance Considerations

- Uses GPU-accelerated properties for animations
- Implements efficient DOM recycling for blocks
- Batches style updates to minimize repaints
- Adaptive timing that responds to device capabilities 