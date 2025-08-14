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
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Sign in to your account</Text>
                </View>

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

                    <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <Button
                        title="Sign In"
                        onPress={handleSubmit(onSubmit)}
                        loading={isLoading}
                        disabled={!isValid || isLoading}
                        buttonStyle={[
                            styles.signInButton,
                            (!isValid || isLoading) && styles.disabledButton,
                        ]}
                        titleStyle={styles.signInButtonText}
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={handleSignUp}>
                        <Text style={styles.signUpText}>Sign Up</Text>
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
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: SPACING.lg,
        marginTop: -SPACING.sm,
    },
    forgotPasswordText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.primary,
    },
    signInButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        paddingVertical: SPACING.md,
    },
    disabledButton: {
        backgroundColor: COLORS.textSecondary,
    },
    signInButtonText: {
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
    signUpText: {
        fontSize: FONT_SIZES.md,
        color: COLORS.primary,
        fontWeight: '600',
    },
});

export default LoginScreen;