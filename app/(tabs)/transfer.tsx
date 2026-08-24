import React from 'react';
import { PlaceholderScreen } from '../../screens/PlaceholderScreen';

export default function Transfer() {
  return (
    <PlaceholderScreen
      title="Pay & Transfer"
      blurb="Move money between accounts and people."
      rows={[
        { icon: 'arrow-up-circle-outline', label: 'Send Money' },
        { icon: 'arrow-down-circle-outline', label: 'Request Money' },
        { icon: 'swap-horizontal-outline', label: 'Transfer Between Accounts' },
        { icon: 'receipt-outline', label: 'Pay a Bill' },
        { icon: 'time-outline', label: 'Scheduled Payments' },
      ]}
    />
  );
}
