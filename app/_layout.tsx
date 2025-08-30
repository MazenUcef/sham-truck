import store, { persistor } from "@/redux/store";
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Cairo-Regular': require('../assets/fonts/Cairo/static/Cairo-Regular.ttf'),
    'Cairo-Medium': require('../assets/fonts/Cairo/static/Cairo-Medium.ttf'),
    'Cairo-Bold': require('../assets/fonts/Cairo/static/Cairo-Bold.ttf'),
    'Cairo-SemiBold': require('../assets/fonts/Cairo/static/Cairo-SemiBold.ttf'),
    'Cairo-Light': require('../assets/fonts/Cairo/static/Cairo-Light.ttf'),
    'Cairo-ExtraLight': require('../assets/fonts/Cairo/static/Cairo-ExtraLight.ttf'),
    'Cairo-Black': require('../assets/fonts/Cairo/static/Cairo-Black.ttf'),
    'Cairo-ExtraBold': require('../assets/fonts/Cairo/static/Cairo-ExtraBold.ttf'),
    'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
