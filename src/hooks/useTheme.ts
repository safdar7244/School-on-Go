import { useMemo } from 'react';
import { useThemeContext } from '../contexts/ThemeProvider';
import { Theme, ColorPalette } from '../theme/types';

// Color utility functions
export const colorUtils = {
  /**
   * Calculate the luminance of a color to determine if it's light or dark
   * @param color - Hex color string (e.g., '#ffffff')
   * @returns number between 0 and 1 (0 = black, 1 = white)
   */
  getLuminance: (color: string): number => {
    // Remove # if present
    const hex = color.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    // Apply gamma correction
    const rLinear = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gLinear = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const bLinear = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    // Calculate luminance
    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
  },

  /**
   * Determine if a color is considered light or dark
   * @param color - Hex color string
   * @returns boolean - true if light, false if dark
   */
  isLightColor: (color: string): boolean => {
    return colorUtils.getLuminance(color) > 0.5;
  },

  /**
   * Get contrasting text color (black or white) for a given background color
   * @param backgroundColor - Hex color string
   * @returns string - '#000000' or '#ffffff'
   */
  getContrastingTextColor: (backgroundColor: string): string => {
    return colorUtils.isLightColor(backgroundColor) ? '#000000' : '#ffffff';
  },

  /**
   * Calculate contrast ratio between two colors
   * @param color1 - First hex color string
   * @param color2 - Second hex color string
   * @returns number - Contrast ratio (1-21)
   */
  getContrastRatio: (color1: string, color2: string): number => {
    const lum1 = colorUtils.getLuminance(color1);
    const lum2 = colorUtils.getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  },

  /**
   * Check if color combination meets WCAG AA accessibility standards
   * @param textColor - Text color hex string
   * @param backgroundColor - Background color hex string
   * @returns boolean - true if accessible
   */
  isAccessible: (textColor: string, backgroundColor: string): boolean => {
    const contrastRatio = colorUtils.getContrastRatio(textColor, backgroundColor);
    return contrastRatio >= 4.5; // WCAG AA standard for normal text
  },

  /**
   * Add alpha transparency to a hex color
   * @param color - Hex color string
   * @param alpha - Alpha value (0-1)
   * @returns string - Hex color with alpha
   */
  addAlpha: (color: string, alpha: number): string => {
    const hex = color.replace('#', '');
    const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
    return `#${hex}${alphaHex}`;
  },

  /**
   * Lighten a color by a percentage
   * @param color - Hex color string
   * @param percent - Percentage to lighten (0-100)
   * @returns string - Lightened hex color
   */
  lighten: (color: string, percent: number): string => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const factor = percent / 100;
    const newR = Math.round(r + (255 - r) * factor);
    const newG = Math.round(g + (255 - g) * factor);
    const newB = Math.round(b + (255 - b) * factor);
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  },

  /**
   * Darken a color by a percentage
   * @param color - Hex color string
   * @param percent - Percentage to darken (0-100)
   * @returns string - Darkened hex color
   */
  darken: (color: string, percent: number): string => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const factor = 1 - (percent / 100);
    const newR = Math.round(r * factor);
    const newG = Math.round(g * factor);
    const newB = Math.round(b * factor);
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  },
};

// Theme-specific utilities
export interface ThemeUtilities {
  /**
   * Get the appropriate status bar style for the current theme
   * @param backgroundColor - Optional background color to consider
   * @returns 'light-content' | 'dark-content'
   */
  getStatusBarStyle: (backgroundColor?: string) => 'light-content' | 'dark-content';
  
  /**
   * Get surface color with elevation (for cards, modals, etc.)
   * @param elevation - Elevation level (0-5)
   * @returns string - Hex color
   */
  getSurfaceColor: (elevation?: number) => string;
  
  /**
   * Get text color for a given background
   * @param backgroundColor - Background color hex string
   * @returns string - Appropriate text color from theme
   */
  getTextColorForBackground: (backgroundColor: string) => string;
  
  /**
   * Get shadow configuration for current theme
   * @param elevation - Shadow elevation (0-5)
   * @returns object - Shadow style configuration
   */
  getShadowStyle: (elevation?: number) => {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
}

/**
 * Enhanced useTheme hook with dark mode utilities and color calculations
 * @returns Enhanced theme context with utilities
 */
export const useTheme = () => {
  const { theme, isDark, toggleTheme } = useThemeContext();
  
  // Memoized utilities to prevent unnecessary recalculations
  const utilities: ThemeUtilities = useMemo(() => ({
    getStatusBarStyle: (backgroundColor?: string) => {
      if (backgroundColor) {
        return colorUtils.isLightColor(backgroundColor) ? 'dark-content' : 'light-content';
      }
      return isDark ? 'light-content' : 'dark-content';
    },
    
    getSurfaceColor: (elevation = 0) => {
      if (elevation === 0) return theme.colors.surface;
      
      // In dark mode, elevated surfaces get lighter
      // In light mode, elevated surfaces get slightly darker shadows but keep base color
      if (isDark) {
        const elevationPercent = Math.min(elevation * 2, 10); // Max 10% lighter
        return colorUtils.lighten(theme.colors.surface, elevationPercent);
      } else {
        return theme.colors.surface;
      }
    },
    
    getTextColorForBackground: (backgroundColor: string) => {
      const isLight = colorUtils.isLightColor(backgroundColor);
      return isLight ? theme.colors.textPrimary : theme.colors.textWhite;
    },
    
    getShadowStyle: (elevation = 1) => {
      const shadowIntensity = Math.min(elevation / 5, 1); // Normalize to 0-1
      
      return {
        shadowColor: isDark ? '#000000' : '#000000',
        shadowOffset: {
          width: 0,
          height: elevation,
        },
        shadowOpacity: isDark ? 0.3 * shadowIntensity : 0.1 * shadowIntensity,
        shadowRadius: elevation * 2,
        elevation: elevation * 2, // Android elevation
      };
    },
  }), [theme, isDark]);
  
  // Enhanced return object with all theme data and utilities
  return {
    // Core theme data
    theme,
    isDark,
    toggleTheme,
    
    // Quick access to theme parts
    colors: theme.colors,
    gradients: theme.gradients,
    spacing: theme.spacing,
    typography: theme.typography,
    components: theme.components,
    
    // Utilities
    utils: utilities,
    colorUtils,
    
    // Convenience methods
    isLight: !isDark,
    currentMode: isDark ? 'dark' : 'light' as const,
  };
};

// Export default hook
export default useTheme;