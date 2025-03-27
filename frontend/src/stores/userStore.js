import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Configure additional Google OAuth scopes if needed
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');

// Set custom parameters
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      signup: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          set({
            user: userCredential.user,
            isAuthenticated: true,
            error: null,
          });
          return true;
        } catch (error) {
          let errorMessage = 'An error occurred during sign up';
          switch (error.code) {
            case 'auth/email-already-in-use':
              errorMessage = 'This email is already registered';
              break;
            case 'auth/invalid-email':
              errorMessage = 'Invalid email address';
              break;
            case 'auth/operation-not-allowed':
              errorMessage = 'Email/password accounts are not enabled';
              break;
            case 'auth/weak-password':
              errorMessage = 'Password should be at least 6 characters';
              break;
            default:
              errorMessage = error.message;
          }
          set({ error: errorMessage });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          set({
            user: userCredential.user,
            isAuthenticated: true,
            error: null,
          });
          return true;
        } catch (error) {
          let errorMessage = 'An error occurred during login';
          switch (error.code) {
            case 'auth/invalid-email':
              errorMessage = 'Invalid email address';
              break;
            case 'auth/user-disabled':
              errorMessage = 'This account has been disabled';
              break;
            case 'auth/user-not-found':
              errorMessage = 'No account found with this email';
              break;
            case 'auth/wrong-password':
              errorMessage = 'Invalid password';
              break;
            default:
              errorMessage = error.message;
          }
          set({ error: errorMessage });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true, error: null });
        try {
          const result = await signInWithPopup(auth, googleProvider);
          
          // Get the user's credentials
          const user = result.user;
          
          set({
            user: user,
            isAuthenticated: true,
            error: null,
          });
          return true;
        } catch (error) {
          let errorMessage = 'Failed to sign in with Google';
          if (error.code === 'auth/popup-closed-by-user') {
            errorMessage = 'Sign in was cancelled';
          } else if (error.code === 'auth/popup-blocked') {
            errorMessage = 'Sign in popup was blocked. Please allow popups for this site';
          }
          set({ error: errorMessage });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await signOut(auth);
          set({
            user: null,
            isAuthenticated: false,
            error: null,
          });
          return true;
        } catch (error) {
          set({ error: 'Failed to sign out. Please try again.' });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      resetError: () => set({ error: null }),

      // Initialize auth state
      initAuth: () => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          set({
            user: user,
            isAuthenticated: !!user,
            isLoading: false,
          });
        });

        // Return unsubscribe function for cleanup
        return unsubscribe;
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);