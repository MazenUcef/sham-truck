import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CenterPointIconSmall from "@/assets/icons/Driver/CenterPointIconSmall";
import ClockIconMini from "@/assets/icons/Driver/ClockIconMini";
import ConfirmationIcon from "@/assets/icons/Driver/ConfirmationIcon";
import DashedDividerIcon from "@/assets/icons/Driver/DashedDivider";
import PositionIcon from "@/assets/icons/Driver/PositionIcon";
import RightIcon from "@/assets/icons/Driver/RightIcon";
import TruckIconSmall from "@/assets/icons/Driver/TruckIconSmall";
import WeightFurnIcon from "@/assets/icons/Driver/WeightFurnIcon";
import TypeDFurnIcon from "@/assets/icons/Driver/TypeFurnIcon";
import { Images } from "@/constants";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { AppDispatch, RootState } from "@/redux/store";
import SelectedOfferDetails from "@/components/user/SelectedOfferDetails";
import OffersList from "@/components/user/OffersList";
import DeleteConfirmationModal from "@/components/user/DeleteConfirmationModal";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Offer, Order } from "@/types";
import { clearError as clearOrdersError, getOrderById } from "@/redux/slices/OrdersSlice";
import { acceptOffer, clearError as clearOffersError, getOrderOffers } from "@/redux/slices/OfferSlice";
import { getVehicleTypeById } from "@/redux/slices/VehicleTypesSlice";
import LeftIcon from "@/assets/icons/Auth/LeftIcon";

