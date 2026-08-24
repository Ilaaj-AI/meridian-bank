/**
 * Sample data only. Every number here is fabricated for the UI build —
 * account/routing values are deliberately non-routable placeholders.
 */

export const profile = {
  firstName: 'Erin',
  fullName: 'Erin Delacroix',
  email: 'erin.d@example.com',
  phone: '(555) 0142',
  tier: 'Silver Tier Member',
  memberSince: 'Member since 2021',
  initials: 'ED',
};

export type Account = {
  id: string;
  name: string;
  mask: string;
  balance: number;
  available: number;
  note?: string;
  accountNumber: string;
  routingNumber: string;
};

export const accounts: Account[] = [
  {
    id: 'spend',
    name: 'Spend',
    mask: 'x6462',
    balance: -36.0,
    available: -536.0,
    note: 'Free Balance until Nov. 23',
    accountNumber: '4168256462',
    routingNumber: '041000124',
  },
  {
    id: 'reserve',
    name: 'Reserve',
    mask: 'x5344',
    balance: 0.0,
    available: 0.0,
    accountNumber: '9871005344',
    routingNumber: '123456789',
  },
  {
    id: 'growth',
    name: 'Growth',
    mask: 'x2285',
    balance: 536.0,
    available: 536.0,
    accountNumber: '9871002285',
    routingNumber: '123456789',
  },
];

export const wireDetails = {
  domesticRouting: '043000096',
  swift: 'PNCCUS33XXX',
};

export function accountById(id: string) {
  return accounts.find((a) => a.id === id);
}

/** Formats a balance the way the account rows do: negatives get a leading dash. */
export function money(value: number) {
  const abs = Math.abs(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${value < 0 ? '-' : ''}$${abs}`;
}
