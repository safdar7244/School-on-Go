import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeContextValue } from '../theme/types';
import { lightTheme, darkTheme } from '../theme';

const THEME_STORAGE_KEY = '@student_app_theme_preference';

interface ThemeProviderProps {
  children: ReactNode;
}

// Create the theme context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Error boundary component for theme-related errors
class ThemeErrorBoundary extends React.Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Theme Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize theme from stored preference or system preference
  useEffect(() => {
    const initializeTheme = async () => {
      try {
        // Try to get stored theme preference
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        
        if (storedTheme !== null) {
          // Use stored preference
          setIsDark(storedTheme === 'dark');
        } else {
          // Fall back to system preference
          const systemColorScheme = Appearance.getColorScheme();
          setIsDark(systemColorScheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
        // Fall back to system preference on error
        const systemColorScheme = Appearance.getColorScheme();
        setIsDark(systemColorScheme === 'dark');
      } finally {
        setIsLoading(false);
      }
    };

    initializeTheme();
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }: { colorScheme: ColorSchemeName }) => {
      // Only update if no stored preference exists
      AsyncStorage.getItem(THEME_STORAGE_KEY).then((storedTheme) => {
        if (storedTheme === null) {
          setIsDark(colorScheme === 'dark');
        }
      }).catch((error) => {
        console.error('Error checking stored theme preference:', error);
      });
    });

    return () => subscription?.remove();
  }, []);

  // Toggle theme function
  const toggleTheme = async () => {
    try {
      const newIsDark = !isDark;
      setIsDark(newIsDark);
      
      // Store the preference
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newIsDark ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
      // Still update the state even if storage fails
      setIsDark(!isDark);
    }
  };

  // Get current theme based on isDark state
  const theme: Theme = isDark ? darkTheme : lightTheme;

  // Context value
  const contextValue: ThemeContextValue = {
    theme,
    isDark,
    toggleTheme,
  };

  // Show loading state or fallback theme while initializing
  if (isLoading) {
    // Return a minimal provider with light theme as fallback during loading
    const fallbackContextValue: ThemeContextValue = {
      theme: lightTheme,
      isDark: false,
      toggleTheme: () => {},
    };
    
    return (
      <ThemeContext.Provider value={fallbackContextValue}>
        {children}
      </ThemeContext.Provider>
    );
  }

  // Fallback component for error boundary
  const ErrorFallback = () => {
    const fallbackContextValue: ThemeContextValue = {
      theme: lightTheme,
      isDark: false,
      toggleTheme: () => {},
    };
    
    return (
      <ThemeContext.Provider value={fallbackContextValue}>
        {children}
      </ThemeContext.Provider>
    );
  };

  return (
    <ThemeErrorBoundary fallback={<ErrorFallback />}>
      <ThemeContext.Provider value={contextValue}>
        {children}
      </ThemeContext.Provider>
    </ThemeErrorBoundary>
  );
};

// Hook to use theme context
export const useThemeContext = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  
  return context;
};

// Export the context for advanced use cases
export { ThemeContext };