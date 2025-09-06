import HelpIcon from "@/assets/icons/Driver/HelpIcon";
import LogoutIcon from "@/assets/icons/Driver/LogoutIcon";
import PolicyIcon from "@/assets/icons/Driver/PolicyIcon";
import ToRightIcon from "@/assets/icons/Driver/ToRightIcon";
import UserIcon from "@/assets/icons/Driver/UserIcon";
import { Images } from "@/constants";
import { logout } from "@/redux/slices/AuthSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";




export default function Profile() {
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <View style={{ backgroundColor: "#F9844A", flex: 1, paddingTop: 84 }}>
      <View style={{ marginBottom: 40, flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ fontWeight: 700, fontSize: 18, lineHeight: 24, color: "white" }}>
          الملف الشخصي
        </Text>
      </View>



      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          padding: 20,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 24, justifyContent: "flex-end", marginBottom: 24 }}>
          <View style={{ gap: 12, justifyContent: "flex-start", alignItems: "flex-end" }}>
            <Text style={{ fontWeight: 700, fontSize: 18 }}>{user?.fullName}</Text>
            <Text style={{ fontWeight: 500, fontSize: 16 }}>مستخدم</Text>
          </View>
          <View>
            <Image
              source={Images.userImg}
              style={{ width: 100, height: 100 }}
            />
          </View>
        </View>
        <View style={{ marginBottom: 64, gap: 24 }}>
          <TouchableOpacity
            onPress={() => router.push("/(root)/user/profile/profile-page")}
            style={{ height: 66, borderRadius: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", borderWidth: 1, borderColor: "#E4E4E4", paddingVertical: 20, paddingHorizontal: 16 }}
          >
            <ToRightIcon />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Text style={{ fontWeight: 800, fontSize: 14, color: "#11171A" }}>البيانات الشخصية</Text>
              <UserIcon />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(root)/privacy")}
            style={{ height: 66, borderRadius: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", borderWidth: 1, borderColor: "#E4E4E4", paddingVertical: 20, paddingHorizontal: 16 }}
          >
            <ToRightIcon />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Text style={{ fontWeight: 800, fontSize: 14, color: "#11171A" }}>الشروط و الأحكام</Text>
              <PolicyIcon />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ height: 66, borderRadius: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", borderWidth: 1, borderColor: "#E4E4E4", paddingVertical: 20, paddingHorizontal: 16 }}
          >
            <ToRightIcon />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Text style={{ fontWeight: 800, fontSize: 14, color: "#11171A" }}>تواصل معنا</Text>
              <HelpIcon />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={async () => {
              await dispatch(logout())
              router.replace("/(auth)")
            }}
            style={{ height: 66, borderRadius: 8, flexDirection: "row", alignItems: "center", justifyContent: "flex-end", width: "100%", borderWidth: 1, borderColor: "#E4E4E4", paddingVertical: 20, paddingHorizontal: 16 }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Text style={{ fontWeight: 800, fontSize: 14, color: "#E33629" }}>تسجيل الخروج</Text>
              <LogoutIcon />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}




