import React, { useMemo } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';

export interface GradientBackgroundProps {
  /**
   * Predefined gradient variant from theme
   */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'custom';
  
  /**
   * Custom gradient colors (overrides variant)
   */
  colors?: string[];
  
  /**
   * Gradient direction configuration
   */
  direction?: {
    start: { x: number; y: number };
    end: { x: number; y: number };
  };
  
  /**
   * Predefined direction presets
   */
  directionPreset?: 'vertical' | 'horizontal' | 'diagonal' | 'radial';
  
  /**
   * Gradient locations (0-1) for color stops
   */
  locations?: number[];
  
  /**
   * Container style
   */
  style?: ViewStyle;
  
  /**
   * Whether to use absolute positioning to fill parent
   */
  absolute?: boolean;
  
  /**
   * Fallback background color if gradient fails
   */
  fallbackColor?: string;
  
  /**
   * Whether to enable performance optimizations
   */
  optimized?: boolean;
  
  /**
   * Children to render over the gradient
   */
  children?: React.ReactNode;
  
  /**
   * Callback when gradient fails to render
   */
  onError?: (error: Error) => void;
}

/**
 * GradientBackground component that provides reusable gradient backgrounds
 * with theme integration, performance optimization, and fallback handling.
 * 
 * Features:
 * - Predefined gradient variants from theme
 * - Custom gradient support with flexible configuration
 * - Multiple direction presets and custom directions
 * - Performance optimization for complex gradients
 * - Fallback handling for gradient rendering failures
 * - Theme-aware color selection with dark mode support
 * - Absolute positioning option for overlay usage
 */
export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  variant = 'primary',
  colors,
  direction,
  directionPreset = 'diagonal',
  locations,
  style,
  absolute = false,
  fallbackColor,
  optimized = true,
  children,
  onError,
}) => {
  const { theme, isDark } = useTheme();
  
  // Get gradient colors based on variant or custom colors
  const gradientColors = useMemo(() => {
    if (colors && colors.length >= 2) {
      return colors;
    }
    
    if (variant === 'custom') {
      // If custom variant but no colors provided, use primary as fallback
      return theme.gradients.primary;
    }
    
    return theme.gradients[variant] || theme.gradients.primary;
  }, [colors, variant, theme.gradients]);
  
  // Get gradient direction configuration
  const gradientDirection = useMemo(() => {
    if (direction) {
      return direction;
    }
    
    switch (directionPreset) {
      case 'vertical':
        return { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } };
      case 'horizontal':
        return { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } };
      case 'radial':
        return { start: { x: 0.5, y: 0.5 }, end: { x: 1, y: 1 } };
      case 'diagonal':
      default:
        return { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } };
    }
  }, [direction, directionPreset]);
  
  // Get fallback color
  const getFallbackColor = useMemo(() => {
    if (fallbackColor) {
      return fallbackColor;
    }
    
    // Use first gradient color as fallback
    return gradientColors[0] || theme.colors.primary;
  }, [fallbackColor, gradientColors, theme.colors.primary]);
  
  // Get container styles
  const containerStyle = useMemo((): ViewStyle => {
    const baseStyle: ViewStyle = {};
    
    if (absolute) {
      return StyleSheet.flatten([
        StyleSheet.absoluteFillObject,
        style,
      ]);
    }
    
    return StyleSheet.flatten([baseStyle, style]);
  }, [absolute, style]);
  
  // Performance optimization: memoize gradient props
  const gradientProps = useMemo(() => {
    const props: any = {
      colors: gradientColors,
      start: gradientDirection.start,
      end: gradientDirection.end,
      style: containerStyle,
    };
    
    if (locations) {
      props.locations = locations;
    }
    
    return props;
  }, [gradientColors, gradientDirection, containerStyle, locations]);
  
  // Error boundary for gradient rendering
  const renderGradient = () => {
    try {
      return (
        <LinearGradient {...gradientProps}>
          {children}
        </LinearGradient>
      );
    } catch (error) {
      console.warn('GradientBackground: Failed to render gradient, using fallback', error);
      
      if (onError) {
        onError(error as Error);
      }
      
      // Render fallback with solid color
      return (
        <View style={[containerStyle, { backgroundColor: getFallbackColor }]}>
          {children}
        </View>
      );
    }
  };
  
  return renderGradient();
};

