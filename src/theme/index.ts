import { Theme } from './types';
import { lightColors, darkColors } from './colors';
import { lightGradients, darkGradients } from './gradients';
import { spacing } from './spacing';
import { typography } from './typography';
import { components } from './components';

export const lightTheme: Theme = {
  colors: lightColors,
  gradients: lightGradients,
  spacing,
  typography,
  components,
};

export const darkTheme: Theme = {
  colors: darkColors,
  gradients: darkGradients,
  spacing,
  typography,
  components,
};

// Export individual modules for direct access if needed
export * from './types';
export * from './colors';
export * from './gradients';
export * from './spacing';
export * from './typography';
export * from './components';