import HelpIcon from "@/assets/icons/Driver/HelpIcon";
import LogoutIcon from "@/assets/icons/Driver/LogoutIcon";
import PolicyIcon from "@/assets/icons/Driver/PolicyIcon";
import ToRightIcon from "@/assets/icons/Driver/ToRightIcon";
import TruckIcon from "@/assets/icons/Driver/TruckIcon";
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
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";



export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth)
  return (
    <View style={{ backgroundColor: "#F9844A", flex: 1, paddingTop: 84 }}>
      <View style={{ marginBottom: 40, flexDirection: "row", alignSelf: "center" }}>
        <Text style={{ fontWeight: "700", fontSize: 18, lineHeight: 24, color: "white" }}>
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
            <Text style={{ fontWeight: "700", fontSize: 18 }}>{user?.fullName}</Text>
            <Text style={{ fontWeight: "500", fontSize: 16 }}>سائق</Text>
          </View>
          <View>
            <Image
              source={
                user && user.role === "driver" && user.photo
                  ? { uri: user.photo }
                  : Images.userImg
              }
              style={{ width: 100, height: 100, borderRadius: 999 }}
            />
          </View>
        </View>
        <View style={{ marginBottom: 64, gap: 24 }}>
          <TouchableOpacity
            onPress={() => router.push({
              pathname: "/(root)/driver/profile/profile-page",
              // params: { role: user?.role || 'user' }
            })}
            style={{ height: 66, borderRadius: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", borderWidth: 1, borderColor: "#E4E4E4", paddingVertical: 20, paddingHorizontal: 16 }}
          >
            <ToRightIcon />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Text style={{ fontWeight: 800, fontSize: 14, color: "#11171A" }}>البيانات الشخصية</Text>
              <UserIcon />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(root)/driver/profile/vehicle-info")}
            style={{ height: 66, borderRadius: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", borderWidth: 1, borderColor: "#E4E4E4", paddingVertical: 20, paddingHorizontal: 16 }}
          >
            <ToRightIcon />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Text style={{ fontWeight: 800, fontSize: 14, color: "#11171A" }}>معلومات الشاحنة</Text>
              <TruckIcon />
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
              await dispatch(logout());
              router.replace("/(auth)");
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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  tabContainer: {
    width: "100%",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#0077B6",
  },
  tabText: {
    color: "#878A8E",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "right",
  },
  activeTabText: {
    color: "white",
  },
  vehicleTypesContainer: {
    marginVertical: 10,
    width: "100%",
  },
  vehicleTypeItem: {
    height: 76,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E4E4E4",
    borderRadius: 8,
    marginBottom: 12,
  },
  closeButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#878A8E",
  },
  closeButtonText: {
    color: "#878A8E",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 16,
  },
  signInButton: {
    marginTop: 24,
    height: 46,
    backgroundColor: "#F9844A",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  signInButtonText: {
    fontWeight: "800",
    fontSize: 12,
    color: "white",
  },
});