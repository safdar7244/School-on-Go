import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';
import StatusBarManager, { StatusBarManagerProps } from './StatusBarManager';

export interface ScreenContainerProps {
  /**
   * Background variant for the screen
   * - 'default': Uses theme background color
   * - 'surface': Uses theme surface color
   * - 'gradient': Uses gradient background
   * - 'primary': Uses primary color background
   * - 'custom': Uses custom backgroundColor prop
   */
  variant?: 'default' | 'surface' | 'gradient' | 'primary' | 'custom';
  
  /**
   * Gradient variant when using 'gradient' background
   */
  gradientVariant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  
  /**
   * Custom background color (used with 'custom' variant)
   */
  backgroundColor?: string;
  
  /**
   * Custom gradient colors (overrides gradientVariant)
   */
  gradientColors?: string[];
  
  /**
   * Status bar configuration
   */
  statusBar?: {
    variant?: StatusBarManagerProps['variant'];
    contentStyle?: StatusBarManagerProps['contentStyle'];
    hidden?: boolean;
  };
  
  /**
   * Whether to use SafeAreaView
   */
  useSafeArea?: boolean;
  
  /**
   * Safe area edges to apply
   */
  safeAreaEdges?: ('top' | 'bottom' | 'left' | 'right')[];
  
  /**
   * Additional styles for the container
   */
  style?: ViewStyle;
  
  /**
   * Additional styles for the content area
   */
  contentStyle?: ViewStyle;
  
  /**
   * Whether to add default padding
   */
  padded?: boolean;
  
  /**
   * Custom padding amount (overrides default)
   */
  padding?: number;
  
  /**
   * Whether the container should flex to fill available space
   */
  flex?: boolean;
  
  /**
   * Children components
   */
  children: React.ReactNode;
}

/**
 * ScreenContainer component that provides consistent screen layouts
 * with integrated status bar management and theme support.
 * 
 * Features:
 * - Multiple background variants (solid, gradient, surface)
 * - Integrated StatusBarManager for seamless status bar styling
 * - Safe area handling with customizable edges
 * - Theme-aware styling with dark mode support
 * - Flexible padding and layout options
 * - Performance optimized gradient rendering
 */
export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  variant = 'default',
  gradientVariant = 'primary',
  backgroundColor,
  gradientColors,
  statusBar = {},
  useSafeArea = true,
  safeAreaEdges = ['top', 'bottom'],
  style,
  contentStyle,
  padded = false,
  padding,
  flex = true,
  children,
}) => {
  const { theme, utils } = useTheme();
  
  // Get background configuration based on variant
  const getBackgroundConfig = () => {
    switch (variant) {
      case 'surface':
        return {
          type: 'solid' as const,
          color: theme.colors.surface,
        };
      case 'primary':
        return {
          type: 'solid' as const,
          color: theme.colors.primary,
        };
      case 'gradient':
        return {
          type: 'gradient' as const,
          colors: gradientColors || theme.gradients[gradientVariant],
        };
      case 'custom':
        return {
          type: 'solid' as const,
          color: backgroundColor || theme.colors.background,
        };
      case 'default':
      default:
        return {
          type: 'solid' as const,
          color: theme.colors.background,
        };
    }
  };
  
  const backgroundConfig = getBackgroundConfig();
  
  // Determine status bar configuration
  const getStatusBarConfig = (): StatusBarManagerProps => {
    const baseConfig = {
      variant: statusBar.variant || (backgroundConfig.type === 'gradient' ? 'gradient' : 'auto'),
      contentStyle: statusBar.contentStyle,
      hidden: statusBar.hidden || false,
      animated: true,
    };
    
    if (backgroundConfig.type === 'gradient') {
      return {
        ...baseConfig,
        gradientColors: backgroundConfig.colors,
      };
    } else {
      return {
        ...baseConfig,
        backgroundColor: backgroundConfig.color,
      };
    }
  };
  
  // Get container styles
  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flex: flex ? 1 : undefined,
    };
    
    if (backgroundConfig.type === 'solid') {
      baseStyle.backgroundColor = backgroundConfig.color;
    }
    
    return StyleSheet.flatten([baseStyle, style]);
  };
  
  // Get content styles
  const getContentStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flex: flex ? 1 : undefined,
    };
    
    // Add padding if requested
    if (padded || padding !== undefined) {
      const paddingValue = padding !== undefined ? padding : theme.spacing.md;
      baseStyle.padding = paddingValue;
    }
    
    return StyleSheet.flatten([baseStyle, contentStyle]);
  };
  
  // Render background component
  const renderBackground = () => {
    if (backgroundConfig.type === 'gradient') {
      return (
        <LinearGradient
          colors={backgroundConfig.colors}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      );
    }
    return null;
  };
  
  // Choose container component based on safe area usage
  const ContainerComponent = useSafeArea ? SafeAreaView : View;
  const containerProps = useSafeArea 
    ? { edges: safeAreaEdges }
    : {};
  
  return (
    <>
      {/* Status Bar Manager */}
      <StatusBarManager {...getStatusBarConfig()} />
      
      {/* Main Container */}
      <ContainerComponent
        style={getContainerStyle()}
        {...containerProps}
      >
        {/* Background (for gradients) */}
        {renderBackground()}
        
        {/* Content Area */}
        <View style={getContentStyle()}>
          {children}
        </View>
      </ContainerComponent>
    </>
  );
};

/**
 * Preset screen container variants for common use cases
 */
export const ScreenVariants = {
  /**
   * Default screen with theme background
   */
  Default: (props: Omit<ScreenContainerProps, 'variant'>) => (
    <ScreenContainer variant="default" {...props} />
  ),
  
  /**
   * Surface screen with elevated background
   */
  Surface: (props: Omit<ScreenContainerProps, 'variant'>) => (
    <ScreenContainer variant="surface" {...props} />
  ),
  
  /**
   * Primary gradient screen
   */
  PrimaryGradient: (props: Omit<ScreenContainerProps, 'variant' | 'gradientVariant'>) => (
    <ScreenContainer variant="gradient" gradientVariant="primary" {...props} />
  ),
  
  /**
   * Success gradient screen
   */
  SuccessGradient: (props: Omit<ScreenContainerProps, 'variant' | 'gradientVariant'>) => (
    <ScreenContainer variant="gradient" gradientVariant="success" {...props} />
  ),
  
  /**
   * Auth screen with primary gradient and no bottom safe area
   */
  Auth: (props: Omit<ScreenContainerProps, 'variant' | 'gradientVariant' | 'safeAreaEdges'>) => (
    <ScreenContainer 
      variant="gradient" 
      gradientVariant="primary" 
      safeAreaEdges={['top']}
      {...props} 
    />
  ),
};

export default ScreenContainer;