/**
 * Predefined gradient background variants for common use cases
 */
export const GradientVariants = {
  /**
   * Primary brand gradient
   */
  Primary: (props: Omit<GradientBackgroundProps, 'variant'>) => (
    <GradientBackground variant="primary" {...props} />
  ),
  
  /**
   * Secondary brand gradient
   */
  Secondary: (props: Omit<GradientBackgroundProps, 'variant'>) => (
    <GradientBackground variant="secondary" {...props} />
  ),
  
  /**
   * Success gradient (green tones)
   */
  Success: (props: Omit<GradientBackgroundProps, 'variant'>) => (
    <GradientBackground variant="success" {...props} />
  ),
  
  /**
   * Warning gradient (orange/yellow tones)
   */
  Warning: (props: Omit<GradientBackgroundProps, 'variant'>) => (
    <GradientBackground variant="warning" {...props} />
  ),
  
  /**
   * Error gradient (red tones)
   */
  Error: (props: Omit<GradientBackgroundProps, 'variant'>) => (
    <GradientBackground variant="error" {...props} />
  ),
  
  /**
   * Info gradient (blue tones)
   */
  Info: (props: Omit<GradientBackgroundProps, 'variant'>) => (
    <GradientBackground variant="info" {...props} />
  ),
  
  /**
   * Vertical primary gradient
   */
  VerticalPrimary: (props: Omit<GradientBackgroundProps, 'variant' | 'directionPreset'>) => (
    <GradientBackground variant="primary" directionPreset="vertical" {...props} />
  ),
  
  /**
   * Horizontal primary gradient
   */
  HorizontalPrimary: (props: Omit<GradientBackgroundProps, 'variant' | 'directionPreset'>) => (
    <GradientBackground variant="primary" directionPreset="horizontal" {...props} />
  ),
  
  /**
   * Overlay gradient for content overlays
   */
  Overlay: (props: Omit<GradientBackgroundProps, 'variant' | 'absolute' | 'colors'>) => (
    <GradientBackground 
      variant="custom"
      colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
      absolute
      {...props} 
    />
  ),
  
  /**
   * Subtle surface gradient
   */
  Surface: (props: Omit<GradientBackgroundProps, 'variant' | 'colors'>) => {
    const { theme } = useTheme();
    return (
      <GradientBackground 
        variant="custom"
        colors={[theme.colors.surface, theme.colors.surfaceSecondary]}
        {...props} 
      />
    );
  },
};

/**
 * Utility functions for gradient manipulation
 */
export const gradientUtils = {
  /**
   * Create a gradient with opacity fade
   */
  createFadeGradient: (color: string, direction: 'in' | 'out' = 'out'): string[] => {
    if (direction === 'out') {
      return [color, `${color}00`]; // Fade to transparent
    } else {
      return [`${color}00`, color]; // Fade from transparent
    }
  },
  
  /**
   * Create a multi-stop gradient
   */
  createMultiStopGradient: (colors: string[], stops?: number[]): { colors: string[]; locations?: number[] } => {
    if (stops && stops.length === colors.length) {
      return { colors, locations: stops };
    }
    
    // Auto-generate evenly spaced stops
    const locations = colors.map((_, index) => index / (colors.length - 1));
    return { colors, locations };
  },
};

/**
 * Hook for gradient utilities that need theme access
 */
export const useGradientUtils = () => {
  const { colorUtils } = useTheme();
  
  return {
    ...gradientUtils,
    
    /**
     * Lighten a gradient by a percentage
     */
    lightenGradient: (colors: string[], percent: number): string[] => {
      return colors.map(color => colorUtils.lighten(color, percent));
    },
    
    /**
     * Darken a gradient by a percentage
     */
    darkenGradient: (colors: string[], percent: number): string[] => {
      return colors.map(color => colorUtils.darken(color, percent));
    },
    
    /**
     * Add alpha transparency to a gradient
     */
    addAlphaToGradient: (colors: string[], alpha: number): string[] => {
      return colors.map(color => colorUtils.addAlpha(color, alpha));
    },
  };
};

export default GradientBackground;