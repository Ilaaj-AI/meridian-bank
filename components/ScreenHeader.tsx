import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, type } from '../theme/tokens';

/**
 * Brand-coloured title bar for pushed screens: back arrow, title, optional
 * right-hand action.
 */
export function ScreenHeader({
  title,
  subtitle,
  right,
  onBack,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onBack?: () => void;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
      <View style={styles.row}>
        <Pressable
          hitSlop={12}
          onPress={onBack ?? (() => router.back())}
          style={styles.back}
        >
          <Ionicons name="arrow-back" size={24} color={colors.onBrand} />
        </Pressable>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.rightSlot}>{right}</View>
      </View>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.brand,
    paddingHorizontal: 14,
    paddingBottom: 16,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  back: { width: 28 },
  title: { flex: 1, ...type.sectionTitle, fontSize: 19, color: colors.onBrand },
  rightSlot: { minWidth: 28, alignItems: 'flex-end' },
  subtitle: {
    ...type.caption,
    color: colors.onBrandMuted,
    marginTop: 6,
    marginLeft: 40,
  },
});
