import React, { useEffect, useState } from "react";
import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { Images, mockOffers } from "@/constants";
import { OfferCard } from "@/components/driver/OfferCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchDriverOffers } from "@/redux/slices/OfferSlice";



export default function Requests() {
  const dispatch = useDispatch<AppDispatch>();
  const { offers, status, error } = useSelector((state: RootState) => state.offers);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  // console.log("offerssss",offers[0].customer_id.phoneNumber);

  const fetchOffers = async () => {
    try {
      setIsLoading(true);
      await dispatch(fetchDriverOffers()).unwrap();
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  if (isLoading) {
    return (
      <View style={{ backgroundColor: "#F9844A", flex: 1, paddingTop: 84, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={{ color: 'white', marginTop: 16 }}>جاري تحميل العروض...</Text>
      </View>
    );
  }




  return (
    <View style={{ backgroundColor: "#F9844A", flex: 1, paddingTop: 84 }}>
      <View style={{ marginBottom: 40, flexDirection: "row", alignSelf: "center" }}>
        <Text style={{ fontWeight: 700, fontSize: 18, lineHeight: 24, color: "white" }}>
          العروض التي قدمتها
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
        {error && (
          <View style={{ padding: 16, backgroundColor: '#FFEBEE', borderRadius: 8, marginBottom: 16 }}>
            <Text style={{ color: '#D32F2F', textAlign: 'center' }}>{error}</Text>
          </View>
        )}

        <FlatList
          style={{ marginBottom: 80 }}
          data={offers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const order = typeof item.order_id === 'object' ? item.order_id : null;
console.log("loggg",order);

            return (
              <OfferCard
                customerid={order?.customer_id}
                offerId={item._id}
                status={item.status}
                type={order?.type || "غير محدد"}
                from={order?.from_location || "غير محدد"}
                to={order?.to_location || "غير محدد"}
                weight={order?.weight_or_volume || "غير محدد"}
                dateTime={order?.date_time_transport ? formatDateTime(order.date_time_transport) : "غير محدد"}
                price={item.price}
                notes={item.notes}
                originalStatus={item.status}
                vehicle_type={item.vehicle_type}
              />
            );
          }}
          ListEmptyComponent={
            <View style={{ alignItems: "center", paddingTop: 166 }}>
              <Image
                source={Images.emptyImg}
                style={{ marginBottom: 24 }}
              />
              <Text style={{ fontSize: 18, color: "#878A8E", fontWeight: 700 }}>
                لم تقم بتقديم أي عرض حتي الان
              </Text>
            </View>
          }
          refreshing={status === 'loading'}
          onRefresh={fetchOffers}
        />
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