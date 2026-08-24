import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Divider } from '../components/ui';
import { accountById, money, wireDetails } from '../data/accounts';
import { transactions } from '../data/transactions';
import { TxnRow } from '../components/TxnRow';
import { colors, radius, type } from '../theme/tokens';

function DetailRow({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string;
  onCopy: (label: string) => void;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueWrap}>
        <Text style={styles.value}>{value}</Text>
        <Pressable hitSlop={10} onPress={() => onCopy(label.replace('\n', ' '))}>
          <Ionicons name="copy-outline" size={19} color={colors.link} />
        </Pressable>
      </View>
    </View>
  );
}

export function RoutingNumbersScreen({ accountId }: { accountId: string }) {
  const insets = useSafeAreaInsets();
  const account = accountById(accountId) ?? accountById('spend')!;
  const [copied, setCopied] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(null), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  const accountTxns = transactions
    .filter((t) => t.accountId === account.id)
    .slice(0, 4);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerSide} />
        <Text style={styles.headerTitle}>Account and Routing Numbers</Text>
        <Pressable hitSlop={10} style={styles.headerSide} onPress={() => router.back()}>
          <Ionicons name="close" size={26} color={colors.text} />
        </Pressable>
      </View>
      <Divider />

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.sectionTitle}>
          {account.name} {account.mask}
        </Text>
        <Divider />

        <View style={styles.balanceStrip}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceValue}>
            {money(account.available ?? account.balance)}
          </Text>
        </View>
        <Divider />

        <DetailRow
          label="Account Number"
          value={account.accountNumber}
          onCopy={setCopied}
        />
        <Divider />
        <DetailRow
          label="Routing Number"
          value={account.routingNumber}
          onCopy={setCopied}
        />
        <Divider />

        <Text style={styles.sectionTitle}>Wire Transfers</Text>
        <Divider />
        <DetailRow
          label={'Domestic\nRouting Number'}
          value={wireDetails.domesticRouting}
          onCopy={setCopied}
        />
        <Divider />
        <DetailRow
          label="International Swift Code"
          value={wireDetails.swift}
          onCopy={setCopied}
        />
        <Divider />

        <Pressable style={styles.manage}>
          <MaterialCommunityIcons
            name="file-document-edit-outline"
            size={22}
            color={colors.link}
          />
          <Text style={styles.manageLabel}>Manage Direct Deposit</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.link} />
        </Pressable>

        <Pressable style={styles.sendButton} onPress={() => router.push('/send')}>
          <Ionicons name="arrow-up-circle-outline" size={19} color={colors.onBrand} />
          <Text style={styles.sendLabel}>Send Money</Text>
        </Pressable>

        {accountTxns.length ? (
          <View style={styles.recent}>
            <Text style={styles.recentTitle}>Recent on this account</Text>
            <Divider />
            {accountTxns.map((txn, i) => (
              <TxnRow key={txn.id} txn={txn} last={i === accountTxns.length - 1} />
            ))}
          </View>
        ) : null}
      </ScrollView>

      {copied ? (
        <View style={[styles.toast, { bottom: insets.bottom + 24 }]}>
          <Text style={styles.toastText}>{copied} copied</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.page },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  headerSide: { width: 30, alignItems: 'flex-end' },
  headerTitle: {
    flex: 1,
    ...type.sectionTitle,
    color: colors.text,
    textAlign: 'center',
  },
  body: { paddingBottom: 40 },
  sectionTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 12,
  },
  balanceStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.group,
  },
  balanceLabel: { ...type.body, color: colors.textMuted },
  balanceValue: { ...type.amountLg, color: colors.text },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  label: { flex: 1, ...type.body, fontSize: 16, color: colors.text },
  valueWrap: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  value: { ...type.body, fontSize: 16, color: colors.text },
  manage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    margin: 16,
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    ...({
      shadowColor: '#000',
      shadowOpacity: 0.07,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    } as const),
  },
  manageLabel: { flex: 1, ...type.body, fontSize: 16, color: colors.text },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    paddingVertical: 15,
    borderRadius: radius.pill,
    backgroundColor: colors.brand,
  },
  sendLabel: { ...type.sectionTitle, color: colors.onBrand },
  recent: { marginTop: 26 },
  recentTitle: {
    ...type.sectionTitle,
    color: colors.text,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  toast: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: colors.brandDeep,
    borderRadius: radius.pill,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  toastText: { ...type.label, color: colors.onBrand, fontWeight: '600' },
});
