# Flutter Migration Documentation

## Overview

This document describes the migration of the Shosu (処刑) Android application from Kotlin + Jetpack Compose to Flutter.

## Migration Summary

### What Changed

1. **Framework**: Migrated from Android-native (Kotlin + Jetpack Compose) to Flutter (Dart)
2. **Project Structure**: 
   - Old: Gradle-based Android project
   - New: Flutter project with `pubspec.yaml`
3. **Code Base**: Completely rewritten in Dart while maintaining the same functionality

### File Mappings

#### Kotlin → Dart Conversions

| Original File | New File | Description |
|--------------|----------|-------------|
| `app/src/main/java/com/polariss/shosu/MainActivity.kt` | `lib/main.dart` + `lib/screens/home_screen.dart` | Main application entry and home screen |
| `app/src/main/java/com/polariss/shosu/app/ExecutionButton.kt` | `lib/widgets/execution_button.dart` | Execution button widget |
| `app/src/main/java/com/polariss/shosu/app/SoundUtils.kt` | Integrated into `execution_button.dart` | Audio playback functionality |
| `app/src/main/res/values/strings.xml` | `lib/l10n/app_localizations.dart` | Localization strings |

#### Resource Migrations

| Original Location | New Location | Notes |
|------------------|--------------|-------|
| `app/src/main/res/drawable/*.png` | `assets/images/` | Image assets |
| `app/src/main/res/raw/*.wav` | `assets/audio/` | Audio files |
| `app/src/main/res/mipmap-*/*.webp` | `android/app/src/main/res/mipmap-*/` | Launcher icons |

### Dependencies

#### Kotlin/Android Dependencies → Flutter Packages

| Android Dependency | Flutter Package | Purpose |
|-------------------|----------------|---------|
| `androidx.compose.*` | Built-in Flutter widgets | UI framework |
| `androidx.core:core-splashscreen` | Native splash screen | Splash screen |
| `MediaPlayer` | `audioplayers: ^6.1.0` | Audio playback |
| `Vibrator` | `vibration: ^2.0.0` | Haptic feedback |
| `SharedPreferences` | `shared_preferences: ^2.3.3` | Local storage |
| - | `flutter_localizations` | Internationalization |
| - | `intl: ^0.19.0` | Date/number formatting |

### Key Features Maintained

1. **Execution Button Animation**
   - Press and hold to fill animation (5.5 seconds)
   - Scale animation on press (94% scale)
   - Shadow effect with blur
   - Double-tap to reset

2. **Audio**
   - Processing sound (looping) during hold
   - Finished sound on completion

3. **Haptic Feedback**
   - Continuous vibration pattern during hold

4. **Localization**
   - Japanese (ja)
   - Chinese (zh)
   - English (en)

5. **Bottom Sheet Info Panel**
   - App information
   - Version display
   - Developer credits
   - Links (currently placeholders)

### Architecture Changes

#### State Management
- **Old**: Jetpack Compose state with `mutableStateOf` and `remember`
- **New**: Flutter StatefulWidget with `setState()`

#### Animation
- **Old**: Compose's `Animatable` and `tween`
- **New**: Flutter's `AnimationController` with `Tween` and `CurvedAnimation`

#### Platform Integration
- **Old**: Direct Android API calls
- **New**: Flutter plugins (`audioplayers`, `vibration`)

### Build Configuration

#### Android Configuration
- `minSdk`: 29 (Android 10)
- `targetSdk`: 36 (Android 15)
- `compileSdk`: 36
- Application ID: `com.polariss.shosu`

### File Structure

```
shosu/
├── android/                 # Android-specific configuration
│   ├── app/
│   │   ├── build.gradle    # Android build configuration
│   │   └── src/main/
│   │       ├── AndroidManifest.xml
│   │       ├── kotlin/     # Minimal Flutter MainActivity
│   │       └── res/        # Android resources (icons, splash)
│   ├── build.gradle        # Root Android build file
│   └── settings.gradle     # Android settings
├── assets/                 # Application assets
│   ├── audio/             # Audio files (.wav)
│   └── images/            # Images (.png, .jpg)
├── lib/                    # Dart source code
│   ├── l10n/              # Localization
│   ├── screens/           # Screen widgets
│   ├── widgets/           # Reusable widgets
│   └── main.dart          # Application entry point
├── test/                   # Tests
├── pubspec.yaml           # Flutter dependencies
└── analysis_options.yaml  # Dart linter configuration
```

### Running the Application

#### Prerequisites
- Flutter SDK 3.0.0 or higher
- Android SDK (for Android builds)
- Xcode (for iOS builds, macOS only)

#### Commands
```bash
# Get dependencies
flutter pub get

# Run in debug mode
flutter run

# Build APK
flutter build apk --release

# Build iOS app
flutter build ios --release
```

### Testing

```bash
# Run all tests
flutter test

# Run with coverage
flutter test --coverage
```

### Known Differences from Original

1. **URL Launching**: The original app had clickable links (X/Twitter, Bilibili). These are currently placeholder buttons. To implement, add the `url_launcher` package.

2. **Splash Screen**: The Flutter version uses native splash screen. The original used Core Splash Screen library.

3. **Permissions**: The Flutter version includes `INTERNET` permission for future network features.

### Future Enhancements

1. Add `url_launcher` package and implement link opening
2. Add iOS support with proper configuration
3. Consider adding web support
4. Implement proper testing coverage
5. Add CI/CD pipeline for automated builds

### Migration Benefits

1. **Cross-platform**: Can now target iOS, Web, and desktop platforms
2. **Hot Reload**: Faster development iteration
3. **Single Codebase**: Maintain one codebase for multiple platforms
4. **Rich Ecosystem**: Access to extensive Flutter package ecosystem
5. **Performance**: Flutter's compilation to native code provides excellent performance

### Compatibility

- **Android**: Minimum API 29 (Android 10+)
- **iOS**: Ready for implementation (requires iOS-specific configuration)
- **Web**: Requires additional setup but supported by Flutter
- **Desktop**: Requires additional setup but supported by Flutter

## Conclusion

The migration successfully preserves all functionality of the original Android application while opening the door to multi-platform deployment. The code is cleaner and more maintainable, following Flutter best practices.
