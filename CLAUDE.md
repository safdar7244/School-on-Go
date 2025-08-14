# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native mobile application built with Expo for Noroff University College students. The app serves as a centralized hub providing authentication, real-time chat, faculty directory, study resources, and academic tools.

## Technology Stack

- **Framework**: React Native with Expo SDK 53.x
- **Language**: TypeScript with strict mode enabled
- **Navigation**: React Navigation 7.x (native-stack)
- **Backend**: Firebase v12.x (Auth, Firestore, Storage)
- **UI Components**: React Native Elements (RNEUI)
- **State Management**: React Context (AuthContext), Zustand planned
- **Form Handling**: React Hook Form
- **Development Tools**: ESLint, Prettier

## Development Commands

```bash
# Start development server
npm start

# Platform-specific development
npm run android    # Android development
npm run ios        # iOS development  
npm run web        # Web development

# Code quality
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues automatically
npm run format     # Format code with Prettier
npm run type-check # TypeScript type checking
```

## Project Architecture

### Directory Structure
```
src/
├── components/      # Reusable UI components with index exports
├── screens/        # Screen components organized by feature (auth/, main/)
├── navigation/     # Navigation setup and configuration
├── services/       # Firebase and external API services
├── contexts/       # React Context providers (AuthContext)
├── types/          # TypeScript type definitions
├── constants/      # App-wide constants (colors, spacing, fonts)
├── utils/          # Utility functions
├── hooks/          # Custom React hooks
└── stores/         # State management (Zustand - planned)
```

### Key Architectural Patterns

#### Navigation Structure
- **AppNavigator**: Root navigator handling auth state routing
- **AuthNavigator**: Stack navigator for login/signup screens
- **MainNavigator**: Main app navigation after authentication
- Custom navigation theme with consistent colors and animations

#### Authentication Flow
- Context-based auth state management via `AuthContext`
- Firebase Auth integration with automatic session persistence
- Route protection based on authentication state
- User profile management with Firestore integration

#### Type System
- Comprehensive TypeScript definitions in `src/types/index.ts`
- Navigation param lists for type-safe routing
- Service interfaces for Firebase operations
- Form validation and state management types

#### Firebase Integration
- Configured for student-on-the-move project
- Auth, Firestore, and Storage initialization
- Emulator support for development (controlled by `EXPO_PUBLIC_USE_FIREBASE_EMULATOR`)
- Service layer abstraction in `src/services/`

#### UI Consistency
- Centralized design tokens in `src/constants/index.ts`
- RNEUI component library for consistent styling
- Custom navigation theme matching app colors
- Responsive spacing and typography system

### Code Conventions

#### Import Organization
- Use absolute imports with `@/*` path mapping (configured in tsconfig.json)
- Utilize barrel exports from `index.ts` files
- Group imports: external libraries, internal modules, types

#### Component Structure
- Functional components with TypeScript
- Props interfaces defined inline or in types file
- StyleSheet.create for component styles
- Consistent naming: PascalCase for components, camelCase for functions

#### Firebase Services
- Abstracted service layer in `src/services/`
- Centralized error handling with AuthResult pattern
- Type-safe Firestore operations with QueryOptions interface

## Firebase Configuration

The app uses Firebase for backend services:
- **Project**: student-on-the-move-4383f
- **Services**: Authentication, Firestore Database, Cloud Storage
- **Config**: Located in `src/services/firebase.ts`
- **Emulator**: Enable with `EXPO_PUBLIC_USE_FIREBASE_EMULATOR=true`

## Development Notes

- TypeScript strict mode is enabled
- ESLint configured with TypeScript rules and Prettier integration
- No test framework currently configured
- Expo New Architecture enabled (`newArchEnabled: true`)
- The project follows spec-driven development (see `.kiro/specs/` directory)

## Common File Locations

- Main entry: `index.ts` (Expo standard)
- App root: `App.tsx`
- Navigation: `src/navigation/AppNavigator.tsx`
- Auth context: `src/contexts/AuthContext.tsx`
- Firebase setup: `src/services/firebase.ts`
- Type definitions: `src/types/index.ts`
- Constants: `src/constants/index.ts`