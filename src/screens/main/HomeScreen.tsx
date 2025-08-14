import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Dimensions,
  StatusBar,
  Text,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { FeatureCard, UserProfile } from '../../components';
import { COLORS, SPACING, FONT_SIZES } from '../../constants';

type RootStackParamList = {
  Chat: undefined;
  Faculty: undefined;
  Library: undefined;
  StudyLinks: undefined;
  Timetable: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

interface FeatureItem {
  id: string;
  title: string;
  icon: any;
  screen: keyof RootStackParamList;
  backgroundColor: string;
  iconColor: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'chat',
    title: 'Chat',
    icon: 'chatbubbles',
    screen: 'Chat',
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    iconColor: '#FFFFFF',
  },
  {
    id: 'faculty',
    title: 'Faculty',
    icon: 'people',
    screen: 'Faculty',
    backgroundColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    iconColor: '#FFFFFF',
  },
  {
    id: 'library',
    title: 'Library',
    icon: 'library',
    screen: 'Library',
    backgroundColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    iconColor: '#FFFFFF',
  },
  {
    id: 'studylinks',
    title: 'Study Links',
    icon: 'link',
    screen: 'StudyLinks',
    backgroundColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    iconColor: '#FFFFFF',
  },
  {
    id: 'timetable',
    title: 'Timetable',
    icon: 'calendar',
    screen: 'Timetable',
    backgroundColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    iconColor: '#FFFFFF',
  },
];

const HomeScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleFeaturePress = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  const renderFeatureGrid = () => {
    const rows = [];
    for (let i = 0; i < FEATURES.length; i += 2) {
      const rowFeatures = FEATURES.slice(i, i + 2);
      rows.push(
        <View key={i} style={styles.row}>
          {rowFeatures.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              icon={feature.icon}
              onPress={() => handleFeaturePress(feature.screen)}
              backgroundColor={feature.backgroundColor}
              iconColor={feature.iconColor}
            />
          ))}
          {rowFeatures.length === 1 && <View style={styles.placeholder} />}
        </View>
      );
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <View style={{ paddingTop: insets.top, backgroundColor: '#667eea' }}>
        <UserProfile />
      </View>

      <LinearGradient
        colors={['#f8f9fa', '#e9ecef']}
        style={styles.backgroundGradient}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Quick Access</Text>
            {renderFeatureGrid()}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backgroundGradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: SPACING.xl,
  },
  featuresContainer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  placeholder: {
    width: (width - SPACING.lg * 3) / 2,
  },
});

export default HomeScreen;