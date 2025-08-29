import { router, Stack } from "expo-router";
import store, { persistor } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SocketProvider } from "@/sockets/SocketContext";


export default function RootLayout() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(root)" options={{ headerShown: false }} />
          </Stack>
        </SocketProvider>
      </PersistGate>
    </Provider>
  );
}
