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

import { AuthStackParamList } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { COLORS, SPACING, FONT_SIZES } from '../../constants';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

interface LoginFormData {
    email: string;
    password: string;
}

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const { signIn } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginFormData>({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            const result = await signIn(data);

            console.log('Login Result:', result);

            if (!result.success) {
                Alert.alert('Login Failed', result.error || 'An unexpected error occurred');
            }
            // Success is handled by AuthProvider state change
        } catch {
            Alert.alert('Login Failed', 'An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = () => {
        // TODO: Implement forgot password functionality
        Alert.alert('Forgot Password', 'This feature will be implemented soon.');
    };

    const handleSignUp = () => {
        navigation.navigate('SignUp');
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
                                <Ionicons name="school" size={40} color="#667eea" />
                            </LinearGradient>
                        </View>
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>Sign in to continue your journey</Text>
                    </View>

                    <View style={styles.formContainer}>

                        <View style={styles.form}>
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

                    <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.signInButton}
                                onPress={handleSubmit(onSubmit)}
                                disabled={!isValid || isLoading}
                            >
                                <LinearGradient
                                    colors={['#43e97b', '#38f9d7']}
                                    style={styles.buttonGradient}
                                >
                                    <Text style={styles.signInButtonText}>
                                        {isLoading ? 'Signing In...' : 'Sign In'}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={handleSignUp}>
                            <Text style={styles.signUpText}>Sign Up</Text>
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
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: SPACING.lg,
        marginTop: SPACING.sm,
    },
    forgotPasswordText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.primary,
        fontWeight: '600',
    },
    signInButton: {
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
    signInButtonText: {
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
    signUpText: {
        fontSize: FONT_SIZES.md,
        color: COLORS.white,
        fontWeight: '700',
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;