# Student on the Go

A modern React Native mobile application for Noroff University College students, built with Expo and TypeScript.

## Features

- User Authentication (Login/Signup)
- Real-time Chat System
- Faculty Directory
- Study Resources Library
- Academic Links Portal
- Class Schedule Access
- Modern Navigation Interface
- Offline Capability

## Technology Stack

- **Framework**: React Native with Expo SDK 53.x
- **Language**: TypeScript
- **Navigation**: React Navigation 7.x
- **Backend**: Firebase v11.x
- **UI Library**: React Native Elements (RNEUI)
- **State Management**: Zustand (to be added)
- **Development Tools**: ESLint, Prettier

## Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
├── navigation/         # Navigation configuration
├── services/          # Firebase and API services
├── stores/            # Zustand stores
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── hooks/             # Custom React hooks
└── constants/         # App constants and configuration
```

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Run on specific platforms:
   ```bash
   npm run android  # Android
   npm run ios      # iOS
   npm run web      # Web
   ```

## Development Scripts

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Firebase Setup

1. Create a Firebase project
2. Enable Authentication, Firestore, and Storage
3. Update the Firebase configuration in `src/services/firebase.ts`

## Contributing

This project follows the spec-driven development methodology. See the `.kiro/specs/student-app-rebuild/` directory for detailed requirements, design, and implementation tasks.
