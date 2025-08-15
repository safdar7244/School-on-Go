import { GradientPalette } from './types';

export const lightGradients: GradientPalette = {
  primary: ['#6366f1', '#8b5cf6'],      // Indigo to purple
  secondary: ['#8b5cf6', '#06b6d4'],    // Purple to cyan
  success: ['#10b981', '#06b6d4'],      // Emerald to cyan
  warning: ['#f59e0b', '#ef4444'],      // Amber to red
  error: ['#ef4444', '#dc2626'],        // Red gradient
  info: ['#06b6d4', '#3b82f6'],         // Cyan to blue
};

export const darkGradients: GradientPalette = {
  primary: ['#818cf8', '#a78bfa'],      // Light indigo to light purple
  secondary: ['#a78bfa', '#22d3ee'],    // Light purple to light cyan
  success: ['#34d399', '#22d3ee'],      // Light emerald to light cyan
  warning: ['#fbbf24', '#f87171'],      // Light amber to light red
  error: ['#f87171', '#ef4444'],        // Light red gradient
  info: ['#22d3ee', '#60a5fa'],         // Light cyan to light blue
};