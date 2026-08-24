import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { RoutingNumbersScreen } from '../../../screens/RoutingNumbersScreen';

export default function AccountRoutingRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <RoutingNumbersScreen accountId={String(id)} />;
}
