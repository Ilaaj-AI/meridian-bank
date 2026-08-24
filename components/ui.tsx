import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, type } from '../theme/tokens';

export function Divider({ inset = 0 }: { inset?: number }) {
  return <View style={[styles.divider, { marginLeft: inset }]} />;
}

/**
 * A titled group of rows: grey header strip with a collapse affordance, then a
 * white body. Matches the "account group" pattern on the accounts screen.
 */
export function GroupCard({
  title,
  children,
  style,
}: {
  title: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const [open, setOpen] = React.useState(true);
  return (
    <View style={[styles.group, style]}>
      <Pressable style={styles.groupHeader} onPress={() => setOpen((v) => !v)}>
        <Text style={styles.groupTitle} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.collapseDot}>
          <Ionicons
            name={open ? 'chevron-up' : 'chevron-down'}
            size={13}
            color={colors.page}
          />
        </View>
      </Pressable>
      {open ? <View style={styles.groupBody}>{children}</View> : null}
    </View>
  );
}

/** Plain white card with rounded corners — used for banners and row lists. */
export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

/** Left icon + label + right chevron. The generic navigation row. */
export function NavRow({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.navRow} onPress={onPress}>
      <View style={styles.navIcon}>{icon}</View>
      <Text style={styles.navLabel} numberOfLines={1}>
        {label}
      </Text>
      <Ionicons name="chevron-forward" size={18} color={colors.link} />
    </Pressable>
  );
}

/** Filled pill button, used for the primary Send / Request actions. */
export function PillButton({
  icon,
  label,
  onPress,
  style,
}: {
  icon?: React.ReactNode;
  label: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable style={[styles.pill, style]} onPress={onPress}>
      {icon ? <View style={styles.pillIcon}>{icon}</View> : null}
      <Text style={styles.pillLabel}>{label}</Text>
    </Pressable>
  );
}

/** Small circular icon button used in the brand header bar. */
export function HeaderIconButton({
  name,
  onPress,
  badge,
}: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  onPress?: () => void;
  badge?: number;
}) {
  return (
    <Pressable style={styles.headerIcon} onPress={onPress}>
      <Ionicons name={name} size={17} color={colors.brand} />
      {badge ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

/** Carousel position indicator. */
export function Dots({ count, index }: { count: number; index: number }) {
  return (
    <View style={styles.dots}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={[styles.dot, i === index && styles.dotActive]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.hairline,
  },
  group: {
    backgroundColor: colors.group,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  groupTitle: {
    flex: 1,
    ...type.bodyStrong,
    color: colors.text,
  },
  collapseDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupBody: {
    backgroundColor: colors.card,
    marginHorizontal: 6,
    marginBottom: 6,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 15,
    gap: 12,
  },
  navIcon: { width: 24, alignItems: 'center' },
  navLabel: { flex: 1, ...type.body, color: colors.text },
  pill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.brand,
    borderRadius: radius.pill,
    paddingVertical: 14,
  },
  pillIcon: { marginRight: 2 },
  pillLabel: { ...type.sectionTitle, color: colors.onBrand },
  headerIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.page,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 4,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { ...type.caption, fontWeight: '700', color: colors.onBrand },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 7 },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.hairline,
  },
  dotActive: { backgroundColor: colors.accent },
});
