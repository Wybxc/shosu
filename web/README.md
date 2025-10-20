# Shosu (処刑) - Web Version

A React web application port of the Shosu Android app, a fan-made project inspired by the mystery adventure game "魔法少女ノ魔女裁判" (Magical Girl's Witch Trial).

## Features

- **Execution Button**: Press and hold the button for 5.5 seconds to complete the execution
- **Audio Effects**: Background sound during hold and completion sound
- **Animations**: Smooth animations using Framer Motion
- **Responsive Design**: Works on both desktop and mobile browsers
- **Internationalization**: Supports Japanese and English languages
- **Material Design**: Built with Material-UI (MUI) for a modern, consistent look

## Technology Stack

- **React 18** with TypeScript
- **Vite** - Modern build tool and dev server
- **Material-UI (MUI)** - UI component library
- **Framer Motion** - Animation library
- **i18next** - Internationalization framework

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
cd web
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at http://localhost:5173/

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Press and Hold**: Click/tap and hold the execution button for 5.5 seconds
2. **Double Tap**: Double-tap the button to reset its state
3. **Info Button**: Click the info icon in the top-left to view information about the app

## Project Structure

```
web/
├── public/           # Static assets (images, audio)
├── src/
│   ├── components/   # React components
│   │   ├── ExecutionButton.tsx
│   │   └── AboutModal.tsx
│   ├── utils/        # Utility functions
│   │   └── SoundUtils.ts
│   ├── App.tsx       # Main app component
│   ├── main.tsx      # App entry point
│   ├── theme.ts      # MUI theme configuration
│   ├── i18n.ts       # i18n configuration
│   └── index.css     # Global styles
├── package.json
└── vite.config.ts
```

## License

See the main repository LICENSE file.

## Credits

- Original Android app: GBXIN
- Original game: Re,AER / Acacia
