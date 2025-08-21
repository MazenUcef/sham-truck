import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
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
import HeadsetPhoneIcon from "@/assets/icons/Driver/HeadsetPhoneIcon";
import { Images } from "@/constants";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { getOrderById } from "@/redux/slices/OrdersSlice";
import TypeDFurnIcon from "@/assets/icons/Driver/TypeFurnIcon";
import { AppDispatch } from "@/redux/store";
import SelectedOfferDetails from "@/components/user/SelectedOfferDetails";
import OffersList from "@/components/user/OffersList";
import DeleteConfirmationModal from "@/components/user/DeleteConfirmationModal";
import { getOrderOffers } from "@/redux/slices/OfferSlice";

interface Offer {
  $id: string;
  driverId: string;
  driverName: string;
  price: number;
  driverImage?: string;
}

// Define Redux Offer interface for fetched data
interface ReduxOffer {
  _id: string;
  driver_id: {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    photo: string;
    vehicleNumber: string;
    vehicleType: string;
  };
  price: number;
  notes: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Order {
  _id: string;
  customer_id: {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
  };
  from_location: string;
  to_location: string;
  vehicle_type: {
    _id: string;
    type: string;
    description: string;
    image: string;
  };
  weight_or_volume: string;
  date_time_transport: string;
  loading_time: string;
  notes: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

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
  const [offers, setOffers] = useState<Offer[]>([]);
  const { status: orderStatus, error: orderError } = useSelector((state: any) => state.orders);
  const { status: offersStatus, error: offersError, offers: fetchedOffers } = useSelector((state: any) => state.offers);
console.log("fetched offers",fetchedOffers);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (typeof id === "string") {
        try {
          // Fetch order details
          const action = await dispatch(getOrderById(id));
          const fetchedOrder = action.payload as Order;

          // Map the fetched order to the expected structure
          setOrder({
            _id: fetchedOrder._id,
            customer_id: fetchedOrder.customer_id,
            from_location: fetchedOrder.from_location,
            to_location: fetchedOrder.to_location,
            vehicle_type: fetchedOrder.vehicle_type,
            weight_or_volume: fetchedOrder.weight_or_volume,
            date_time_transport: fetchedOrder.date_time_transport,
            loading_time: fetchedOrder.loading_time,
            notes: fetchedOrder.notes,
            status: fetchedOrder.status,
            createdAt: fetchedOrder.createdAt,
            updatedAt: fetchedOrder.updatedAt,
          });

          // Fetch offers for the order
          await dispatch(getOrderOffers(id));
        } catch (err) {
          console.error("Failed to fetch order details:", err);
        }
      }
    };
    fetchOrderDetails();
  }, [id, dispatch]);

  // Update local offers state when fetchedOffers from Redux changes
  useEffect(() => {
    if (fetchedOffers && fetchedOffers.length > 0) {
      setOffers(
        fetchedOffers.map((offer: ReduxOffer) => ({
          $id: offer._id,
          driverId: offer.driver_id._id,
          driverName: offer.driver_id.fullName,
          price: offer.price,
          driverImage: offer.driver_id.photo,
        }))
      );
    } else {
      setOffers([]);
    }
  }, [fetchedOffers]);

  const handleAcceptOffer = async (offer: Offer) => {
    if (typeof id === "string") {
      try {
        // Implement API call to accept offer
        // Example: await apiService.post(`/api/orders/${id}/accept-offer`, { offerId: offer.$id });
        setSelectedOffer(offer);
      } catch (err) {
        console.error("Failed to accept offer:", err);
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
      }
    }
  };

  // Handle loading and error states for both orders and offers
  if (orderStatus === "loading" || offersStatus === "loading") {
    return <Text>Loading...</Text>;
  }

  if (orderStatus === "failed") {
    return <Text>Error: {orderError}</Text>;
  }

  if (offersStatus === "failed") {
    return <Text>Error: {offersError}</Text>;
  }

  if (!order) {
    return <Text>No order found</Text>;
  }

  return (
    <View style={{ backgroundColor: "#F9844A", flex: 1, paddingTop: 84 }}>
      <View
        style={{
          marginBottom: 40,
          flexDirection: "row",
          alignSelf: "flex-end",
          gap: 85,
          marginRight: 29,
        }}
      >
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
        <TouchableOpacity onPress={() => router.back()}>
          <RightIcon />
        </TouchableOpacity>
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
              {order.date_time_transport || order.createdAt || "غير محدد"}
            </Text>
            <ClockIconMini />
          </View>
        </View>

        <View style={[styles.rowBetween, { marginTop: 16 }]}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Text style={styles.text}>{order.vehicle_type?.type || "شاحنة عادية"}</Text>
            <TruckIconSmall width={16} height={16} color={"gray"} />
          </View>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Text style={styles.text}>{order.notes || "غير محدد"}</Text>
            <TypeDFurnIcon />
          </View>
        </View>

        {selectedOffer ? (
          <SelectedOfferDetails selectedOffer={selectedOffer} />
        ) : (
          <OffersList offers={offers} handleAcceptOffer={handleAcceptOffer} />
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
