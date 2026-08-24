import React from 'react';
import { Tabs } from 'expo-router/js-tabs';
import { BrandTabBar, type BrandTabBarProps } from '../../components/TabBar';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BrandTabBar {...(props as unknown as BrandTabBarProps)} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="transfer" />
      <Tabs.Screen name="rewards" />
      <Tabs.Screen name="deposit" />
      <Tabs.Screen name="more" />
    </Tabs>
  );
}
