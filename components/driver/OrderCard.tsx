import React, { useEffect, useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CenterPointIconSmall from "@/assets/icons/Driver/CenterPointIconSmall";
import ClockIconMini from "@/assets/icons/Driver/ClockIconMini";
import DashedDividerIcon from "@/assets/icons/Driver/DashedDivider";
import PositionIcon from "@/assets/icons/Driver/PositionIcon";
import TruckIconSmall from "@/assets/icons/Driver/TruckIconSmall";
import WeightFurnIcon from "@/assets/icons/Driver/WeightFurnIcon";
import TrueFurnIcon from "@/assets/icons/Driver/TrueFurnIcon";
import PriceInputIcon from "@/assets/icons/Driver/PriceInputIcon";
import ConfirmationStartIcon from "@/assets/icons/Driver/ConfrimationStarIcon";
import TypeDFurnIcon from "@/assets/icons/Driver/TypeFurnIcon";

export const OrderCard = ({
  from,
  to,
  weight,
  dateTime,
  type,
  vehicle,
  onOfferSubmit,
  orderDetails,
}: {
  from: string;
  to: string;
  weight: string;
  dateTime: string;
  type: string;
  vehicle: string;
  onOfferSubmit: (data: { amount: number }, orderDetails: any) => void;
  orderDetails: any;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [lastSubmittedOrderId, setLastSubmittedOrderId] = useState<string | null>(null);
  const { status: offersStatus, error: offersError } = useSelector((state: RootState) => state.offers);

  const { control, handleSubmit, watch, reset } = useForm<{ amount: string }>({
    defaultValues: { amount: "" },
  });

  const amountValue = watch("amount");

  useEffect(() => {
    console.log("Offers Status:", offersStatus, "Error:", offersError, "Order ID:", orderDetails._id);
    if (offersStatus === "succeeded" && lastSubmittedOrderId === orderDetails._id) {
      setConfirmationVisible(true);
      setModalVisible(false);
      reset({ amount: "" });
    }
    if (offersStatus === "failed" && offersError && lastSubmittedOrderId === orderDetails._id) {
      console.error("Offer submission error:", offersError);
      alert(`Error submitting offer: ${offersError}`);
    }
  }, [offersStatus, offersError, orderDetails._id, lastSubmittedOrderId, reset]);

  useEffect(() => {
    if (confirmationVisible) {
      const timer = setTimeout(() => {
        setConfirmationVisible(false);
        setLastSubmittedOrderId(null); // Clear the last submitted order ID
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [confirmationVisible]);

  const onSubmit = (data: { amount: string }) => {
    const amount = parseFloat(data.amount);
    if (isNaN(amount)) {
      alert("Please enter a valid number for the price");
      return;
    }
    setLastSubmittedOrderId(orderDetails._id); // Track the order ID being submitted
    onOfferSubmit({ amount }, orderDetails);
  };

  const renderCardContent = (showExtraRow = false, showForm = false) => (
    <View
      style={{
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
      {showExtraRow && (
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={{ marginBottom: 12, alignSelf: "flex-start" }}
        >
          <Text style={{ color: "gray" }}>إغلاق</Text>
        </TouchableOpacity>
      )}
      {/* From → To */}
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

      {/* Vehicle + Type (only in modal) */}
      {showExtraRow && (
        <View style={[styles.rowBetween, { marginTop: 16 }]}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Text style={styles.text}>{vehicle}</Text>
            <TruckIconSmall width={16} height={16} color={"gray"} />
          </View>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Text style={styles.text}>{type}</Text>
            <TypeDFurnIcon />
          </View>
        </View>
      )}

      {!showForm ? (
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonOutlineText}>عرض التفاصيل</Text>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            width: "100%",
            marginTop: 16,
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={[styles.buttonFilled, { opacity: amountValue ? 1 : 0.5 }]}
            disabled={!amountValue || offersStatus === "loading"}
            onPress={handleSubmit(onSubmit)}
          >
            {offersStatus === "loading" && lastSubmittedOrderId === orderDetails._id ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.buttonFilledText}>تقديم العرض</Text>
                <TrueFurnIcon />
              </>
            )}
          </TouchableOpacity>

          <View style={styles.inputWrapper}>
            <PriceInputIcon />
            <Controller
              control={control}
              name="amount"
              rules={{ required: true, validate: (value) => !isNaN(parseFloat(value)) || "Please enter a valid number" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="السعر المراد عرضه"
                  placeholderTextColor={"#878A8E"}
                  keyboardType="numeric"
                  style={styles.input}
                />
              )}
            />
          </View>
        </View>
      )}
    </View>
  );

  return (
    <>
      {/* Normal Card */}
      {renderCardContent(false, false)}

      {/* Details Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          {renderCardContent(true, true)}
        </View>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        visible={confirmationVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmationVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmBox}>
            <ConfirmationStartIcon color={"black"} />
            <Text style={styles.confirmTitle}>تم تقديم عرضك للطلب بنجاح</Text>
          </View>
        </View>
      </Modal>
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
        height: 46,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#F9844A",
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonOutlineText: {
        fontWeight: "800",
        fontSize: 14,
        color: "#F9844A",
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
