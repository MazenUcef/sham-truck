import React from 'react'
import { Stack } from 'expo-router'

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name='driver' options={{ headerShown: false }} />
            <Stack.Screen name='customer' options={{ headerShown: false }} />
        </Stack>
    )
}
