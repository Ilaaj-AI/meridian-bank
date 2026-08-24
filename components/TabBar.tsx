import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, type } from '../theme/tokens';

export const TABS = [
  { name: 'index', label: 'Accounts', icon: 'home', lib: 'ion' },
  { name: 'transfer', label: 'Pay & Transfer', icon: 'cash-outline', lib: 'ion' },
  { name: 'rewards', label: 'Rewards', icon: 'trophy-outline', lib: 'ion' },
  { name: 'deposit', label: 'Deposit', icon: 'note-text-outline', lib: 'mc' },
  { name: 'more', label: 'More', icon: 'menu', lib: 'ion' },
] as const;

/**
 * Minimal shape of what the navigator hands its `tabBar` — React Navigation is
 * vendored inside expo-router in SDK 57, so we describe only what we use.
 */
export type BrandTabBarProps = {
  state: { index: number; routes: { key: string; name: string }[] };
  navigation: { navigate: (name: string) => void };
};

export function BrandTabBar({ state, navigation }: BrandTabBarProps) {
  const insets = useSafeAreaInsets();
  const activeName = state.routes[state.index]?.name ?? 'index';

  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom + 6 }]}>
      {TABS.map((tab) => {
        const active = tab.name === activeName;
        const color = active ? colors.onBrand : colors.onBrandMuted;
        return (
          <Pressable
            key={tab.name}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.name)}
          >
            {tab.lib === 'mc' ? (
              <MaterialCommunityIcons name={tab.icon as any} size={22} color={color} />
            ) : (
              <Ionicons name={tab.icon as any} size={22} color={color} />
            )}
            <Text style={[styles.label, active && styles.labelActive]} numberOfLines={1}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.brand,
    paddingTop: 9,
  },
  tab: { flex: 1, alignItems: 'center', gap: 3, paddingBottom: 4, paddingHorizontal: 2 },
  label: { ...type.caption, color: colors.onBrandMuted, textAlign: 'center' },
  labelActive: { color: colors.onBrand, fontWeight: '700' },
});
