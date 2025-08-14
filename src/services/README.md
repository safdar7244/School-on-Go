# Firebase Services

This directory contains all Firebase-related services for the Student-on-the-Go app.

## Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication, Firestore, and Storage

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in your Firebase project configuration values
   - Get these values from Firebase Console > Project Settings > General > Your apps

3. **Enable Authentication Methods**
   - In Firebase Console, go to Authentication > Sign-in method
   - Enable Email/Password authentication

4. **Set up Firestore Database**
   - In Firebase Console, go to Firestore Database
   - Create database in production mode
   - Set up security rules (see below)

5. **Configure Storage**
   - In Firebase Console, go to Storage
   - Set up storage bucket
   - Configure security rules

## Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Chat rooms are readable by authenticated users
    match /chatRooms/{roomId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null; // Adjust based on your needs
    }
    
    // Messages are readable by authenticated users in the same chat room
    match /messages/{messageId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow update, delete: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

## Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Services Overview

### AuthService (`authService.ts`)
- User registration and login
- Password reset functionality
- User profile management
- Authentication state monitoring

### FirestoreService (`firestoreService.ts`)
- Generic Firestore operations (CRUD)
- Real-time subscriptions
- Batch operations
- Query building utilities

### ChatService (`chatService.ts`)
- Chat room management
- Real-time messaging
- Message operations
- Participant tracking

## Usage Examples

### Authentication
```typescript
import { authService } from '@/services';

// Sign up
const result = await authService.signUp({
  email: 'user@example.com',
  password: 'password123',
  displayName: 'John Doe'
});

// Sign in
const loginResult = await authService.signIn({
  email: 'user@example.com',
  password: 'password123'
});

// Sign out
await authService.signOut();
```

### Chat Operations
```typescript
import { chatService } from '@/services';

// Get chat rooms
const rooms = await chatService.getChatRooms();

// Send message
await chatService.sendMessage('roomId', 'Hello world!');

// Subscribe to messages
const unsubscribe = chatService.subscribeToMessages(
  'roomId',
  (messages) => {
    console.log('New messages:', messages);
  }
);
```

### Firestore Operations
```typescript
import { firestoreService } from '@/services';

// Add document
await firestoreService.addDocument('collection', { data: 'value' });

// Get documents with query
const result = await firestoreService.getDocuments('collection', {
  where: [{ field: 'status', operator: '==', value: 'active' }],
  orderBy: [{ field: 'createdAt', direction: 'desc' }],
  limit: 10
});
```

## Development with Emulators

To use Firebase emulators for local development:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Set up emulators: `firebase init emulators`
3. Set environment variable: `EXPO_PUBLIC_USE_FIREBASE_EMULATOR=true`
4. Start emulators: `firebase emulators:start`

The services will automatically connect to emulators when running in development mode.