const OrderDetails = () => {
  const { id } = useLocalSearchParams();
  console.log("id", id);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const dispatch = useDispatch<AppDispatch>();
  const [order, setOrder] = useState<Order | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { status: orderStatus, error: orderError } = useSelector((state: RootState) => state.orders);
  const { vehicleType: tyo } = useSelector((state: RootState) => state.vehicleTypes);
  const { status: offersStatus, error: offersError, offers: fetchedOffers } = useSelector((state: RootState) => state.offers);
  console.log("fetched offers", fetchedOffers);
  console.log("tyo", tyo);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (typeof id === "string") {
        try {
          const action = await dispatch(getOrderById(id));
          const fetchedOrder = action.payload as Order;
          setOrder(fetchedOrder);
          await dispatch(getOrderOffers(id));
        } catch (err) {
          console.error("Failed to fetch order details:", err);
        }
      }
    };
    fetchOrderDetails();
  }, [id, dispatch]);


  const handleAcceptOffer = async (offer: Offer) => {
    if (typeof id === "string") {
      try {
        await dispatch(acceptOffer(offer._id)).unwrap();
        setSelectedOffer(offer);
        alert("تم قبول العرض بنجاح ✅");
      } catch (err: any) {
        console.error("Failed to accept offer:", err);
        alert("فشل في قبول العرض: " + (err || "خطأ غير معروف"));
      }
    }
  };

  const handleDeleteOrder = async () => {
    if (typeof id === "string") {
      try {
        // Implement API call to delete order
        // Example: await apiService.delete(`/api/orders/${id}`);
        setModalVisible(false);
        router.back();
      } catch (err) {
        console.error("Failed to delete order:", err);
        alert("فشل في حذف الطلب: " + (err || "خطأ غير معروف"));
      }
    }
  };

  const SkeletonOrderDetails = () => {
    const opacity = useSharedValue(0.3);
    const animatedStyle = useAnimatedStyle(() => ({
      opacity: withTiming(opacity.value, { duration: 1000 }),
    }));

    useEffect(() => {
      opacity.value = withTiming(0.3, { duration: 1000 }, () => {
        opacity.value = withTiming(1, { duration: 1000 });
      });
    }, []);

    return (
      <Animated.View style={[animatedStyle]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
          <View />
          <View style={{ height: 16, width: 100, backgroundColor: "#E4E4E4", borderRadius: 4 }} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-end", width: "100%" }}>
          <View style={{ flexDirection: "column", alignItems: "flex-end", marginBottom: 17 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <View style={{ height: 16, width: 120, backgroundColor: "#E4E4E4", borderRadius: 4 }} />
              <View style={{ width: 24, height: 24, backgroundColor: "#E4E4E4", borderRadius: 4 }} />
            </View>
            <View style={{ marginRight: 7.2, height: 24, width: 1, backgroundColor: "#E4E4E4" }} />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <View style={{ height: 16, width: 120, backgroundColor: "#E4E4E4", borderRadius: 4 }} />
              <View style={{ width: 24, height: 24, backgroundColor: "#E4E4E4", borderRadius: 4 }} />
            </View>
          </View>
        </View>
        <View style={{ width: "100%", backgroundColor: "#E4E4E4", height: 1 }} />
        <View style={{ marginVertical: 16, alignSelf: "flex-end" }}>
          <View style={{ height: 16, width: 120, backgroundColor: "#E4E4E4", borderRadius: 4 }} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={{ height: 16, width: 80, backgroundColor: "#E4E4E4", borderRadius: 4 }} />
            <View style={{ width: 24, height: 24, backgroundColor: "#E4E4E4", borderRadius: 4 }} />
          </View>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={{ height: 16, width: 100, backgroundColor: "#E4E4E4", borderRadius: 4 }} />
            <View style={{ width: 24, height: 24, backgroundColor: "#E4E4E4", borderRadius: 4 }} />
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={{ height: 16, width: 80, backgroundColor: "#E4E4E4", borderRadius: 4 }} />
            <View style={{ width: 24, height: 24, backgroundColor: "#E4E4E4", borderRadius: 4 }} />
          </View>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={{ height: 16, width: 100, backgroundColor: "#E4E4E4", borderRadius: 4 }} />
            <View style={{ width: 24, height: 24, backgroundColor: "#E4E4E4", borderRadius: 4 }} />
          </View>
        </View>
      </Animated.View>
    );
  };

  const SkeletonOffersList = () => {
    const opacity = useSharedValue(0.3);
    const animatedStyle = useAnimatedStyle(() => ({
      opacity: withTiming(opacity.value, { duration: 1000 }),
    }));

    useEffect(() => {
      opacity.value = withTiming(0.3, { duration: 1000 }, () => {
        opacity.value = withTiming(1, { duration: 1000 });
      });
    }, []);

    return (
      <Animated.View style={[animatedStyle]}>
        <View style={{ marginTop: 48, alignSelf: "flex-end" }}>
          <View style={{ height: 16, width: 150, backgroundColor: "#E4E4E4", borderRadius: 4 }} />
        </View>
        <View
          style={{
            height: 92,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#E4E4E4",
            paddingVertical: 8,
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
            marginTop: 16,
          }}
        >
          <View
            style={{
              width: 124,
              height: 42,
              borderRadius: 8,
              backgroundColor: "#E4E4E4",
            }}
          />
          <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
            <View style={{ gap: 4, alignItems: "flex-end" }}>
              <View style={{ height: 16, width: 100, backgroundColor: "#E4E4E4", borderRadius: 4 }} />
              <View style={{ height: 12, width: 50, backgroundColor: "#E4E4E4", borderRadius: 4, marginTop: 4 }} />
              <View style={{ height: 16, width: 80, backgroundColor: "#E4E4E4", borderRadius: 4, marginTop: 4 }} />
            </View>
            <View style={{ width: 64, height: 64, backgroundColor: "#E4E4E4", borderRadius: 8 }} />
          </View>
        </View>
      </Animated.View>
    );
  };

  if (orderStatus === "failed") {
    return Alert.alert("Error :", orderError || "حدث خطأ", [{
      text: "OK",
      onPress: () => dispatch(clearOrdersError())
    }]);
  }

  if (offersStatus === "failed") {
    return Alert.alert("Error :", offersError || "حدث خطأ  ", [{
      text: "OK",
      onPress: () => dispatch(clearOffersError())
    }]);
  }




  const formatDateTime = (dateTime: string | Date | undefined): string => {
    if (!dateTime) return "غير محدد";

    try {
      const date = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;
      if (isNaN(date.getTime())) return "غير محدد";

      return new Intl.DateTimeFormat('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(date);
    } catch (error) {
      console.error("Date formatting error:", error);
      return "غير محدد";
    }
  };


  const displayDate = formatDateTime(order?.date_time_transport || order?.createdAt);

  return (
    <View style={{ backgroundColor: "#F9844A", flex: 1, paddingTop: 84 }}>
      <View
        style={{
          marginBottom: 40,
          flexDirection: "row",
          alignSelf: "flex-start",
          gap:105,
          marginLeft: 29,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <LeftIcon />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 18,
            lineHeight: 24,
            color: "white",
          }}
        >
          تفاصيل الطلب
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
        {orderStatus === "loading" || offersStatus === "loading" || !order ? (
          <>
            <SkeletonOrderDetails />
            <SkeletonOffersList />
            <SkeletonOffersList />
          </>
        ) : (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <View />
              <View>
                <Text style={{ fontWeight: "700", fontSize: 16 }}>تفاصيل رحلة</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "flex-end",
                  marginBottom: 17,
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
                >
                  <Text style={styles.text}>{order.from_location}</Text>
                  <CenterPointIconSmall />
                </View>
                <View style={{ marginRight: 7.2 }}>
                  <DashedDividerIcon />
                </View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
                >
                  <Text style={styles.text}>{order.to_location}</Text>
                  <PositionIcon />
                </View>
              </View>
            </View>
            <View
              style={{ width: "100%", backgroundColor: "#E4E4E4", height: 1 }}
            />
            <View style={{ marginVertical: 16, alignSelf: "flex-end" }}>
              <Text style={{ fontWeight: "700", fontSize: 16 }}>معلومات الرحلة</Text>
            </View>
            <View style={styles.rowBetween}>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <Text style={styles.text}>{`${order.weight_or_volume} طن`}</Text>
                <WeightFurnIcon />
              </View>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <Text style={styles.text}>
                  {displayDate || "غير محدد"}
                </Text>
                <ClockIconMini />
              </View>
            </View>

            <View style={[styles.rowBetween, { marginTop: 16 }]}>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <Text style={styles.text}>
                  {typeof order.vehicle_type === "string"
                    ? tyo?.type
                    : order.vehicle_type?.type || "شاحنة عادية"}
                </Text>
                <TruckIconSmall width={16} height={16} color={"gray"} />
              </View>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <Text style={styles.text}>{order.notes || "غير محدد"}</Text>
                <TypeDFurnIcon />
              </View>
            </View>

            {selectedOffer ? (
              <SelectedOfferDetails
                selectedOffer={{
                  ...(selectedOffer as Offer),
                  $id: (selectedOffer as any)?.$id ?? "",
                  driverId: (selectedOffer as any)?.driverId ?? "",
                  driverName: (selectedOffer as any)?.driverName ?? "",
                }}
              />
            ) : (
              <OffersList offers={fetchedOffers} />
            )}
          </>
        )}
      </View>
      <DeleteConfirmationModal
        onCancel={() => setModalVisible(false)}
        visible={modalVisible}
        onConfirm={handleDeleteOrder}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  tabText: {
    color: "#878A8E",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "right",
  },
  closeButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#878A8E",
  },
  text: { fontWeight: "500", fontSize: 14, color: "#11171A" },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
  confirmText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
});

export default OrderDetails;
