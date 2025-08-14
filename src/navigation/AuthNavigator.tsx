import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthStackParamList } from '../types';
import { COLORS } from '../constants';

// TODO: Import actual screen components
const LoginScreen = () => null;
const SignUpScreen = () => null;

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
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
        name="Login"
        component={LoginScreen}
        options={{ title: 'Log In' }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: 'Sign Up' }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
