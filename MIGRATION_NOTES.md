# Migration Notes: Android (Kotlin/Compose) to React Web

This document outlines the migration from the original Android application to the React web version.

## Project Overview

**Original**: Android app built with Kotlin and Jetpack Compose  
**New**: React web application with TypeScript  
**Location**: `web/` directory  

## Architecture Comparison

### Android (Original)
- **Language**: Kotlin
- **UI Framework**: Jetpack Compose
- **Build System**: Gradle
- **Platform**: Android (APK)
- **State Management**: Compose State
- **Styling**: Material Design 3
- **Audio**: MediaPlayer API
- **Haptics**: Vibrator API
- **I18n**: Android Resources (strings.xml)

### React (New)
- **Language**: TypeScript
- **UI Framework**: React 18
- **Build System**: Vite
- **Platform**: Web (Browser)
- **State Management**: React Hooks (useState, useEffect)
- **Styling**: Material-UI (MUI) + Emotion
- **Audio**: HTML5 Audio API
- **Animations**: Framer Motion
- **I18n**: i18next

## Component Mapping

| Android Component | React Component | Notes |
|------------------|-----------------|-------|
| `MainActivity.kt` | `App.tsx` | Main application entry point |
| `ExecutionButton.kt` | `ExecutionButton.tsx` | Core button with hold-to-fill animation |
| `SoundUtils.kt` | `SoundUtils.ts` | Audio playback utility |
| `ModalBottomSheet` | `AboutModal.tsx` | About information modal |
| `ShosuTheme` | `theme.ts` | Theme configuration |
| `strings.xml` | `i18n.ts` | Localization strings |

## Feature Parity

### Implemented Features
✅ Execution button with 5.5-second hold requirement  
✅ Fill progress animation  
✅ Audio playback (loop during hold, sound on completion)  
✅ Double-tap to reset  
✅ About/information modal  
✅ Internationalization (Japanese/English)  
✅ Dark theme with Material Design colors  
✅ Smooth animations and transitions  
✅ First-time user tip  

### Platform Differences

#### Audio
- **Android**: MediaPlayer with native audio format support
- **Web**: HTML5 Audio API (WAV files, browser-dependent)

#### Haptics
- **Android**: Full vibration API support with patterns
- **Web**: Not implemented (Vibration API has limited browser support)

#### Performance
- **Android**: Native performance, compiled to bytecode
- **Web**: JavaScript runtime, optimized with requestAnimationFrame

## Technical Decisions

### Why Vite?
- Modern, fast build tool
- Better than deprecated Create React App
- Native ES modules support
- Fast HMR (Hot Module Replacement)

### Why Material-UI?
- Best Material Design implementation for React
- Consistent with Android's Material 3
- Comprehensive component library
- Good TypeScript support

### Why Framer Motion?
- Best-in-class animation library for React
- Easy-to-use API similar to Compose animations
- Hardware-accelerated animations
- Great TypeScript support

### Why i18next?
- Industry standard for React i18n
- Simple API
- Runtime language switching
- Good ecosystem

## Performance Optimizations

1. **requestAnimationFrame**: Used instead of setInterval for smooth 60fps animations
2. **Asset Optimization**: Images and audio files copied as-is (original quality)
3. **Code Splitting**: Automatic by Vite
4. **Tree Shaking**: Dead code elimination in production build
5. **Minification**: JavaScript/CSS minification enabled
6. **Gzip**: Bundle compressed for faster loading

## Limitations

### Browser Support
- Modern browsers only (ES2020+)
- No Internet Explorer support
- Requires JavaScript enabled

### Missing Features (vs Android)
- No haptic feedback (limited browser support)
- No native mobile features (notifications, widgets, etc.)
- Larger initial bundle size (includes framework code)

### Advantages over Android
- No installation required
- Cross-platform (works on iOS, Android, Desktop)
- Easier to update (no app store approval)
- Better accessibility (browser tools)
- Easier to share (just a URL)

## File Structure

```
web/
├── public/              # Static assets
│   ├── *.png           # Images from Android drawable
│   ├── *.wav           # Audio from Android raw
│   └── *.jpg           # Background image
├── src/
│   ├── components/      # React components
│   ├── utils/          # Utility classes
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   ├── theme.ts        # MUI theme config
│   └── i18n.ts         # Internationalization
└── [config files]      # TypeScript, Vite, ESLint configs
```

## Build & Deployment

### Development
```bash
cd web
npm install
npm run dev
```

### Production Build
```bash
npm run build
```
Output: `dist/` directory

### Deployment Options
- Static hosting (Vercel, Netlify, GitHub Pages)
- Docker container
- Traditional web server (nginx, Apache)

See `web/DEPLOYMENT.md` for detailed instructions.

## Testing

### Tested Scenarios
✅ Button press and hold (full 5.5 seconds)  
✅ Button release before completion  
✅ Double-tap reset  
✅ About modal open/close  
✅ Audio playback  
✅ First-time tip display  
✅ Language detection (Japanese/English)  
✅ Responsive layout  
✅ Production build  

### Browser Compatibility
Tested on:
- Chrome/Edge (Chromium)
- Firefox
- Safari (desktop)

## Future Enhancements

Potential improvements:
- [ ] Add Progressive Web App (PWA) support
- [ ] Implement service worker for offline functionality
- [ ] Add touch-based haptic feedback (where supported)
- [ ] Optimize bundle size with code splitting
- [ ] Add animation preferences (respect prefers-reduced-motion)
- [ ] Implement analytics
- [ ] Add error tracking
- [ ] Create mobile-optimized layout

## Maintenance

### Updating Dependencies
```bash
cd web
npm update
npm audit fix
```

### Security
- Regular dependency updates
- CodeQL scanning enabled
- No known vulnerabilities

## Conclusion

The migration successfully preserves all core functionality of the original Android app while making it accessible via web browsers. The modern React stack provides good performance, maintainability, and developer experience.

Both versions coexist in the repository:
- `app/` - Original Android version
- `web/` - New React web version
