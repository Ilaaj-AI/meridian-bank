import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Card, Divider, NavRow } from '../components/ui';
import { accounts, money, profile } from '../data/accounts';
import { colors, radius, type } from '../theme/tokens';

const SECTIONS: {
  title: string;
  rows: { icon: React.ComponentProps<typeof Ionicons>['name']; label: string }[];
}[] = [
  {
    title: 'Personal',
    rows: [
      { icon: 'person-outline', label: 'Personal Details' },
      { icon: 'call-outline', label: 'Contact Information' },
      { icon: 'location-outline', label: 'Mailing Address' },
    ],
  },
  {
    title: 'Security',
    rows: [
      { icon: 'lock-closed-outline', label: 'Change Passcode' },
      { icon: 'finger-print-outline', label: 'Biometric Sign On' },
      { icon: 'shield-checkmark-outline', label: 'Security Alerts' },
    ],
  },
  {
    title: 'Preferences',
    rows: [
      { icon: 'notifications-outline', label: 'Notifications' },
      { icon: 'language-outline', label: 'Language' },
      { icon: 'document-text-outline', label: 'Statements & Documents' },
    ],
  },
];

export function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerTop}>
          <Pressable hitSlop={12} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.onBrand} />
          </Pressable>
          <Text style={styles.headerTitle}>Profile</Text>
          <Pressable hitSlop={12}>
            <Ionicons name="create-outline" size={22} color={colors.onBrand} />
          </Pressable>
        </View>

        <View style={styles.identity}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{profile.initials}</Text>
          </View>
          <Text style={styles.name}>{profile.fullName}</Text>
          <Text style={styles.meta}>{profile.tier}</Text>
          <Text style={styles.meta}>{profile.memberSince}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSpill} />

        <Card style={styles.contactCard}>
          <View style={styles.contactRow}>
            <Ionicons name="mail-outline" size={19} color={colors.link} />
            <Text style={styles.contactText}>{profile.email}</Text>
          </View>
          <Divider inset={14} />
          <View style={styles.contactRow}>
            <Ionicons name="phone-portrait-outline" size={19} color={colors.link} />
            <Text style={styles.contactText}>{profile.phone}</Text>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Linked Accounts</Text>
        <Card style={styles.card}>
          {accounts.map((account, i) => (
            <View key={account.id}>
              <Pressable
                style={styles.acctRow}
                onPress={() => router.push(`/account/${account.id}`)}
              >
                <View style={styles.acctIcon}>
                  <Ionicons name="wallet-outline" size={19} color={colors.brand} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.acctName}>
                    {account.name} {account.mask}
                  </Text>
                  <Text style={styles.acctSub}>
                    Available {money(account.available)}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.link} />
              </Pressable>
              {i < accounts.length - 1 ? <Divider inset={14} /> : null}
            </View>
          ))}
        </Card>

        {SECTIONS.map((section) => (
          <View key={section.title}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Card style={styles.card}>
              {section.rows.map((row, i) => (
                <View key={row.label}>
                  <NavRow
                    icon={<Ionicons name={row.icon} size={20} color={colors.link} />}
                    label={row.label}
                  />
                  {i < section.rows.length - 1 ? <Divider inset={50} /> : null}
                </View>
              ))}
            </Card>
          </View>
        ))}

        <Pressable style={styles.signOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.brand },
  header: { paddingHorizontal: 14, paddingBottom: 12 },
  headerSpill: { height: 44, backgroundColor: colors.brand },
  headerTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerTitle: { flex: 1, ...type.sectionTitle, fontSize: 19, color: colors.onBrand },
  identity: { alignItems: 'center', marginTop: 14 },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.brandTint,
    borderWidth: 2,
    borderColor: colors.onBrandMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 26, fontWeight: '800', color: colors.onBrand },
  name: { ...type.screenTitle, fontSize: 22, color: colors.onBrand, marginTop: 12 },
  meta: { ...type.caption, color: colors.onBrandMuted, marginTop: 3 },

  body: { flex: 1, backgroundColor: colors.page },
  bodyContent: { paddingBottom: 36 },

  contactCard: {
    marginTop: -36,
    marginHorizontal: 12,
    ...({
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    } as const),
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 15,
  },
  contactText: { ...type.body, color: colors.text },

  sectionTitle: {
    ...type.caption,
    color: colors.textMuted,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: 22,
    marginBottom: 7,
    marginHorizontal: 14,
  },
  card: { marginHorizontal: 12 },

  acctRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  acctIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.group,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acctName: { ...type.bodyStrong, color: colors.link, fontWeight: '700' },
  acctSub: { ...type.caption, color: colors.textMuted, marginTop: 2 },

  signOut: {
    alignItems: 'center',
    marginTop: 26,
    marginHorizontal: 12,
    paddingVertical: 15,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.brand,
  },
  signOutText: { ...type.bodyStrong, color: colors.brand, fontWeight: '700' },
});
