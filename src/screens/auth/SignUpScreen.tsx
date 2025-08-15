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
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Input, Button } from '@rneui/themed';
import { useForm, Controller } from 'react-hook-form';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <KeyboardAvoidingView
        style={[styles.keyboardContainer, { paddingTop: insets.top }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={['#ffffff', '#f8f9fa']}
                style={styles.logoCircle}
              >
                <Ionicons name="person-add" size={40} color="#667eea" />
              </LinearGradient>
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join our student community</Text>
          </View>

          <View style={styles.formContainer}>
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
                      color: COLORS.primary,
                    }}
                    errorMessage={errors.displayName?.message}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    containerStyle={styles.inputWrapper}
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
                      color: COLORS.primary,
                    }}
                    errorMessage={errors.email?.message}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    containerStyle={styles.inputWrapper}
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
                      color: COLORS.primary,
                    }}
                    rightIcon={{
                      name: showPassword ? 'visibility-off' : 'visibility',
                      type: 'material',
                      color: COLORS.primary,
                      onPress: () => setShowPassword(!showPassword),
                    }}
                    errorMessage={errors.password?.message}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    containerStyle={styles.inputWrapper}
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
                      color: COLORS.primary,
                    }}
                    rightIcon={{
                      name: showConfirmPassword ? 'visibility-off' : 'visibility',
                      type: 'material',
                      color: COLORS.primary,
                      onPress: () => setShowConfirmPassword(!showConfirmPassword),
                    }}
                    errorMessage={errors.confirmPassword?.message}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    containerStyle={styles.inputWrapper}
                  />
                )}
              />

              {/* <View style={styles.passwordRequirements}>
                <Text style={styles.requirementsTitle}>Password Requirements:</Text>
                <Text style={styles.requirementText}>• At least 6 characters</Text>
                <Text style={styles.requirementText}>• One uppercase letter</Text>
                <Text style={styles.requirementText}>• One lowercase letter</Text>
                <Text style={styles.requirementText}>• One number</Text>
              </View> */}

              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid || isLoading}
              >
                <LinearGradient
                  colors={['#43e97b', '#38f9d7']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.signUpButtonText}>
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  logoContainer: {
    marginBottom: SPACING.lg,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT_SIZES.lg,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  form: {
    marginBottom: SPACING.lg,
  },
  inputWrapper: {
    marginBottom: SPACING.sm,
  },
  inputContainer: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.surface,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
  input: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  passwordRequirements: {
    backgroundColor: '#f8f9fa',
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  requirementsTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  requirementText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginBottom: 2,
    paddingLeft: SPACING.sm,
  },
  signUpButton: {
    borderRadius: 12,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    borderRadius: 12,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButtonText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.white,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: FONT_SIZES.md,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  signInText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.white,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;