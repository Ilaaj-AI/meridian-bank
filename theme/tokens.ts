/**
 * Meridian design tokens.
 *
 * The palette is deliberately our own (petrol blue + coral) rather than any
 * existing bank's brand colours — only the layout patterns are borrowed from
 * the reference screens.
 */

export const colors = {
  // Brand
  brand: '#0F3D56',
  brandDeep: '#0A2C3F',
  brandTint: '#155273',
  accent: '#FF7A45',
  accentDeep: '#E45F2B',

  // Surfaces
  page: '#FFFFFF',
  group: '#EEF1F3',
  card: '#FFFFFF',
  tourBg: '#171A1C',
  tourPanel: '#2B3338',

  // Text
  text: '#15191C',
  textMuted: '#606A72',
  textFaint: '#8A939B',
  onBrand: '#FFFFFF',
  onBrandMuted: '#C4D6E0',

  // Lines / states
  hairline: '#DDE2E6',
  hairlineSoft: '#E9EDF0',
  link: '#17679C',
  positive: '#1D7A4D',
  danger: '#C0392B',
  avatarBg: '#DDE3E7',
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  pill: 999,
} as const;

export const spacing = (n: number) => n * 4;

export const type = {
  // Headline used on the feature-tour slides
  tourTitle: { fontSize: 30, lineHeight: 38, fontWeight: '700' as const },
  screenTitle: { fontSize: 26, lineHeight: 32, fontWeight: '700' as const },
  sectionTitle: { fontSize: 17, lineHeight: 22, fontWeight: '700' as const },
  amountLg: { fontSize: 22, lineHeight: 28, fontWeight: '700' as const },
  body: { fontSize: 15, lineHeight: 20, fontWeight: '400' as const },
  bodyStrong: { fontSize: 15, lineHeight: 20, fontWeight: '600' as const },
  label: { fontSize: 13, lineHeight: 17, fontWeight: '400' as const },
  caption: { fontSize: 11, lineHeight: 14, fontWeight: '400' as const },
} as const;

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  raised: {
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
} as const;
