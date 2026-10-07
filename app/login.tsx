import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '@/components/AppButton';
import Header from '@/components/Header';
import { COLORS } from '@/constants/colors';
import { signIn } from '@/lib/auth';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const { data, error: authError } = await signIn(email.trim(), password);

      if (authError) {
        setError(authError.message);
      } else {
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      setError(err?.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.headerContainer}>
              <Header title="QR Attendance" />
            </View>

            <View style={styles.welcomeSection}>
              <View style={styles.welcomeBadge}>
                <Text style={styles.welcomeBadgeText}>
                  WELCOME BACK
                </Text>
              </View>

              <Text style={styles.title}>Welcome Back</Text>

              <Text style={styles.subtitle}>
                Sign in to record your attendance
              </Text>
            </View>

            <View style={styles.formCard}>
              <View style={styles.formHeader}>
                <Text style={styles.formTitle}>Sign In</Text>

                <Text style={styles.formSubtitle}>
                  Enter your account details below
                </Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>EMAIL ADDRESS</Text>

                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="your.email@school.edu"
                  placeholderTextColor={COLORS.textSecondary}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  editable={!loading}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>PASSWORD</Text>

                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.textSecondary}
                  secureTextEntry
                  editable={!loading}
                />
              </View>

              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorTitle}>
                    Sign in failed
                  </Text>

                  <Text style={styles.error}>
                    {error}
                  </Text>
                </View>
              )}

              {loading ? (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator
                    size="large"
                    color={COLORS.primary}
                  />

                  <Text style={styles.loaderText}>
                    Signing you in...
                  </Text>
                </View>
              ) : (
                <View style={styles.buttonContainer}>
                  <AppButton
                    theme="primary"
                    title="Sign In"
                    icon="log-in-outline"
                    onPress={handleLogin}
                  />
                </View>
              )}
            </View>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>
                Don't have an account?
              </Text>

              <Link href="/register" style={styles.link}>
                Sign Up
              </Link>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },

  headerContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },

  welcomeSection: {
    marginBottom: 20,
  },

  welcomeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },

  welcomeBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    color: COLORS.card,
  },

  title: {
    fontSize: 29,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.textSecondary,
  },

  formCard: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 4,
  },

  formHeader: {
    marginBottom: 20,
  },

  formTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },

  formSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  inputGroup: {
    marginBottom: 15,
  },

  label: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.9,
    color: COLORS.textPrimary,
    marginBottom: 7,
  },

  input: {
    backgroundColor: COLORS.background,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  errorContainer: {
    backgroundColor: '#F3E1DD',
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: 13,
    padding: 12,
    marginBottom: 8,
  },

  errorTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.danger,
    marginBottom: 3,
  },

  error: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.danger,
  },

  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },

  loaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 8,
  },

  buttonContainer: {
    marginTop: 4,
  },

  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  signupText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginRight: 5,
  },

  link: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '800',
  },
});

