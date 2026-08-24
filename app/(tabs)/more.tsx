import React from 'react';
import { PlaceholderScreen } from '../../screens/PlaceholderScreen';

export default function More() {
  return (
    <PlaceholderScreen
      title="More"
      blurb="Settings, support and account tools."
      rows={[
        { icon: 'person-outline', label: 'Profile & Settings' },
        { icon: 'card-outline', label: 'Card Controls' },
        { icon: 'document-text-outline', label: 'Statements & Documents' },
        { icon: 'chatbubble-ellipses-outline', label: 'Contact Us' },
        { icon: 'help-circle-outline', label: 'Help Centre' },
      ]}
    />
  );
}
