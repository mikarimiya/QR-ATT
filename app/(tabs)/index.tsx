import { router } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import AppButton from '@/components/AppButton';
import Header from '@/components/Header';
import { COLORS } from '@/constants/colors';

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
  <View style={styles.headerContainer}>
    <Header title="QR Attendance" />
    <Text style={styles.byline}>by: Micah G. Manijas</Text>
  </View>

  <View style={styles.bodyContainer}>
    <Text style={styles.mainTitle}>School Event Attendance</Text>
    <Text style={styles.subtitle}>
      Scan QR Codes to record attendance during school activities.
    </Text>
  </View>
</View>

      <View style={styles.footerContainer}>
        <AppButton
          theme="primary"
          title="Scan QR Code"
          icon="qr-code-outline"
          onPress={() => router.push('/scan')}
        />
        <AppButton
          title="Attendance History"
          icon="time-outline"
          onPress={() => router.push('/history')}
        />
        <AppButton
          title="Profile"
          icon="person-outline"
          onPress={() => router.push('/profile')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  mainContent: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 24,
  },

  headerContainer: {
    alignItems: 'flex-start',
    marginBottom: 48,
  },

  byline: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  bodyContainer: {
    alignItems: 'flex-start',
  },

  mainTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 6,
    textAlign: 'left',
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 21,
    color: COLORS.textSecondary,
    textAlign: 'left',
  },

  footerContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 8,
    width: '100%',
  },
});