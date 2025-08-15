import { ColorPalette } from './types';

export const lightColors: ColorPalette = {
  // Brand Colors - Modern indigo/purple/cyan scheme
  primary: '#6366f1',     // Modern indigo
  secondary: '#8b5cf6',   // Vibrant purple
  accent: '#06b6d4',      // Bright cyan
  
  // Status Colors
  success: '#10b981',     // Emerald green
  warning: '#f59e0b',     // Amber
  error: '#ef4444',       // Red
  info: '#3b82f6',        // Blue
  
  // Surface Colors
  background: '#ffffff',
  surface: '#f8fafc',
  surfaceSecondary: '#f1f5f9',
  border: '#e2e8f0',
  
  // Text Colors
  textPrimary: '#0f172a',
  textSecondary: '#64748b',
  textMuted: '#94a3b8',
  textWhite: '#ffffff',
};

export const darkColors: ColorPalette = {
  // Brand Colors - Adjusted for dark mode
  primary: '#818cf8',     // Lighter indigo for dark backgrounds
  secondary: '#a78bfa',   // Lighter purple for dark backgrounds
  accent: '#22d3ee',      // Lighter cyan for dark backgrounds
  
  // Status Colors
  success: '#34d399',     // Lighter emerald green
  warning: '#fbbf24',     // Lighter amber
  error: '#f87171',       // Lighter red
  info: '#60a5fa',        // Lighter blue
  
  // Surface Colors
  background: '#0f172a',
  surface: '#1e293b',
  surfaceSecondary: '#334155',
  border: '#475569',
  
  // Text Colors
  textPrimary: '#f8fafc',
  textSecondary: '#cbd5e1',
  textMuted: '#94a3b8',
  textWhite: '#ffffff',
};