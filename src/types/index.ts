// User Authentication Types
export interface User {
  uid: string;
  email: string;
  displayName: string;
  createdAt: Date;
  lastLoginAt: Date;
}

// Chat System Types
export interface ChatRoom {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  participantCount: number;
}

export interface Message {
  id: string;
  chatRoomId: string;
  userId: string;
  userDisplayName: string;
  userEmail: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}

// Faculty Types
export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  email: string;
  imageUrl: string;
  program: 'cyber-security' | 'data-science' | 'both';
  department?: string;
}

// Resource Types
export interface StudyResource {
  id: string;
  title: string;
  url: string;
  category: string;
  description?: string;
  tags: string[];
}

export interface AcademicLink {
  id: string;
  title: string;
  url: string;
  category: 'research' | 'career' | 'video' | 'books';
  description?: string;
}

// Service Types
export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export interface SignUpData {
  email: string;
  password: string;
  displayName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface FirestoreDocument {
  id: string;
  [key: string]: any;
}

export interface QueryOptions {
  where?: Array<{
    field: string;
    operator: '==' | '!=' | '<' | '<=' | '>' | '>=' | 'array-contains' | 'in' | 'array-contains-any';
    value: any;
  }>;
  orderBy?: Array<{
    field: string;
    direction: 'asc' | 'desc';
  }>;
  limit?: number;
}

// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  Chat: { roomId?: string };
  Faculty: undefined;
  Library: undefined;
  StudyLinks: undefined;
  Timetable: undefined;
};
