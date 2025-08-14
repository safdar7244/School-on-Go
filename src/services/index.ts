// Firebase core
export { auth, db, storage } from './firebase';

// Services
export { authService } from './authService';
export { firestoreService } from './firestoreService';
export { chatService } from './chatService';

// Types
export type {
  UserProfile,
  AuthResult,
  SignUpData,
  LoginData,
} from './authService';

export type {
  FirestoreDocument,
  QueryOptions,
} from './firestoreService';

export type {
  ChatRoom,
  Message,
} from './chatService';