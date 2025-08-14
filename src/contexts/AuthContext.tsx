import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { authService, UserProfile, AuthResult, SignUpData, LoginData } from '../services/authService';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (data: LoginData) => Promise<AuthResult>;
  signUp: (data: SignUpData) => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<AuthResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (firebaseUser: FirebaseUser | null) => {
      setIsLoading(true);
      
      if (firebaseUser) {
        // User is signed in, get their profile
        const userProfile = await authService.getCurrentUserProfile();
        setUser(userProfile);
      } else {
        // User is signed out
        setUser(null);
      }
      
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (data: LoginData): Promise<AuthResult> => {
    setIsLoading(true);
    const result = await authService.signIn(data);
    
    if (result.success && result.user) {
      setUser(result.user);
    }
    
    setIsLoading(false);
    return result;
  };

  const signUp = async (data: SignUpData): Promise<AuthResult> => {
    setIsLoading(true);
    const result = await authService.signUp(data);
    
    if (result.success && result.user) {
      setUser(result.user);
    }
    
    setIsLoading(false);
    return result;
  };

  const signOut = async (): Promise<AuthResult> => {
    setIsLoading(true);
    const result = await authService.signOut();
    
    if (result.success) {
      setUser(null);
    }
    
    setIsLoading(false);
    return result;
  };

  const resetPassword = async (email: string): Promise<AuthResult> => {
    return await authService.resetPassword(email);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;