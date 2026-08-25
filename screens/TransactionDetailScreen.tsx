import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScreenHeader } from '../components/ScreenHeader';
import { Card, Divider } from '../components/ui';
import { accountById, money } from '../data/accounts';
import { formatAmount, txnById } from '../data/transactions';
import { colors, radius, type } from '../theme/tokens';

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

export function TransactionDetailScreen({ id }: { id: string }) {
  const txn = txnById(id);

  if (!txn) {
    return (
      <View style={styles.root}>
        <ScreenHeader title="Transaction" />
        <Text style={styles.missing}>That transaction could not be found.</Text>
      </View>
    );
  }

  const account = accountById(txn.accountId);
  const deposit = txn.amount > 0;

  return (
    <View style={styles.root}>
      <ScreenHeader title="Transaction Details" />

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <Card style={styles.hero}>
          <View style={[styles.heroIcon, deposit && styles.heroIconDeposit]}>
            <Ionicons
              name={deposit ? 'arrow-down' : 'arrow-up'}
              size={26}
              color={deposit ? colors.positive : colors.brand}
            />
          </View>
          <Text style={[styles.heroAmount, deposit && styles.heroAmountDeposit]}>
            {formatAmount(txn.amount)}
          </Text>
          <Text style={styles.heroParty}>{txn.party}</Text>
          <View
            style={[
              styles.status,
              txn.status === 'Pending' && styles.statusPending,
              txn.status === 'Failed' && styles.statusFailed,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                txn.status === 'Pending' && styles.statusTextPending,
                txn.status === 'Failed' && styles.statusTextFailed,
              ]}
            >
              {txn.status}
            </Text>
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Note</Text>
          <Divider />
          <Text style={styles.note}>{txn.note || 'No note added.'}</Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Details</Text>
          <Divider />
          <InfoRow
            label="Type"
            value={txn.type === 'deposit' ? 'Deposit' : txn.type}
          />
          <Divider inset={14} />
          <InfoRow label="Method" value={txn.method} />
          <Divider inset={14} />
          <InfoRow label="Date" value={`${txn.date} · ${txn.time}`} />
          <Divider inset={14} />
          <InfoRow label="Reference" value={`MRD-${txn.id.toUpperCase()}-2026`} />
        </Card>

        {account ? (
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>
              {deposit ? 'Deposited to' : 'Paid from'}
            </Text>
            <Divider />
            <Pressable
              style={styles.acctRow}
              onPress={() => router.push(`/account/${account.id}`)}
            >
              <View style={styles.acctIcon}>
                <Ionicons name="wallet-outline" size={20} color={colors.brand} />
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
            <Divider inset={14} />
            <InfoRow label="Account Number" value={account.accountNumber} />
            <Divider inset={14} />
            <InfoRow label="Routing Number" value={account.routingNumber} />
          </Card>
        ) : null}

        <Pressable style={styles.primary} onPress={() => router.push('/send')}>
          <Ionicons name="arrow-up-circle-outline" size={20} color={colors.onBrand} />
          <Text style={styles.primaryText}>Send Money</Text>
        </Pressable>

        <Pressable style={styles.secondary}>
          <Text style={styles.secondaryText}>Report a Problem</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.page },
  body: { paddingBottom: 40 },
  missing: { ...type.body, color: colors.textMuted, textAlign: 'center', marginTop: 40 },

  hero: {
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  heroIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.group,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIconDeposit: { backgroundColor: '#DCEFE4' },
  heroAmount: {
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '800',
    color: colors.text,
    marginTop: 14,
  },
  heroAmountDeposit: { color: colors.positive },
  heroParty: { ...type.body, color: colors.textMuted, marginTop: 4, textAlign: 'center' },
  status: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: '#DCEFE4',
  },
  statusPending: { backgroundColor: '#FCE8DC' },
  statusFailed: { backgroundColor: '#F7DCD8' },
  statusText: { ...type.caption, color: colors.positive, fontWeight: '700' },
  statusTextPending: { color: colors.accentDeep },
  statusTextFailed: { color: colors.danger },

  card: { marginTop: 14, marginHorizontal: 12 },
  cardTitle: {
    ...type.sectionTitle,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  note: { ...type.body, color: colors.textMuted, padding: 14 },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  infoLabel: { ...type.body, color: colors.textMuted },
  infoValue: { ...type.bodyStrong, color: colors.text, textAlign: 'right', flexShrink: 1 },

  acctRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  acctIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.group,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acctName: { ...type.bodyStrong, color: colors.link, fontWeight: '700' },
  acctSub: { ...type.caption, color: colors.textMuted, marginTop: 2 },

  primary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 22,
    marginHorizontal: 12,
    paddingVertical: 16,
    borderRadius: radius.pill,
    backgroundColor: colors.brand,
  },
  primaryText: { ...type.sectionTitle, color: colors.onBrand },
  secondary: { alignItems: 'center', paddingVertical: 16 },
  secondaryText: { ...type.bodyStrong, color: colors.link, fontWeight: '700' },
});
