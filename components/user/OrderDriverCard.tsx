import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import CenterPointIconSmall from "@/assets/icons/Driver/CenterPointIconSmall";
import ClockIconMini from "@/assets/icons/Driver/ClockIconMini";
import DashedDividerIcon from "@/assets/icons/Driver/DashedDivider";
import PositionIcon from "@/assets/icons/Driver/PositionIcon";
import WeightFurnIcon from "@/assets/icons/Driver/WeightFurnIcon";
import ProductIcon from "@/assets/icons/user/OneProcuct";
import { router } from "expo-router";

export const OrderDriverCard = ({
  from,
  to,
  weight,
  dateTime,
  type,
}: {
  from: string;
  to: string;
  weight: string;
  dateTime: string;
  type: string;
}) => {
  const renderCardContent = (showExtraRow = false, showForm = false) => (
    <View
      style={{
        width: 364,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E4E4E4",
        paddingVertical: 16,
        paddingHorizontal: 20,
        flexDirection: "column",
        alignItems: "flex-end",
        marginBottom: 12,
        backgroundColor: "white",
      }}
    >
      {/* From → To */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <ProductIcon />
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-end",
            marginBottom: 17,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Text style={styles.text}>{from}</Text>
            <CenterPointIconSmall />
          </View>
          <View style={{ marginRight: 7.2 }}>
            <DashedDividerIcon />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Text style={styles.text}>{to}</Text>
            <PositionIcon />
          </View>
        </View>
      </View>

      {/* Weight + Date */}
      <View style={styles.rowBetween}>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Text style={styles.text}>{weight}</Text>
          <WeightFurnIcon />
        </View>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Text style={styles.text}>{dateTime}</Text>
          <ClockIconMini />
        </View>
      </View>

      <TouchableOpacity
        style={styles.buttonOutline}
        onPress={() =>
          router.push({
            pathname: "/user/home/order-details/[id]",
            params: { id: 1233 },
          })
        }
      >
        <Text style={styles.buttonOutlineText}>عرض التفاصيل</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      {/* Normal Card */}
      {renderCardContent(false, false)}
    </>
  );
};

const styles = StyleSheet.create({
  text: { fontWeight: "500", fontSize: 14, color: "#11171A" },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonOutline: {
    width: "100%",
    backgroundColor: "#0077B6",
    height: 46,
    borderRadius: 8,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonOutlineText: {
    fontWeight: "800",
    fontSize: 14,
    color: "white",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: 174,
    height: 46,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    height: "100%",
    textAlign: "right",
    paddingHorizontal: 8,
  },
  buttonFilled: {
    width: 174,
    height: 46,
    borderRadius: 8,
    backgroundColor: "#0077B6",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  buttonFilledText: {
    fontWeight: "800",
    fontSize: 12,
    color: "white",
    marginRight: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  confirmBox: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 8,
    textAlign: "center",
  },
  confirmText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
});
