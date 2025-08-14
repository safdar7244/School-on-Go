import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

import { MainStackParamList } from '../types';
import { COLORS, FONT_SIZES } from '../constants';
import {
  HomeScreen,
  ChatScreen,
  FacultyScreen,
  LibraryScreen,
  StudyLinksScreen,
  TimetableScreen,
} from '../screens/main';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator: React.FC = () => {
  // Common header options for consistency
  const getHeaderOptions = (title: string) => ({
    title,
    headerStyle: {
      backgroundColor: COLORS.primary,
      ...(Platform.OS === 'android' && { elevation: 4 }),
      ...(Platform.OS === 'ios' && { 
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      }),
    },
    headerTitleStyle: {
      color: COLORS.white,
      fontSize: FONT_SIZES.lg,
      fontWeight: '600' as const,
    },
    headerTintColor: COLORS.white,
    animation: 'slide_from_right' as const,
    animationDuration: 300,
    gestureEnabled: true,
    gestureDirection: 'horizontal' as const,
    ...Platform.select({
      ios: {
        headerLargeTitle: false,
      },
      android: {
        headerTitleAlign: 'center' as const,
      },
    }),
  });

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_right',
        animationDuration: 300,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={getHeaderOptions('Chat')}
      />
      <Stack.Screen
        name="Faculty"
        component={FacultyScreen}
        options={getHeaderOptions('Faculty Directory')}
      />
      <Stack.Screen
        name="Library"
        component={LibraryScreen}
        options={getHeaderOptions('Study Resources')}
      />
      <Stack.Screen
        name="StudyLinks"
        component={StudyLinksScreen}
        options={getHeaderOptions('Academic Links')}
      />
      <Stack.Screen
        name="Timetable"
        component={TimetableScreen}
        options={getHeaderOptions('Class Schedule')}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
