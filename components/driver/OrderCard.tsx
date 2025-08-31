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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
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
import { Order } from "@/types";
import { createOffer } from "@/redux/slices/OfferSlice";
import { useOfferSocket } from "@/sockets/sockets/useOfferSocket";
import { useOrderSocket } from "@/sockets/sockets/useOrderSocket";
import { fetchDriverOrders, removeOrder } from "@/redux/slices/OrderSlice";
import { router } from "expo-router";

export const OrderCard = ({
  from,
  to,
  weight,
  dateTime,
  type,
  vehicle,
  orderDetails,
}: {
  from: string;
  to: string;
  weight: string;
  dateTime: string;
  type: string;
  vehicle: string;
  orderDetails: Order;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [lastSubmittedOrderId, setLastSubmittedOrderId] = useState<string | null>(null);

  const { status: offersStatus, error: offersError } = useSelector((state: RootState) => state.offers);

  const { control, handleSubmit, watch, reset } = useForm<{ amount: string }>({
    defaultValues: { amount: "" },
  });
  useOfferSocket();
  useOrderSocket();
  const amountValue = watch("amount");

  useEffect(() => {
    if (offersStatus === "succeeded" && lastSubmittedOrderId === orderDetails.id) {
      setConfirmationVisible(true);
      setModalVisible(false);
      reset({ amount: "" });
      dispatch(removeOrder(orderDetails.id));
      router.push("/(root)/driver/requests")
    }
    if (offersStatus === "failed" && offersError && lastSubmittedOrderId === orderDetails.id) {
      console.error("Offer submission error:", offersError);
      alert(`${offersError}`);
    }
  }, [offersStatus, offersError, orderDetails.id, lastSubmittedOrderId, reset, dispatch]);

  useEffect(() => {
    if (confirmationVisible) {
      const timer = setTimeout(() => {
        setConfirmationVisible(false);
        setLastSubmittedOrderId(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [confirmationVisible]);

  const handleOfferSubmit = async (data: { amount: string }) => {
    const amount = parseFloat(data.amount);
    if (isNaN(amount)) {
      alert("Please enter a valid number for the price");
      return;
    }

    setLastSubmittedOrderId(orderDetails.id);

    await dispatch(
      createOffer({
        order_id: orderDetails.id,
        price: amount,
      }) as any
    );
    await dispatch(fetchDriverOrders());
  };

  const formatDateTime = (dateTime: string | Date | undefined): string => {
    if (!dateTime) return "غير محدد";

    try {
      const date = typeof dateTime === "string" ? new Date(dateTime) : dateTime;
      if (isNaN(date.getTime())) return "غير محدد";

      return new Intl.DateTimeFormat("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(date);
    } catch (error) {
      console.error("Date formatting error:", error);
      return "غير محدد";
    }
  };

  const displayDate = formatDateTime(dateTime);

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

      <View style={styles.rowBetween}>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Text style={styles.text}>{weight}</Text>
          <WeightFurnIcon />
        </View>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Text style={styles.text}>{displayDate}</Text>
          <ClockIconMini />
        </View>
      </View>

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
            onPress={handleSubmit(handleOfferSubmit)}
          >
            {offersStatus === "loading" && lastSubmittedOrderId === orderDetails.id ? (
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
              rules={{
                required: true,
                validate: (value) =>
                  !isNaN(parseFloat(value)) || "Please enter a valid number",
              }}
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
      <View>{renderCardContent(false, false)}</View>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>{renderCardContent(true, true)}</View>
      </Modal>
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
