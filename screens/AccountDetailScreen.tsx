import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Card, Divider, NavRow } from '../components/ui';
import { TxnRow } from '../components/TxnRow';
import { accountById, money } from '../data/accounts';
import { transactions } from '../data/transactions';
import { colors, type } from '../theme/tokens';

/** Groups the (already date-sorted) list into date headings. */
function groupByDate(list: typeof transactions) {
  const groups: { date: string; items: typeof transactions }[] = [];
  for (const txn of list) {
    const last = groups[groups.length - 1];
    if (last && last.date === txn.date) last.items.push(txn);
    else groups.push({ date: txn.date, items: [txn] });
  }
  return groups;
}

export function AccountDetailScreen({ accountId }: { accountId: string }) {
  const insets = useSafeAreaInsets();
  const account = accountById(accountId) ?? accountById('spend')!;
  const accountTxns = transactions.filter((t) => t.accountId === account.id);
  const groups = groupByDate(accountTxns);

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerTop}>
          <Pressable hitSlop={10} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.onBrand} />
          </Pressable>
          <View style={{ flex: 1 }} />
          <Pressable style={styles.headerIcon}>
            <Ionicons name="pricetag-outline" size={16} color={colors.brand} />
          </Pressable>
          <Pressable style={styles.headerIcon}>
            <Ionicons name="settings-outline" size={16} color={colors.brand} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSpill} />

        <Card style={styles.summaryCard}>
          <Text style={styles.acctLabel}>
            {account.name} {account.mask}
          </Text>
          <Text style={styles.balance}>{money(account.balance)}</Text>
          {account.note ? (
            <View style={styles.noteRow}>
              <Text style={styles.note}>{account.note}</Text>
              <Ionicons
                name="information-circle-outline"
                size={14}
                color={colors.textMuted}
              />
            </View>
          ) : null}

          <View style={styles.splitDivider} />

          <View style={styles.splitRow}>
            <View>
              <Text style={styles.splitAmount}>{money(account.available)}</Text>
              <Text style={styles.splitLabel}>Available Balance</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.splitAmount}>$0.00</Text>
              <Text style={styles.splitLabel}>Scheduled Out</Text>
            </View>
          </View>

          <Pressable style={styles.viewDetails}>
            <Text style={styles.viewDetailsText}>View Account Details</Text>
            <Ionicons name="chevron-down" size={16} color={colors.link} />
          </Pressable>
        </Card>

        <Card style={styles.actionsCard}>
          <NavRow
            icon={
              <MaterialCommunityIcons
                name="bank-outline"
                size={20}
                color={colors.link}
              />
            }
            label="Account & Routing Numbers"
            onPress={() => router.push(`/account/${account.id}/routing`)}
          />
          <Divider inset={50} />
          <NavRow
            icon={<Ionicons name="folder-outline" size={20} color={colors.link} />}
            label="Statements & Documents"
          />
        </Card>

        <View style={styles.recentHeader}>
          <Text style={styles.recentTitle}>Recent Transactions</Text>
          <Ionicons name="search" size={18} color={colors.link} />
        </View>

        {groups.map((group) => (
          <View key={group.date} style={styles.group}>
            <Text style={styles.groupDate}>{group.date}</Text>
            <Card>
              {group.items.map((txn, i) => (
                <TxnRow key={txn.id} txn={txn} last={i === group.items.length - 1} />
              ))}
            </Card>
          </View>
        ))}

        {!accountTxns.length ? (
          <Text style={styles.empty}>No transactions on this account yet.</Text>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.brand },
  header: { paddingHorizontal: 14, paddingBottom: 10 },
  headerTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.page,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { paddingBottom: 36, backgroundColor: colors.page },
  headerSpill: { height: 40, backgroundColor: colors.brand },
  summaryCard: {
    marginTop: -36,
    marginHorizontal: 12,
    paddingVertical: 20,
    paddingHorizontal: 18,
    alignItems: 'center',
    ...({
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    } as const),
  },
  acctLabel: {
    ...type.caption,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  balance: { fontSize: 34, lineHeight: 40, fontWeight: '700', color: colors.text, marginTop: 4 },
  noteRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  note: { ...type.caption, color: colors.textMuted },
  splitDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.hairline,
    alignSelf: 'stretch',
    marginTop: 16,
  },
  splitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginTop: 16,
  },
  splitAmount: { ...type.bodyStrong, color: colors.text, fontWeight: '700' },
  splitLabel: { ...type.caption, color: colors.textMuted, marginTop: 3 },
  viewDetails: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 18 },
  viewDetailsText: { ...type.label, color: colors.link, fontWeight: '600' },
  actionsCard: { marginTop: 14, marginHorizontal: 12 },
  recentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 10,
  },
  recentTitle: { ...type.sectionTitle, color: colors.text },
  group: { marginBottom: 16, marginHorizontal: 12 },
  groupDate: {
    ...type.caption,
    color: colors.textMuted,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 7,
    marginLeft: 2,
  },
  empty: { ...type.body, color: colors.textMuted, textAlign: 'center', marginTop: 30 },
});
