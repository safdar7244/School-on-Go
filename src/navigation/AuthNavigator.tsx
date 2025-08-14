import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

import { AuthStackParamList } from '../types';
import { COLORS, FONT_SIZES } from '../constants';
import { LoginScreen, SignUpScreen } from '../screens/auth';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
          ...(Platform.OS === 'android' && { elevation: 0 }),
          ...(Platform.OS === 'ios' && { shadowOpacity: 0 }),
        },
        headerTitleStyle: {
          color: COLORS.white,
          fontSize: FONT_SIZES.lg,
          fontWeight: '600',
        },
        headerTintColor: COLORS.white,
        animation: 'slide_from_right',
        animationDuration: 300,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        ...Platform.select({
          ios: {
            headerLargeTitle: false,
          },
          android: {
            headerTitleAlign: 'center',
          },
        }),
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ 
          title: 'Welcome Back',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ 
          title: 'Create Account',
          headerShown: true,
          presentation: 'card',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
