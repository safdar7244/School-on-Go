export interface ColorPalette {
  // Brand Colors
  primary: string;
  secondary: string;
  accent: string;
  
  // Status Colors
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Surface Colors
  background: string;
  surface: string;
  surfaceSecondary: string;
  border: string;
  
  // Text Colors
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textWhite: string;
}

export interface GradientPalette {
  primary: string[];
  secondary: string[];
  success: string[];
  warning: string[];
  error: string[];
  info: string[];
}

export interface SpacingSystem {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface TypographySystem {
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  fontWeight: {
    light: '300';
    normal: '400';
    medium: '500';
    semibold: '600';
    bold: '700';
  };
}

export interface ComponentStyles {
  button: {
    borderRadius: number;
    paddingVertical: number;
    paddingHorizontal: number;
  };
  card: {
    borderRadius: number;
    padding: number;
    shadowOpacity: number;
    shadowRadius: number;
  };
  input: {
    borderRadius: number;
    paddingVertical: number;
    paddingHorizontal: number;
    borderWidth: number;
  };
}

export interface Theme {
  colors: ColorPalette;
  gradients: GradientPalette;
  spacing: SpacingSystem;
  typography: TypographySystem;
  components: ComponentStyles;
}

export interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}