import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    updateProfile,
    sendPasswordResetEmail,
    AuthError,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    createdAt: Date;
    lastLoginAt: Date;
}

export interface AuthResult {
    success: boolean;
    user?: UserProfile;
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

class AuthService {
    /**
     * Sign up a new user with email and password
     */
    async signUp({ email, password, displayName }: SignUpData): Promise<AuthResult> {
        try {
            // Create user account
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update user profile with display name
            await updateProfile(user, { displayName });

            // Create user document in Firestore
            const userProfile: Omit<UserProfile, 'uid'> = {
                email: user.email!,
                displayName,
                createdAt: new Date(),
                lastLoginAt: new Date(),
            };

            await setDoc(doc(db, 'users', user.uid), {
                ...userProfile,
                createdAt: serverTimestamp(),
                lastLoginAt: serverTimestamp(),
            });

            return {
                success: true,
                user: {
                    uid: user.uid,
                    ...userProfile,
                },
            };
        } catch (error) {
            return {
                success: false,
                error: this.getAuthErrorMessage(error as AuthError),
            };
        }
    }

    /**
     * Sign in user with email and password
     */
    async signIn({ email, password }: LoginData): Promise<AuthResult> {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update last login time
            await setDoc(
                doc(db, 'users', user.uid),
                {
                    lastLoginAt: serverTimestamp(),
                },
                { merge: true }
            );

            // Get user profile from Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const userData = userDoc.data();

            const userProfile: UserProfile = {
                uid: user.uid,
                email: user.email!,
                displayName: user.displayName || userData?.displayName || '',
                createdAt: userData?.createdAt?.toDate() || new Date(),
                lastLoginAt: new Date(),
            };

            return {
                success: true,
                user: userProfile,
            };
        } catch (error) {
            return {
                success: false,
                error: this.getAuthErrorMessage(error as AuthError),
            };
        }
    }

    /**
     * Sign out current user
     */
    async signOut(): Promise<AuthResult> {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: this.getAuthErrorMessage(error as AuthError),
            };
        }
    }

    /**
     * Send password reset email
     */
    async resetPassword(email: string): Promise<AuthResult> {
        try {
            await sendPasswordResetEmail(auth, email);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: this.getAuthErrorMessage(error as AuthError),
            };
        }
    }

    /**
     * Get current user profile
     */
    async getCurrentUserProfile(): Promise<UserProfile | null> {
        const user = auth.currentUser;
        if (!user) return null;

        try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const userData = userDoc.data();

            return {
                uid: user.uid,
                email: user.email!,
                displayName: user.displayName || userData?.displayName || '',
                createdAt: userData?.createdAt?.toDate() || new Date(),
                lastLoginAt: userData?.lastLoginAt?.toDate() || new Date(),
            };
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
    }

    /**
     * Listen to authentication state changes
     */
    onAuthStateChanged(callback: (user: User | null) => void) {
        return onAuthStateChanged(auth, callback);
    }

    /**
     * Get current authenticated user
     */
    getCurrentUser(): User | null {
        return auth.currentUser;
    }

    /**
     * Convert Firebase Auth errors to user-friendly messages
     */
    private getAuthErrorMessage(error: AuthError): string {
        switch (error.code) {
            case 'auth/user-not-found':
                return 'No account found with this email address.';
            case 'auth/wrong-password':
                return 'Incorrect password. Please try again.';
            case 'auth/email-already-in-use':
                return 'An account with this email already exists.';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters long.';
            case 'auth/invalid-email':
                return 'Please enter a valid email address.';
            case 'auth/user-disabled':
                return 'This account has been disabled.';
            case 'auth/too-many-requests':
                return 'Too many failed attempts. Please try again later.';
            case 'auth/network-request-failed':
                return 'Network error. Please check your connection and try again.';
            default:
                return error.message || 'An unexpected error occurred. Please try again.';
        }
    }
}

export const authService = new AuthService();
export default authService;