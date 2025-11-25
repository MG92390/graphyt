import { View } from 'react-native';
import { Stack } from 'expo-router';
import React from 'react';
import { style } from './screen/style';
import GoHomeButton from '@/components/navigation/GoHomeButton';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      <View style={style.scrollViewContainer}>
        <GoHomeButton />
      </View>
    </>
  );
}