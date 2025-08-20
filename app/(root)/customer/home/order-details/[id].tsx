import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import CenterPointIconSmall from "@/assets/icons/Driver/CenterPointIconSmall";
import ClockIconMini from "@/assets/icons/Driver/ClockIconMini";
import ConfirmationIcon from "@/assets/icons/Driver/ConfirmationIcon";
import DashedDividerIcon from "@/assets/icons/Driver/DashedDivider";
import PositionIcon from "@/assets/icons/Driver/PositionIcon";
import RightIcon from "@/assets/icons/Driver/RightIcon";
import TruckIconSmall from "@/assets/icons/Driver/TruckIconSmall";
import TypeDFurnIcon from "@/assets/icons/Driver/TypeFurnIcon";
import WeightFurnIcon from "@/assets/icons/Driver/WeightFurnIcon";
import HeadsetPhoneIcon from "@/assets/icons/Driver/HeadsetPhoneIcon";
import { Images } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import useOrders, { Order } from "@/hooks/useOrders";

interface Offer {
  $id: string;
  driverId: string;
  driverName: string;
  price: number;
  driverImage?: string;
}

const OrderDetails = () => {
  const { id } = useLocalSearchParams();
  const { getOrderById, assignDriverToOrder, deleteOrder, loading, error } = useOrders();
  const [order, setOrder] = useState<Order | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (typeof id === "string") {
        try {
          const orderData = await getOrderById(id);
          setOrder(orderData);
          // Mock fetching offers (replace with actual API call to fetch offers)
          const mockOffers: Offer[] = [
            {
              $id: "1",
              driverId: "driver1",
              driverName: "سيف حسن",
              price: 120,
              driverImage: Images.man,
            },
            {
              $id: "2",
              driverId: "driver2",
              driverName: "أحمد محمد",
              price: 130,
              driverImage: Images.man,
            },
          ];
          setOffers(mockOffers);
        } catch (err) {
          console.error("Failed to fetch order:", err);
        }
      }
    };
    fetchOrderDetails();
  }, [id]);

  const handleAcceptOffer = async (offer: Offer) => {
    if (typeof id === "string") {
      try {
        await assignDriverToOrder(id, offer.driverId, offer.$id);
        setSelectedOffer(offer);
      } catch (err) {
        console.error("Failed to accept offer:", err);
      }
    }
  };

  const handleDeleteOrder = async () => {
    if (typeof id === "string") {
      try {
        await deleteOrder(id);
        setModalVisible(false);
        setSelectedOffer(null);
        router.back();
      } catch (err) {
        console.error("Failed to delete order:", err);
      }
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, color: "#878A8E", fontWeight: "700" }}>
          جارٍ التحميل...
        </Text>
      </View>
    );
  }

  if (error || !order) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, color: "#878A8E", fontWeight: "700" }}>
          {error || "لم يتم العثور على الطلب"}
        </Text>
      </View>
    );
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
              <Text style={styles.text}>{order.pickupLocation.address}</Text>
              <CenterPointIconSmall />
            </View>
            <View style={{ marginRight: 7.2 }}>
              <DashedDividerIcon />
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <Text style={styles.text}>{order.deliveryLocation.address}</Text>
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
            <Text style={styles.text}>{`${order.totalWeight} طن`}</Text>
            <WeightFurnIcon />
          </View>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Text style={styles.text}>
              {order.preferredDeliveryTime || order.createdAt || "غير محدد"}
            </Text>
            <ClockIconMini />
          </View>
        </View>

        <View style={[styles.rowBetween, { marginTop: 16 }]}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Text style={styles.text}>{order.vehicleTypeId || "شاحنة عادية"}</Text>
            <TruckIconSmall width={16} height={16} color={"gray"} />
          </View>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Text style={styles.text}>{order.items[0]?.name || "غير محدد"}</Text>
            <TypeDFurnIcon />
          </View>
        </View>

        {selectedOffer ? (
          <View>
            <View
              style={{
                width: "100%",
                backgroundColor: "#E4E4E4",
                height: 1,
                marginVertical: 16,
              }}
            />
            <View>
              <View style={{ marginBottom: 16, alignSelf: "flex-end" }}>
                <Text style={{ fontWeight: "700", fontSize: 16 }}>المبلغ</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={{ fontWeight: "800", fontSize: 14 }}>
                    {`${selectedOffer.price} ليرة سورية`}
                  </Text>
                </View>
                <View>
                  <Text style={{ fontWeight: "500", fontSize: 14 }}>
                    الأجمالي
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                backgroundColor: "#E4E4E4",
                height: 1,
                marginVertical: 16,
              }}
            />
            <View>
              <View style={{ marginBottom: 16, alignSelf: "flex-end" }}>
                <Text style={{ fontWeight: "700", fontSize: 16 }}>تواصل مع السائق</Text>
              </View>
              <View
                style={{
                  height: 80,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#E4E4E4",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#00CD00",
                    width: 102,
                    height: 42,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{ fontWeight: "800", fontSize: 14, color: "white" }}
                  >
                    اتصال
                  </Text>
                  <HeadsetPhoneIcon />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text style={{ fontWeight: "500", fontSize: 14 }}>
                      {selectedOffer.driverName}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 12,
                        color: "#878A8E",
                      }}
                    >
                      سائق
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={selectedOffer.driverImage || Images.man}
                      style={{ width: 64, height: 64 }}
                      resizeMode="cover"
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <>
            <View style={{ marginTop: 48, alignSelf: "flex-end" }}>
              <Text style={{ fontWeight: "700", fontSize: 16 }}>
                العروض المقدمة ({offers.length})
              </Text>
            </View>
            {offers.map((offer) => (
              <View
                key={offer.$id}
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
                <TouchableOpacity
                  style={{
                    width: 124,
                    height: 42,
                    borderRadius: 8,
                    backgroundColor: "#0077B6",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => handleAcceptOffer(offer)}
                >
                  <Text
                    style={{ fontWeight: "800", fontSize: 14, color: "white" }}
                  >
                    الموافقة
                  </Text>
                  <ConfirmationIcon width={24} height={24} />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <View style={{ gap: 4, alignItems: "flex-end" }}>
                    <Text style={{ fontWeight: "500", fontSize: 14 }}>
                      {offer.driverName}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 12,
                        color: "#878A8E",
                      }}
                    >
                      سائق
                    </Text>
                    <Text style={{ fontWeight: "800", fontSize: 18 }}>
                      {`${offer.price} ليرة سورية`}
                    </Text>
                  </View>
                  <Image
                    source={offer.driverImage || Images.man}
                    style={{ width: 64, height: 64 }}
                    resizeMode="cover"
                  />
                </View>
              </View>
            ))}
          </>
        )}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              padding: 20,
              width: "80%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 16,
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              هل أنت متأكد من حذف الطلب؟
            </Text>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: "#FF3B30",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleDeleteOrder}
              >
                <Text
                  style={{ fontWeight: "600", fontSize: 14, color: "white" }}
                >
                  حذف
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 40,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#E4E4E4",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text
                  style={{ fontWeight: "600", fontSize: 14, color: "#11171A" }}
                >
                  إلغاء
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
