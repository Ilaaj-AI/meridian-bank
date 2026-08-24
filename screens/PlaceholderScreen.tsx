import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, Divider, NavRow } from '../components/ui';
import { colors, type } from '../theme/tokens';

/**
 * Tabs beyond Accounts are intentionally inert in this front-end build — they
 * show the shell and the rows they would contain, but nothing is wired up.
 */
export function PlaceholderScreen({
  title,
  blurb,
  rows,
}: {
  title: string;
  blurb: string;
  rows: { icon: React.ComponentProps<typeof Ionicons>['name']; label: string }[];
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.blurb}>{blurb}</Text>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        <Card style={styles.card}>
          {rows.map((row, i) => (
            <View key={row.label}>
              <NavRow
                icon={<Ionicons name={row.icon} size={20} color={colors.link} />}
                label={row.label}
              />
              {i < rows.length - 1 ? <Divider inset={50} /> : null}
            </View>
          ))}
        </Card>

        <Text style={styles.note}>
          Front-end demo — this section is not wired up yet.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.brand },
  header: { paddingHorizontal: 16, paddingBottom: 28 },
  title: { ...type.screenTitle, color: colors.onBrand },
  blurb: { ...type.label, color: colors.onBrandMuted, marginTop: 6 },
  body: { flex: 1, backgroundColor: colors.page },
  bodyContent: { paddingBottom: 30 },
  card: { marginTop: 16, marginHorizontal: 12 },
  note: {
    ...type.caption,
    color: colors.textFaint,
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 30,
  },
});
