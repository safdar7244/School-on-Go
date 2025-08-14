import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainStackParamList } from '../types';
import { COLORS } from '../constants';

// TODO: Import actual screen components
const HomeScreen = () => null;
const ChatScreen = () => null;
const FacultyScreen = () => null;
const LibraryScreen = () => null;
const StudyLinksScreen = () => null;
const TimetableScreen = () => null;

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTitleStyle: {
          color: COLORS.white,
        },
        headerTintColor: COLORS.white,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ title: 'Chat' }}
      />
      <Stack.Screen
        name="Faculty"
        component={FacultyScreen}
        options={{ title: 'Faculty' }}
      />
      <Stack.Screen
        name="Library"
        component={LibraryScreen}
        options={{ title: 'Library' }}
      />
      <Stack.Screen
        name="StudyLinks"
        component={StudyLinksScreen}
        options={{ title: 'Study Links' }}
      />
      <Stack.Screen
        name="Timetable"
        component={TimetableScreen}
        options={{ title: 'Timetable' }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
