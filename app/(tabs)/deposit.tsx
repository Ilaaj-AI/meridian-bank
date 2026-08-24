import React from 'react';
import { PlaceholderScreen } from '../../screens/PlaceholderScreen';

export default function Deposit() {
  return (
    <PlaceholderScreen
      title="Deposit"
      blurb="Deposit cheques and manage direct deposit."
      rows={[
        { icon: 'camera-outline', label: 'Deposit a Cheque' },
        { icon: 'list-outline', label: 'Deposit History' },
        { icon: 'document-text-outline', label: 'Manage Direct Deposit' },
        { icon: 'location-outline', label: 'Find an ATM' },
      ]}
    />
  );
}
