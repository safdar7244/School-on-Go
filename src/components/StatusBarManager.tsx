import React, { useEffect } from 'react';
import { StatusBar, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';

export interface StatusBarManagerProps {
  /**
   * Status bar variant - determines styling approach
   * - 'auto': Automatically determine based on background
   * - 'light': Light status bar (white text/icons)
   * - 'dark': Dark status bar (dark text/icons)
   * - 'gradient': Special handling for gradient backgrounds
   */
  variant?: 'auto' | 'light' | 'dark' | 'gradient';
  
  /**
   * Background color to match status bar to
   * If provided, status bar will match this color
   */
  backgroundColor?: string;
  
  /**
   * Gradient colors for gradient variant
   * Uses first color for status bar background
   */
  gradientColors?: string[];
  
  /**
   * Override automatic content style detection
   */
  contentStyle?: 'light-content' | 'dark-content' | 'default';
  
  /**
   * Whether to animate status bar changes
   */
  animated?: boolean;
  
  /**
   * Whether to hide the status bar
   */
  hidden?: boolean;
  
  /**
   * Status bar translucency (Android only)
   */
  translucent?: boolean;
}

/**
 * StatusBarManager component that automatically manages status bar styling
 * based on theme, background colors, and platform-specific requirements.
 * 
 * Features:
 * - Automatic color matching with screen backgrounds
 * - Dark mode support with theme awareness
 * - Platform-specific handling (iOS/Android)
 * - Safe area integration
 * - Luminance-based content styling
 * - Gradient background support
 */
export const StatusBarManager: React.FC<StatusBarManagerProps> = ({
  variant = 'auto',
  backgroundColor,
  gradientColors,
  contentStyle,
  animated = true,
  hidden = false,
  translucent = true,
}) => {
  const { theme, isDark, utils, colorUtils } = useTheme();
  const insets = useSafeAreaInsets();
  
  // Determine the actual background color to use
  const getBackgroundColor = (): string => {
    if (backgroundColor) {
      return backgroundColor;
    }
    
    if (variant === 'gradient' && gradientColors && gradientColors.length > 0) {
      return gradientColors[0]; // Use first gradient color
    }
    
    // Default to theme background
    return theme.colors.background;
  };
  
  // Determine the content style (light or dark icons/text)
  const getContentStyle = (): 'light-content' | 'dark-content' | 'default' => {
    if (contentStyle) {
      return contentStyle;
    }
    
    const bgColor = getBackgroundColor();
    
    switch (variant) {
      case 'light':
        return 'light-content';
      case 'dark':
        return 'dark-content';
      case 'gradient':
      case 'auto':
      default:
        // Use luminance-based detection
        return utils.getStatusBarStyle(bgColor);
    }
  };
  
  // Get the final background color for the status bar
  const getFinalBackgroundColor = (): string => {
    const bgColor = getBackgroundColor();
    
    // For gradient variant, we might want to slightly adjust the color
    if (variant === 'gradient') {
      // Slightly darken the gradient color for better status bar visibility
      return colorUtils.darken(bgColor, 5);
    }
    
    return bgColor;
  };
  
  // Apply status bar configuration
  useEffect(() => {
    const finalBgColor = getFinalBackgroundColor();
    const finalContentStyle = getContentStyle();
    
    // Set status bar style
    StatusBar.setBarStyle(finalContentStyle, animated);
    
    // Platform-specific background color handling
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(finalBgColor, animated);
      StatusBar.setTranslucent(translucent);
    }
    
    // Set hidden state
    StatusBar.setHidden(hidden, animated ? 'slide' : 'none');
    
  }, [
    variant,
    backgroundColor,
    gradientColors,
    contentStyle,
    animated,
    hidden,
    translucent,
    isDark,
    theme.colors.background,
  ]);
  
  // iOS status bar background handling through safe area
  const getIOSStatusBarStyle = () => {
    if (Platform.OS !== 'ios' || hidden) {
      return {};
    }
    
    const finalBgColor = getFinalBackgroundColor();
    
    return {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      height: insets.top,
      backgroundColor: finalBgColor,
      zIndex: 1000,
    };
  };
  
  // For iOS, we need to render a background view for the status bar area
  // since iOS doesn't support setting status bar background color directly
  if (Platform.OS === 'ios' && !hidden && insets.top > 0) {
    return (
      <View style={getIOSStatusBarStyle()} />
    );
  }
  
  // For Android or when status bar is hidden, no additional rendering needed
  return null;
};

/**
 * Hook for getting current status bar configuration
 * Useful for components that need to know status bar state
 */
export const useStatusBarConfig = (
  backgroundColor?: string,
  variant: StatusBarManagerProps['variant'] = 'auto'
) => {
  const { theme, utils, colorUtils } = useTheme();
  const insets = useSafeAreaInsets();
  
  const bgColor = backgroundColor || theme.colors.background;
  const contentStyle = utils.getStatusBarStyle(bgColor);
  const isLight = colorUtils.isLightColor(bgColor);
  
  return {
    backgroundColor: bgColor,
    contentStyle,
    isLight,
    statusBarHeight: insets.top,
    safeAreaInsets: insets,
  };
};

export default StatusBarManager;