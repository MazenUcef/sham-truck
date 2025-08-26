import { Images } from "@/constants";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)")
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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