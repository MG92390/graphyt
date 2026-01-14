import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import 'react-native-reanimated';

import { initialWindowMetrics, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { DrawingProvider } from './context/DrawingContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <DrawingProvider>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="screen/DrawingScreen" />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </DrawingProvider >
  );
}
