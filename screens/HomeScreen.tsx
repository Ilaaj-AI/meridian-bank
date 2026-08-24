import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Card, Divider, Dots, GroupCard } from '../components/ui';
import { TxnRow } from '../components/TxnRow';
import { accounts, money, profile, type Account } from '../data/accounts';
import { transactions } from '../data/transactions';
import { colors, radius, type } from '../theme/tokens';

const TOOLS = [
  { id: 'budgets', label: 'Spending\n& Budgets', icon: 'pie-chart', lib: 'ion' },
  { id: 'lowcash', label: 'Low Cash\nMode', icon: 'cash-multiple', lib: 'mc' },
  { id: 'goals', label: 'Savings\nGoals', icon: 'trophy', lib: 'ion' },
  { id: 'rules', label: 'Savings\nRules', icon: 'calendar-edit', lib: 'mc' },
] as const;

function AccountRow({ account }: { account: Account }) {
  const negative = account.balance < 0;
  const availableNegative = account.available < 0;
  return (
    <Pressable
      style={styles.acctRow}
      onPress={() => router.push(`/account/${account.id}`)}
    >
      <Text style={styles.acctName}>
        {account.name} {account.mask}
      </Text>

      <View style={styles.acctRight}>
        <Text style={[styles.acctBalance, negative && styles.negative]}>
          {money(account.balance)}
        </Text>
        {account.note ? <Text style={styles.acctSub}>{account.note}</Text> : null}
        <View style={styles.availableRow}>
          <Text style={styles.acctSub}>Available Balance</Text>
          {account.note ? (
            <Text
              style={[styles.acctSubStrong, availableNegative && styles.negative]}
            >
              {money(account.available)}
            </Text>
          ) : null}
        </View>
      </View>

      <Pressable hitSlop={8} style={styles.kebab}>
        <Ionicons name="ellipsis-vertical" size={16} color={colors.textMuted} />
      </Pressable>
    </Pressable>
  );
}

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const recent = transactions.slice(0, 4);

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerTop}>
          <Pressable style={styles.headerIcon} onPress={() => router.push('/profile')}>
            <Ionicons name="person-circle-outline" size={22} color={colors.brand} />
          </Pressable>
          <View style={{ flex: 1 }} />
          <Pressable style={styles.headerIcon}>
            <Ionicons name="cart-outline" size={18} color={colors.brand} />
          </Pressable>
          <Pressable style={styles.headerIcon}>
            <Ionicons name="help-circle-outline" size={19} color={colors.brand} />
          </Pressable>
        </View>

        <View style={styles.greetingRow}>
          <Text style={styles.greeting}>Hello, {profile.firstName}</Text>
          <Pressable style={styles.reminders}>
            <Ionicons name="clipboard-outline" size={14} color={colors.brand} />
            <Text style={styles.remindersText}>Reminders</Text>
            <View style={styles.remindersBadge}>
              <Text style={styles.remindersBadgeText}>3</Text>
            </View>
          </Pressable>
        </View>
        <Text style={styles.tier}>{profile.tier}</Text>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand-coloured strip inside the scroll view so the banner can sit
            half over it without being clipped at the ScrollView's top edge. */}
        <View style={styles.headerSpill} />

        <Card style={styles.banner}>
          <View style={styles.bannerInner}>
            <View style={styles.bannerIcon}>
              <Ionicons name="shield-checkmark-outline" size={20} color={colors.brand} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerTitle}>We're Enhancing Your Security</Text>
              <Text style={styles.bannerText}>
                You might be asked to authenticate at sign on with a one-time
                passcode. <Text style={styles.bannerLink}>Learn More</Text>
              </Text>
            </View>
          </View>
        </Card>

        <View style={styles.dotsWrap}>
          <Dots count={3} index={0} />
        </View>

        <GroupCard title="Virtual Wallet With Performance Spend" style={styles.group}>
          <AccountRow account={accounts[0]} />
          <Divider inset={14} />

          <Pressable style={styles.lowCash}>
            <MaterialCommunityIcons
              name="cash-multiple"
              size={20}
              color={colors.link}
            />
            <Text style={styles.lowCashLabel}>Low Cash Mode</Text>
            <Ionicons name="chevron-down" size={20} color={colors.link} />
          </Pressable>
          <Divider inset={14} />

          <AccountRow account={accounts[1]} />
          <Divider inset={14} />
          <AccountRow account={accounts[2]} />
          <Divider />

          <View style={styles.toolsRow}>
            {TOOLS.map((tool) => (
              <Pressable key={tool.id} style={styles.toolItem}>
                <View style={styles.toolIcon}>
                  {tool.lib === 'mc' ? (
                    <MaterialCommunityIcons
                      name={tool.icon as any}
                      size={21}
                      color={colors.brand}
                    />
                  ) : (
                    <Ionicons name={tool.icon as any} size={21} color={colors.brand} />
                  )}
                </View>
                <Text style={styles.toolLabel}>{tool.label}</Text>
              </Pressable>
            ))}
          </View>
          <Divider inset={14} />

          <Pressable
            style={styles.routingButton}
            onPress={() => router.push(`/account/${accounts[0].id}`)}
          >
            <MaterialCommunityIcons name="bank-outline" size={20} color={colors.link} />
            <Text style={styles.routingButtonLabel}>Account and Routing Numbers</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.link} />
          </Pressable>

          <Pressable style={styles.customize}>
            <Ionicons name="create-outline" size={15} color={colors.link} />
            <Text style={styles.customizeText}>Customize Tools</Text>
          </Pressable>
        </GroupCard>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Transaction History</Text>
          <Divider />
          {recent.map((txn, i) => (
            <TxnRow key={txn.id} txn={txn} last={i === recent.length - 1} />
          ))}
          <Divider />
          <Pressable style={styles.more} onPress={() => router.push('/transactions')}>
            <Text style={styles.moreText}>More Transactions</Text>
            <Ionicons name="chevron-forward" size={17} color={colors.link} />
          </Pressable>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.brand },
  header: { paddingHorizontal: 14, paddingBottom: 10 },
  headerSpill: { height: 48, backgroundColor: colors.brand },
  headerTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.page,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    gap: 10,
  },
  greeting: { flex: 1, ...type.screenTitle, color: colors.onBrand },
  tier: { ...type.caption, color: colors.onBrandMuted, marginTop: 3 },
  reminders: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.page,
    borderRadius: radius.pill,
    paddingVertical: 7,
    paddingLeft: 10,
    paddingRight: 12,
  },
  remindersText: { ...type.label, color: colors.brand, fontWeight: '600' },
  remindersBadge: {
    position: 'absolute',
    top: -7,
    right: -7,
    minWidth: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  remindersBadgeText: {
    ...type.caption,
    color: colors.onBrand,
    fontWeight: '700',
  },

  body: { flex: 1, backgroundColor: colors.page },
  bodyContent: { paddingBottom: 28 },

  banner: {
    marginTop: -40,
    marginHorizontal: 12,
    ...({
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    } as const),
  },
  bannerInner: { flexDirection: 'row', gap: 12, padding: 14 },
  bannerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.group,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTitle: { ...type.sectionTitle, color: colors.text },
  bannerText: { ...type.label, color: colors.textMuted, marginTop: 3 },
  bannerLink: { color: colors.link, fontWeight: '600' },

  dotsWrap: { paddingVertical: 14 },

  group: { marginHorizontal: 12 },
  acctRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 8,
  },
  acctName: { flex: 1, ...type.bodyStrong, color: colors.link, fontWeight: '700' },
  acctRight: { alignItems: 'flex-end', flexShrink: 0 },
  acctBalance: { ...type.amountLg, color: colors.text },
  negative: { color: colors.danger },
  acctSub: { ...type.caption, color: colors.textMuted, marginTop: 3 },
  acctSubStrong: {
    ...type.caption,
    color: colors.text,
    fontWeight: '700',
    marginTop: 3,
  },
  availableRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  kebab: { paddingTop: 4, paddingLeft: 2 },

  lowCash: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 15,
  },
  lowCashLabel: { flex: 1, ...type.body, fontSize: 16, color: colors.text },

  toolsRow: { flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 6 },
  toolItem: { flex: 1, alignItems: 'center', gap: 7 },
  toolIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.group,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolLabel: {
    ...type.caption,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 15,
  },
  customize: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingBottom: 16,
  },
  customizeText: { ...type.label, color: colors.link, fontWeight: '700' },
  routingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 15,
  },
  routingButtonLabel: { flex: 1, ...type.body, fontSize: 16, color: colors.text },

  card: { marginTop: 14, marginHorizontal: 12 },
  cardTitle: {
    ...type.sectionTitle,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  more: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 15,
  },
  moreText: { ...type.bodyStrong, color: colors.link, fontWeight: '700' },
});
