import { NavigationProp, RouteProp } from '@react-navigation/native';
import { MainStackParamList, AuthStackParamList } from '../types';

// Navigation prop types for type safety
export type MainNavigationProp = NavigationProp<MainStackParamList>;
export type AuthNavigationProp = NavigationProp<AuthStackParamList>;

// Route prop types for type safety
export type MainRouteProp<T extends keyof MainStackParamList> = RouteProp<MainStackParamList, T>;
export type AuthRouteProp<T extends keyof AuthStackParamList> = RouteProp<AuthStackParamList, T>;

// Navigation helper functions
export const navigationHelpers = {
  // Navigate to a screen with type safety
  navigateToScreen: (
    navigation: MainNavigationProp,
    screenName: keyof MainStackParamList,
    params?: MainStackParamList[keyof MainStackParamList]
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (navigation as any).navigate(screenName, params);
  },

  // Go back with optional fallback
  goBack: (navigation: MainNavigationProp, fallbackScreen?: keyof MainStackParamList) => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else if (fallbackScreen) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigation as any).navigate(fallbackScreen);
    }
  },

  // Reset navigation stack
  resetToScreen: (
    navigation: MainNavigationProp,
    screenName: keyof MainStackParamList,
    params?: MainStackParamList[keyof MainStackParamList]
  ) => {
    navigation.reset({
      index: 0,
      routes: [{ name: screenName, params }],
    });
  },
};

// Screen transition animations
export const screenTransitions = {
  slideFromRight: {
    animation: 'slide_from_right' as const,
    animationDuration: 300,
  },
  slideFromBottom: {
    animation: 'slide_from_bottom' as const,
    animationDuration: 300,
  },
  fadeIn: {
    animation: 'fade' as const,
    animationDuration: 200,
  },
  none: {
    animation: 'none' as const,
    animationDuration: 0,
  },
};

// Common screen options
export const commonScreenOptions = {
  gestureEnabled: true,
  gestureDirection: 'horizontal' as const,
  animationDuration: 300,
};

// Header button configurations
export const headerButtonStyles = {
  marginHorizontal: 16,
  padding: 8,
  borderRadius: 8,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
};