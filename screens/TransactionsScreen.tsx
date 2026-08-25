import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { TxnRow } from '../components/TxnRow';
import { Card, Divider } from '../components/ui';
import { transactions } from '../data/transactions';
import { colors, radius, type } from '../theme/tokens';

const FILTERS: { id: 'all' | 'deposit' | 'withdrawal'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'deposit', label: 'Deposits' },
  { id: 'withdrawal', label: 'Withdrawals' },
];

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

export function TransactionsScreen() {
  const [filter, setFilter] = React.useState<'all' | 'deposit' | 'withdrawal'>('all');

  const filtered = React.useMemo(() => {
    if (filter === 'all') return transactions;
    if (filter === 'deposit') return transactions.filter((t) => t.amount > 0);
    return transactions.filter((t) => t.amount <= 0);
  }, [filter]);

  const groups = groupByDate(filtered);

  return (
    <View style={styles.root}>
      <ScreenHeader title="Transactions" subtitle="Spend x5342 · last 30 days" />

      <View style={styles.filters}>
        {FILTERS.map((f) => {
          const active = f.id === filter;
          return (
            <Pressable
              key={f.id}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => setFilter(f.id)}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {f.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        {groups.map((group) => (
          <View key={group.date} style={styles.group}>
            <Text style={styles.groupDate}>{group.date}</Text>
            <Card>
              {group.items.map((txn, i) => (
                <TxnRow
                  key={txn.id}
                  txn={txn}
                  last={i === group.items.length - 1}
                />
              ))}
            </Card>
          </View>
        ))}

        {!filtered.length ? (
          <Text style={styles.empty}>No transactions to show.</Text>
        ) : (
          <>
            <Divider />
            <Text style={styles.footer}>
              Showing {filtered.length} of {transactions.length} transactions
            </Text>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.page },
  filters: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: colors.page,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.group,
  },
  chipActive: { backgroundColor: colors.brand },
  chipText: { ...type.label, color: colors.text, fontWeight: '600' },
  chipTextActive: { color: colors.onBrand },
  body: { paddingBottom: 36 },
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
  empty: {
    ...type.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 40,
  },
  footer: {
    ...type.caption,
    color: colors.textFaint,
    textAlign: 'center',
    paddingVertical: 18,
  },
});
