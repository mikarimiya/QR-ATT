import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';

type Props = { title: string };

export default function Header({ title }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.logoOuter}>
        <View style={styles.logoCircle}>
          <MaterialIcons
            name="qr-code-scanner"
            size={32}
            color={COLORS.card}
          />
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.titleAccent}>
        <View style={styles.accentDot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 18,
    width: '100%',
  },

  logoOuter: {
    width: 78,
    height: 78,
    borderRadius: 39,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
    marginBottom: 14,
  },

  logoCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.accent,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },

  title: {
    fontSize: 25,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textAlign: 'center',
    letterSpacing: 0.2,
  },

  titleAccent: {
    width: 42,
    height: 4,
    borderRadius: 4,
    backgroundColor: COLORS.accent,
    marginTop: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  accentDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.secondary,
  },
});

