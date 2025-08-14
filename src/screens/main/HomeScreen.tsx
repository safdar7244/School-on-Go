import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { FeatureCard, UserProfile } from '../../components';
import { COLORS, SPACING } from '../../constants';

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
    icon: 'chatbubbles-outline',
    screen: 'Chat',
    backgroundColor: '#E3F2FD',
    iconColor: '#1976D2',
  },
  {
    id: 'faculty',
    title: 'Faculty',
    icon: 'people-outline',
    screen: 'Faculty',
    backgroundColor: '#F3E5F5',
    iconColor: '#7B1FA2',
  },
  {
    id: 'library',
    title: 'Library',
    icon: 'library-outline',
    screen: 'Library',
    backgroundColor: '#E8F5E8',
    iconColor: '#388E3C',
  },
  {
    id: 'studylinks',
    title: 'Study Links',
    icon: 'link-outline',
    screen: 'StudyLinks',
    backgroundColor: '#FFF3E0',
    iconColor: '#F57C00',
  },
  {
    id: 'timetable',
    title: 'Timetable',
    icon: 'calendar-outline',
    screen: 'Timetable',
    backgroundColor: '#FFEBEE',
    iconColor: '#D32F2F',
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
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <UserProfile />
      
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
          {renderFeatureGrid()}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    paddingTop: SPACING.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  placeholder: {
    width: (width - SPACING.lg * 3) / 2,
  },
});

export default HomeScreen;