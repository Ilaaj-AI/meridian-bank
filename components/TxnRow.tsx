import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { formatAmount, type Txn } from '../data/transactions';
import { colors, type } from '../theme/tokens';
import { Divider } from './ui';

/**
 * One line of transaction history: avatar, party + note, and the signed amount.
 * Deposits are green and withdrawals stay neutral so credits read at a glance.
 */
export function TxnRow({ txn, last }: { txn: Txn; last?: boolean }) {
  const deposit = txn.type === 'deposit';
  const failed = txn.status === 'Failed';
  return (
    <View>
      <Pressable
        style={styles.row}
        onPress={() => router.push(`/transaction/${txn.id}`)}
      >
        <View
          style={[
            styles.avatar,
            deposit && styles.avatarDeposit,
            failed && styles.avatarFailed,
          ]}
        >
          <Ionicons
            name={deposit ? 'arrow-down' : 'arrow-up'}
            size={16}
            color={failed ? colors.danger : deposit ? colors.positive : colors.textMuted}
          />
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.line}>
            <Text style={styles.party} numberOfLines={1}>
              {txn.party}
            </Text>
            <Text
              style={[
                styles.amount,
                deposit && styles.amountDeposit,
                failed && styles.amountFailed,
              ]}
            >
              {formatAmount(txn.amount)}
            </Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.meta} numberOfLines={1}>
              {txn.date} · {txn.method}
            </Text>
            {txn.status !== 'Completed' ? (
              <Text
                style={[styles.pending, txn.status === 'Failed' && styles.failed]}
              >
                {txn.status}
              </Text>
            ) : null}
          </View>
          {txn.note ? (
            <Text style={styles.note} numberOfLines={1}>
              {txn.note}
            </Text>
          ) : null}
        </View>

        <Ionicons name="chevron-forward" size={17} color={colors.link} />
      </Pressable>
      {!last ? <Divider inset={62} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarDeposit: { backgroundColor: '#DCEFE4' },
  avatarFailed: { backgroundColor: '#F7DEDA' },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  party: { flex: 1, ...type.bodyStrong, color: colors.text, fontWeight: '700' },
  amount: { ...type.bodyStrong, color: colors.text, fontWeight: '700' },
  amountDeposit: { color: colors.positive },
  amountFailed: { color: colors.danger },
  meta: { flex: 1, ...type.caption, color: colors.textMuted, marginTop: 2 },
  pending: { ...type.caption, color: colors.accentDeep, fontWeight: '700' },
  failed: { color: colors.danger },
  note: { ...type.label, color: colors.textFaint, marginTop: 3 },
});
