import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScreenHeader } from '../components/ScreenHeader';
import { Card, Divider } from '../components/ui';
import { accounts, money } from '../data/accounts';
import { colors, radius, type } from '../theme/tokens';

const RECIPIENTS = [
  { id: 'r1', name: 'Renata Coelho', initials: 'RC', handle: 'renata@example.com' },
  { id: 'r2', name: 'Priya Raman', initials: 'PR', handle: '(555) 0188' },
  { id: 'r3', name: 'Idris Khan', initials: 'IK', handle: 'idris@example.com' },
];

export function SendScreen() {
  const [recipient, setRecipient] = React.useState(RECIPIENTS[0].id);
  const [fromAccount, setFromAccount] = React.useState(accounts[0].id);
  const [amount, setAmount] = React.useState('');
  const [note, setNote] = React.useState('');
  const [sent, setSent] = React.useState(false);

  const canSend = Number(amount) > 0;

  if (sent) {
    const to = RECIPIENTS.find((r) => r.id === recipient)!;
    return (
      <View style={styles.root}>
        <ScreenHeader title="Send Money" />
        <View style={styles.doneWrap}>
          <View style={styles.doneIcon}>
            <Ionicons name="checkmark" size={40} color={colors.onBrand} />
          </View>
          <Text style={styles.doneTitle}>Transfer scheduled</Text>
          <Text style={styles.doneText}>
            ${Number(amount).toFixed(2)} to {to.name}. This is a demo screen — no
            money has moved.
          </Text>
          <Pressable style={styles.primary} onPress={() => router.back()}>
            <Text style={styles.primaryText}>Done</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScreenHeader title="Send Money" />

      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionTitle}>To</Text>
        <Card style={styles.card}>
          {RECIPIENTS.map((r, i) => {
            const active = r.id === recipient;
            return (
              <View key={r.id}>
                <Pressable style={styles.row} onPress={() => setRecipient(r.id)}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{r.initials}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.rowTitle}>{r.name}</Text>
                    <Text style={styles.rowSub}>{r.handle}</Text>
                  </View>
                  <Ionicons
                    name={active ? 'radio-button-on' : 'radio-button-off'}
                    size={21}
                    color={active ? colors.brand : colors.hairline}
                  />
                </Pressable>
                {i < RECIPIENTS.length - 1 ? <Divider inset={62} /> : null}
              </View>
            );
          })}
        </Card>

        <Text style={styles.sectionTitle}>Amount</Text>
        <Card style={styles.card}>
          <View style={styles.amountWrap}>
            <Text style={styles.currency}>$</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor={colors.textFaint}
            />
          </View>
        </Card>

        <Text style={styles.sectionTitle}>From</Text>
        <Card style={styles.card}>
          {accounts.map((a, i) => {
            const active = a.id === fromAccount;
            return (
              <View key={a.id}>
                <Pressable style={styles.row} onPress={() => setFromAccount(a.id)}>
                  <View style={styles.acctIcon}>
                    <Ionicons name="wallet-outline" size={19} color={colors.brand} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.rowTitle}>
                      {a.name} {a.mask}
                    </Text>
                    <Text style={styles.rowSub}>Available {money(a.available)}</Text>
                  </View>
                  <Ionicons
                    name={active ? 'radio-button-on' : 'radio-button-off'}
                    size={21}
                    color={active ? colors.brand : colors.hairline}
                  />
                </Pressable>
                {i < accounts.length - 1 ? <Divider inset={62} /> : null}
              </View>
            );
          })}
        </Card>

        <Text style={styles.sectionTitle}>Note</Text>
        <Card style={styles.card}>
          <TextInput
            style={styles.noteInput}
            value={note}
            onChangeText={setNote}
            placeholder="What's this for?"
            placeholderTextColor={colors.textFaint}
            multiline
          />
        </Card>

        <Pressable
          style={[styles.primary, styles.primaryWide, !canSend && styles.primaryOff]}
          disabled={!canSend}
          onPress={() => setSent(true)}
        >
          <Text style={styles.primaryText}>Review & Send</Text>
        </Pressable>

        <Text style={styles.disclaimer}>
          Demo interface — transfers are simulated and nothing is submitted.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.page },
  body: { paddingBottom: 40 },
  sectionTitle: {
    ...type.caption,
    color: colors.textMuted,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: 20,
    marginBottom: 7,
    marginHorizontal: 14,
  },
  card: { marginHorizontal: 12 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { ...type.label, color: colors.textMuted, fontWeight: '700' },
  acctIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.group,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: { ...type.bodyStrong, color: colors.text, fontWeight: '700' },
  rowSub: { ...type.caption, color: colors.textMuted, marginTop: 2 },

  amountWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 4,
  },
  currency: { fontSize: 30, fontWeight: '700', color: colors.textMuted },
  amountInput: {
    flex: 1,
    fontSize: 34,
    fontWeight: '800',
    color: colors.text,
    paddingVertical: 8,
  },
  noteInput: {
    ...type.body,
    color: colors.text,
    padding: 14,
    minHeight: 84,
    textAlignVertical: 'top',
  },

  primary: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.brand,
  },
  primaryWide: { marginTop: 26, marginHorizontal: 12 },
  primaryOff: { backgroundColor: colors.hairline },
  primaryText: { ...type.sectionTitle, color: colors.onBrand },
  disclaimer: {
    ...type.caption,
    color: colors.textFaint,
    textAlign: 'center',
    marginTop: 14,
    marginHorizontal: 24,
  },

  doneWrap: { alignItems: 'center', paddingHorizontal: 28, paddingTop: 60 },
  doneIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.positive,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneTitle: { ...type.screenTitle, color: colors.text, marginTop: 18 },
  doneText: {
    ...type.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 28,
  },
});
