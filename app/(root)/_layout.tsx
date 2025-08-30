import { Stack } from 'expo-router'
import React from 'react'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name='driver' options={{ headerShown: false }} />
      <Stack.Screen name='user' options={{ headerShown: false }} />
      <Stack.Screen name='order-details' options={{ headerShown: false }} />
    </Stack>
  )
}
