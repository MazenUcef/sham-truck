import React, { useEffect } from 'react'
import { Redirect, router, Stack } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

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
