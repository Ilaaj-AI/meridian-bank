import React from 'react';
import { PlaceholderScreen } from '../../screens/PlaceholderScreen';

export default function Rewards() {
  return (
    <PlaceholderScreen
      title="Rewards"
      blurb="Cash back, offers and tier benefits."
      rows={[
        { icon: 'trophy-outline', label: 'Rewards Balance' },
        { icon: 'pricetags-outline', label: 'Merchant Offers' },
        { icon: 'gift-outline', label: 'Redeem Cash Back' },
        { icon: 'ribbon-outline', label: 'Tier Benefits' },
      ]}
    />
  );
}
