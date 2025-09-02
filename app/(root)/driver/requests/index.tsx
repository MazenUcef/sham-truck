import React, { useEffect, useState } from "react";
import {
  Image,
  FlatList,
  Text,
  View,
  Animated,
} from "react-native";
import { Images } from "@/constants";
import { OfferCard } from "@/components/driver/OfferCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchDriverOffers } from "@/redux/slices/OfferSlice";
import { useOfferSocket } from "@/sockets/sockets/useOfferSocket";

const SkeletonLoader = ({ style }: { style?: any }) => {
  const fadeAnim = new Animated.Value(0.3);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        {
          backgroundColor: "#E4E4E4",
          borderRadius: 4,
        },
        style,
      ]}
    />
  );
};

const OfferCardSkeleton = () => {
  return (
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
      <View
        style={{
          marginBottom: 17,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <SkeletonLoader style={{ width: 24, height: 24, borderRadius: 12 }} />
        <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <SkeletonLoader style={{ width: 100, height: 16 }} />
            <SkeletonLoader style={{ width: 16, height: 16 }} />
          </View>
          <SkeletonLoader
            style={{ width: 30, height: 20, marginVertical: 8, marginRight: 7.2 }}
          />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <SkeletonLoader style={{ width: 100, height: 16 }} />
            <SkeletonLoader style={{ width: 16, height: 16 }} />
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View style={{ flexDirection: "row", gap: 12 }}>
          <SkeletonLoader style={{ width: 80, height: 16 }} />
          <SkeletonLoader style={{ width: 16, height: 16 }} />
        </View>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <SkeletonLoader style={{ width: 80, height: 16 }} />
          <SkeletonLoader style={{ width: 16, height: 16 }} />
        </View>
      </View>

      <View style={{ marginTop: 16 }}>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <SkeletonLoader style={{ width: 80, height: 16 }} />
          <SkeletonLoader style={{ width: 16, height: 16 }} />
        </View>
      </View>

      <View style={{ width: "100%", marginTop: 16 }}>
        <SkeletonLoader style={{ width: "100%", height: 46, borderRadius: 8 }} />
      </View>
    </View>
  );
};

export default function Requests() {
  const dispatch = useDispatch<AppDispatch>();
  const { offers, status, error } = useSelector((state: RootState) => state.offers);
  const [isLoading, setIsLoading] = useState(true);
  const { vehicleType } = useSelector((state: RootState) => state.vehicleTypes);

console.log("offffferererer",offers);

  useOfferSocket();
  
  useEffect(() => {
    fetchOffers();
  }, []);

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
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <View
        style={{
          backgroundColor: "#F9844A",
          flex: 1,
          paddingTop: 84,
        }}
      >
        <View
          style={{
            marginBottom: 40,
            flexDirection: "row",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontWeight: 700,
              fontSize: 18,
              lineHeight: 24,
              color: "white",
            }}
          >
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
          <FlatList
            data={[1, 2, 3]} // Render three skeleton cards
            keyExtractor={(item) => item.toString()}
            renderItem={() => <OfferCardSkeleton />}
            style={{ marginBottom: 80 }}
          />
        </View>
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
          <View style={{ padding: 16, backgroundColor: "#FFEBEE", borderRadius: 8, marginBottom: 16 }}>
            <Text style={{ color: "#D32F2F", textAlign: "center" }}>{error}</Text>
          </View>
        )}

        <FlatList
          style={{ marginBottom: 80 }}
          data={offers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const order = typeof item.order_id === "object" ? item.order_id : null;
            return (
              <OfferCard
                key={item.id}
                customerid={order?.customer_id || ""}
                offerId={item.id}
                status={item.status}
                type={order?.type || "غير محدد"}
                from={order?.from_location || "غير محدد"}
                to={order?.to_location || "غير محدد"}
                weight={order?.weight_or_volume || "غير محدد"}
                dateTime={order?.date_time_transport ? formatDateTime(order.date_time_transport) : "غير محدد"}
                price={item.price}
                notes={item.notes}
                originalStatus={item.status}
                vehicle_type={vehicleType?.type || "غير محدد"}
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
          refreshing={status === "loading"}
          onRefresh={fetchOffers}
        />
      </View>
    </View>
  );
}