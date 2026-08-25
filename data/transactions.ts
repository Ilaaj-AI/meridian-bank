/**
 * Sample data only — nothing here is real. Amounts, names, account and routing
 * values are fabricated placeholders for the front-end build.
 */

export type TxnType = 'AHC' | 'withdrawal' | 'deposit';

export type Txn = {
  id: string;
  party: string;
  initials: string;
  note: string;
  date: string;
  time: string;
  amount: number;
  type: TxnType;
  method: string;
  status: 'Completed' | 'Pending' | 'Failed';
  accountId: string;
};

// Used on: Home screen (Transaction History card, last 4), Transactions
// screen (full list, filterable by All/Deposits/Withdrawals), Account Detail
// screen (Recent Transactions for the opened account only), Transaction
// Detail screen (single row, opened by tapping any TxnRow), Routing Numbers
// screen ("Recent on this account" strip).
export const transactions: Txn[] = [
  {
    id: 't1',
    party: 'ACH transfer from DOORDASH,INC',
    initials: 'DD',
    note: 'Transfer could not be completed.',
    date: 'Aug 23, 2026',
    time: '8:14 AM',
    amount: +5690,
    type: 'AHC',
    method: 'Bank Transfer',
    status: 'Failed',
    accountId: 'spend',
  },
  {
    id: 't13',
    party: '.',
    initials: 'DD',
    note: 'Transfer could not be completed.',
    date: 'Aug 23, 2026',
    time: '7:02 PM',
    amount: 5690,
    type: 'AHC',
    method: 'Bank Transfer',
    status: 'Failed',
    accountId: 'spend',
  },
  {
    id: 't2',
    party: 'Payroll — Northwind Studio',
    initials: 'NS',
    note: 'August salary, second half.',
    date: 'Aug 22, 2026',
    time: '6:02 AM',
    amount: 60.0,
    type: 'deposit',
    method: 'Direct Deposit',
    status: 'Completed',
    accountId: 'spend',
  },
  {
    id: 't3',
    party: 'Renata Coelho',
    initials: 'RC',
    note: "Last night's movie showing.",
    date: 'Aug 21, 2026',
    time: '9:47 PM',
    amount: -20.0,
    type: 'withdrawal',
    method: 'QuickPay',
    status: 'Completed',
    accountId: 'spend',
  },
  {
    id: 't4',
    party: 'Priya Raman',
    initials: 'PR',
    note: 'Thank you for lunch!',
    date: 'Aug 21, 2026',
    time: '1:15 PM',
    amount: 7.5,
    type: 'deposit',
    method: 'QuickPay',
    status: 'Completed',
    accountId: 'spend',
  },
  {
    id: 't5',
    party: 'Corner Market',
    initials: 'CM',
    note: 'Snacks.',
    date: 'Aug 20, 2026',
    time: '11:28 AM',
    amount: -9.2,
    type: 'withdrawal',
    method: 'Card Purchase',
    status: 'Completed',
    accountId: 'spend',
  },
  {
    id: 't6',
    party: 'Harbour Art LLC',
    initials: 'HA',
    note: 'Framing deposit for the print.',
    date: 'Aug 19, 2026',
    time: '4:33 PM',
    amount: -15.0,
    type: 'withdrawal',
    method: 'Card Purchase',
    status: 'Pending',
    accountId: 'spend',
  },
  {
    id: 't7',
    party: 'Mobile Check Deposit',
    initials: 'MC',
    note: 'Refund cheque from the dentist.',
    date: 'Aug 18, 2026',
    time: '8:05 AM',
    amount: 55.0,
    type: 'deposit',
    method: 'Mobile Deposit',
    status: 'Completed',
    accountId: 'spend',
  },
  {
    id: 't8',
    party: 'Gulshan Utilities',
    initials: 'GU',
    note: 'Electricity, billing cycle 08.',
    date: 'Aug 17, 2026',
    time: '7:19 AM',
    amount: -35.4,
    type: 'withdrawal',
    method: 'Scheduled Payment',
    status: 'Completed',
    accountId: 'spend',
  },
  {
    id: 't9',
    party: 'Idris Khan',
    initials: 'IK',
    note: 'Split for the airport cab.',
    date: 'Aug 16, 2026',
    time: '10:02 PM',
    amount: 5.25,
    type: 'deposit',
    method: 'QuickPay',
    status: 'Completed',
    accountId: 'spend',
  },
  {
    id: 't10',
    party: 'Seaside Grocers',
    initials: 'SG',
    note: 'Weekly groceries.',
    date: 'Aug 15, 2026',
    time: '6:41 PM',
    amount: -46.12,
    type: 'withdrawal',
    method: 'Card Purchase',
    status: 'Completed',
    accountId: 'spend',
  },
  {
    id: 't11',
    party: 'Interest Earned',
    initials: 'IE',
    note: 'Monthly interest on Growth.',
    date: 'Aug 15, 2026',
    time: '12:00 AM',
    amount: 4.18,
    type: 'deposit',
    method: 'Interest',
    status: 'Completed',
    accountId: 'growth',
  },
  {
    id: 't12',
    party: 'Streamline Music',
    initials: 'SM',
    note: 'Monthly subscription.',
    date: 'Aug 14, 2026',
    time: '9:00 AM',
    amount: -9.99,
    type: 'withdrawal',
    method: 'Card Purchase',
    status: 'Completed',
    accountId: 'spend',
  },
];

// Used on: TxnRow component (every transaction row, on Home/Transactions/
// Account Detail/Routing Numbers), Transaction Detail screen (amount field).
export function formatAmount(amount: number) {
  const sign = amount < 0 ? '-' : '+';
  const abs = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${sign}$${abs}`;
}

// Used on: Transaction Detail screen — looks up the tapped transaction from
// the /transaction/[id] route.
export function txnById(id: string) {
  return transactions.find((t) => t.id === id);
}
