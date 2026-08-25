/**
 * Sample data only. Every number here is fabricated for the UI build —
 * account/routing values are deliberately non-routable placeholders.
 */

// Used on: Home screen (greeting/tier header), Profile screen (name, email,
// phone, tier, member-since, avatar initials).
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

// Used on: Home screen (Spend/Reserve/Growth rows under "Virtual Wallet With
// Performance Spend", tapping a row opens Account Detail), Account Detail
// screen (balance, available/scheduled, header label, AND the collapsible
// "View Account Details" panel — shows this account's accountNumber +
// routingNumber inline when expanded), Account & Routing Numbers screen
// (account number, routing number, header label), Transaction Detail screen
// (account number shown for that transaction's account), Send screen
// (account picker + balances).
export const accounts: Account[] = [
  {
    id: 'spend',
    name: 'Spend',
    mask: 'x6462',
    balance: -36.0,
    available: -536.0,
    note: 'Free Balance until Nov. 23',
    accountNumber: '8183444523',
    routingNumber: '031207607',
  },
  {
    id: 'reserve',
    name: 'Reserve',
    mask: 'x5344',
    balance: 0.0,
    available: 0.0,
    accountNumber: '8183444523',
    routingNumber: '123456789',
  },
  {
    id: 'growth',
    name: 'Growth',
    mask: 'x2285',
    balance: 536.0,
    available: 536.0,
    accountNumber: '8183444523',
    routingNumber: '123456789',
  },
];

// Used on: Account & Routing Numbers screen only — "Wire Transfers" section
// (Domestic Routing Number + International Swift Code rows). Shared across
// every account (not per-account data).
export const wireDetails = {
  domesticRouting: '043000096',
  swift: 'PNCCUS33XXX',
};

// Used on: every screen that opens via /account/[id] — Account Detail and
// Account & Routing Numbers — to look up the right account from the route id.
export function accountById(id: string) {
  return accounts.find((a) => a.id === id);
}

// Used on: Home (account balances), Account Detail (balance, available,
// scheduled), Profile (balances list), Send screen (balances) — anywhere a
// dollar amount from this file is displayed.
/** Formats a balance the way the account rows do: negatives get a leading dash. */
export function money(value: number) {
  const abs = Math.abs(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${value < 0 ? '-' : ''}$${abs}`;
}
