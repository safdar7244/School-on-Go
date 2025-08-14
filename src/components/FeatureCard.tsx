import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES } from '../constants';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - SPACING.lg * 3) / 2;

interface FeatureCardProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  backgroundColor?: string;
  iconColor?: string;
}

// Gradient color mappings
const GRADIENT_COLORS: { [key: string]: string[] } = {
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)': ['#667eea', '#764ba2'],
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)': ['#f093fb', '#f5576c'],
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)': ['#4facfe', '#00f2fe'],
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)': ['#43e97b', '#38f9d7'],
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)': ['#fa709a', '#fee140'],
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  icon,
  onPress,
  backgroundColor = COLORS.surface,
  iconColor = COLORS.primary,
}) => {
  const gradientColors = GRADIENT_COLORS[backgroundColor] || [backgroundColor, backgroundColor];

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={36} color={iconColor} />
        </View>
        <Text style={[styles.title, { color: iconColor }]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 0.9,
    marginBottom: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    padding: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: SPACING.md,
    padding: SPACING.sm,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: FONT_SIZES.md * 1.3,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default FeatureCard;