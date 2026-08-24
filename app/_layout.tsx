import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="transactions" />
          <Stack.Screen name="transaction/[id]" />
          <Stack.Screen name="account/[id]" options={{ presentation: 'modal' }} />
          <Stack.Screen name="profile" />
          <Stack.Screen name="send" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
