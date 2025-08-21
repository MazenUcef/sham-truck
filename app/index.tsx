import { Images } from "@/constants";
import { RootState } from "@/redux/store";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";

interface UserProps {
  role: "driver" | "user";
}

export default function SplashScreen() {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        if (role === "user") {
          router.replace('/(root)/user/home')
        } else {
          router.replace('/(root)/driver/home')
        }

      }
      router.replace("/(auth)")
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