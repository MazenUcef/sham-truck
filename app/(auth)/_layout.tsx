import React from 'react'
import { Stack } from 'expo-router'

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name='signup' options={{ headerShown: false }} />
            <Stack.Screen name='forget' options={{ headerShown: false }} />
            <Stack.Screen name='details' options={{ headerShown: false }} />
            <Stack.Screen name='index' options={{ headerShown: false }} />
        </Stack>
    )
}
