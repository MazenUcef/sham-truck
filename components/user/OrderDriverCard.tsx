import DashedDividerIcon from "@/assets/icons/Driver/DashedDivider";
import ConfirmationIcon from "@/assets/icons/user/ConfirmationIcon";
import ProductIcon from "@/assets/icons/user/OneProcuct";
import { useOfferSocket } from "@/sockets/sockets/useOfferSocket";
import { useOrderSocket } from "@/sockets/sockets/useOrderSocket";
import { router } from "expo-router";
import { Clock, LocateFixed, MapPin, Weight } from "lucide-react-native";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import ThemedText from "../ui/ThemedText";





export const OrderDriverCard = ({
  from,
  to,
  weight,
  dateTime,
  type,
  orderId,
  status
}: {
  from: string;
  to: string;
  weight: string;
  dateTime: string;
  type: string;
  orderId: string;
  status: string
}) => {
  useOfferSocket()
  useOrderSocket()
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
        {status === "Pending" ?
          (
            <ProductIcon />
          )
          :
          (
            <ConfirmationIcon />
          )
        }
        <View
          style={{
            alignItems: "flex-end",
            justifyContent: 'center',
            marginBottom: 17,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <ThemedText weight="semiBold" style={styles.text}>{from}</ThemedText>
              <ThemedText weight="bold" style={[styles.text, { color: 'blue' }]}>من : </ThemedText>
            </View>
            <LocateFixed stroke={'#999'} width={22} height={22} />
          </View>
          <View style={{ marginRight: 11 }}>
            <DashedDividerIcon />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <ThemedText weight="semiBold" style={styles.text}>{to}</ThemedText>
              <ThemedText weight="bold" style={[styles.text, { color: 'red' }]}>الي : </ThemedText>
            </View>
            <MapPin stroke={'#999'} width={22} height={22} />
          </View>
        </View>
      </View>

      {/* Weight + Date */}
      <View style={styles.rowBetween}>
        <View style={{ flexDirection: "row", gap: 12, alignItems: 'center' }}>
          <ThemedText style={styles.text}>{weight}</ThemedText>
          <Weight stroke={'#999'} width={20} height={20} />
        </View>
        <View style={{ flexDirection: "row", gap: 12, alignItems: 'center' }}>
          <ThemedText style={styles.text}>{dateTime}</ThemedText>
          <Clock stroke={'#999'} width={20} height={20} />
        </View>
      </View>

      <TouchableOpacity
        style={styles.buttonOutline}
        onPress={() =>
          router.push(`/(root)/order-details/${orderId}`)
        }
      >
        <ThemedText weight="bold" style={styles.buttonOutlineText}>عرض التفاصيل</ThemedText>
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
