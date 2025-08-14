import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Input, Button } from '@rneui/themed';
import { useForm, Controller } from 'react-hook-form';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { AuthStackParamList, SignUpData } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { COLORS, SPACING, FONT_SIZES } from '../../constants';

type SignUpScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;

interface SignUpFormData {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignUpFormData>({
    mode: 'onChange',
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const watchPassword = watch('password');

  const onSubmit = async (data: SignUpFormData) => {
    if (isLoading) return;

    setIsLoading(true);
    
    try {
      const signUpData: SignUpData = {
        email: data.email,
        password: data.password,
        displayName: data.displayName,
      };

      const result = await signUp(signUpData);
      
      if (!result.success) {
        Alert.alert('Sign Up Failed', result.error || 'An unexpected error occurred');
      }
      // Success is handled by AuthProvider state change
    } catch {
      Alert.alert('Sign Up Failed', 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join the student community</Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="displayName"
            rules={{
              required: 'Display name is required',
              minLength: {
                value: 2,
                message: 'Display name must be at least 2 characters',
              },
              maxLength: {
                value: 50,
                message: 'Display name must be less than 50 characters',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Full Name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="words"
                leftIcon={{
                  name: 'person',
                  type: 'material',
                  color: COLORS.textSecondary,
                }}
                errorMessage={errors.displayName?.message}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                leftIcon={{
                  name: 'email',
                  type: 'material',
                  color: COLORS.textSecondary,
                }}
                errorMessage={errors.email?.message}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={!showPassword}
                leftIcon={{
                  name: 'lock',
                  type: 'material',
                  color: COLORS.textSecondary,
                }}
                rightIcon={{
                  name: showPassword ? 'visibility-off' : 'visibility',
                  type: 'material',
                  color: COLORS.textSecondary,
                  onPress: () => setShowPassword(!showPassword),
                }}
                errorMessage={errors.password?.message}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: 'Please confirm your password',
              validate: (value) =>
                value === watchPassword || 'Passwords do not match',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Confirm Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={!showConfirmPassword}
                leftIcon={{
                  name: 'lock',
                  type: 'material',
                  color: COLORS.textSecondary,
                }}
                rightIcon={{
                  name: showConfirmPassword ? 'visibility-off' : 'visibility',
                  type: 'material',
                  color: COLORS.textSecondary,
                  onPress: () => setShowConfirmPassword(!showConfirmPassword),
                }}
                errorMessage={errors.confirmPassword?.message}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
              />
            )}
          />

          <View style={styles.passwordRequirements}>
            <Text style={styles.requirementsTitle}>Password Requirements:</Text>
            <Text style={styles.requirementText}>• At least 6 characters</Text>
            <Text style={styles.requirementText}>• One uppercase letter</Text>
            <Text style={styles.requirementText}>• One lowercase letter</Text>
            <Text style={styles.requirementText}>• One number</Text>
          </View>

          <Button
            title="Create Account"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={!isValid || isLoading}
            buttonStyle={[
              styles.signUpButton,
              (!isValid || isLoading) && styles.disabledButton,
            ]}
            titleStyle={styles.signUpButtonText}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  form: {
    marginBottom: SPACING.xl,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
    paddingHorizontal: 0,
  },
  input: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  passwordRequirements: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.lg,
  },
  requirementsTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  requirementText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  signUpButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: SPACING.md,
  },
  disabledButton: {
    backgroundColor: COLORS.textSecondary,
  },
  signUpButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  signInText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default SignUpScreen;