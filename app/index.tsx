import { Images } from "@/constants";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

interface UserProps {
  role: "driver" | "customer";
}

export default function SplashScreen() {
  const isAuthenticated = false;
  const role = "driver";

  useEffect(() => {
    const timer = setTimeout(() => {
      // if (!isAuthenticated) {
        router.replace("/(auth)")
      // }
      // router.replace('/(root)/customer/home')
    }, 500);

    return () => clearTimeout(timer);
  }, [isAuthenticated, role]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={Images.logo}
        style={{ width: 256, height: 256 }}
      />
    </View>
  );
}