import { OfferUserCard } from "@/components/user/OfferUserCard";
import { clearError, fetchRouterOrders } from "@/redux/slices/OrderSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Order } from "@/types";
import React, { useEffect } from "react";
import {
  Alert,
  FlatList,
  Text,
  View,
} from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from "react-redux";

const SkeletonOfferUserCard = () => {
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View style={{ width: 24, height: 24, backgroundColor: "#E4E4E4", borderRadius: 4 }} />
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
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={{ height: 16, width: 80, backgroundColor: "#E4E4E4", borderRadius: 4 }} />
            <View style={{ width: 24, height: 24, backgroundColor: "#E4E4E4", borderRadius: 4 }} />
          </View>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={{ height: 16, width: 100, backgroundColor: "#E4E4E4", borderRadius: 4 }} />
            <View style={{ width: 24, height: 24, backgroundColor: "#E4E4E4", borderRadius: 4 }} />
          </View>
        </View>
        <View style={{ marginTop: 16, height: 40, width: 120, backgroundColor: "#E4E4E4", borderRadius: 8, alignSelf: "flex-end" }} />
      </View>
    </Animated.View>
  );
};

const Requests = () => {
  const { orders, status: ordersStatus, error: ordersError } = useSelector((state: RootState) => state.orders);
  const dispatch = useDispatch<AppDispatch>();

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

  useEffect(() => {
    dispatch(fetchRouterOrders());
  }, [dispatch]);

  useEffect(() => {
    if (ordersStatus === "failed" && ordersError) {
      Alert.alert(
        "Error",
        ordersError,
        [
          {
            text: "OK",
            onPress: () => dispatch(clearError()),
          },
        ]
      );
    }
  }, [ordersStatus, ordersError, dispatch]);

  const renderOrderItem = ({ item }: { item: Order }) => {
    if (!item) return null;

    return (
      <OfferUserCard
        type={item.vehicle_type?.category || "غير محدد"}
        from={item.from_location || "غير محدد"}
        to={item.to_location || "غير محدد"}
        weight={item.weight_or_volume || "غير محدد"}
        dateTime={formatDateTime(item.date_time_transport) || formatDateTime(item.createdAt) || "غير محدد"}
        orderId={item.id}
        status={item.status || "غير محدد"}
      />
    )
  };

  return (
    <View style={{ backgroundColor: "#F9844A", flex: 1, paddingTop: 84 }}>
      <View
        style={{
          marginBottom: 40,
          flexDirection: "row",
          justifyContent: "center",
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
          الطلبات
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
        <View style={{ marginBottom: 60 }}>
          {ordersStatus === "loading" ? (
            [1, 2, 3].map((skelton) => (
              <SkeletonOfferUserCard key={skelton} />
            ))
          ) : ordersError ? (
            <Text style={{ textAlign: "center", color: "red" }}>Error: {ordersError}</Text>
          ) : orders && orders.length === 0 ? (
            <Text style={{ textAlign: "center", color: "#878A8E" }}>لا توجد طلبات متاحة</Text>
          ) : (
            <FlatList
              data={orders || []}
              renderItem={renderOrderItem}
              keyExtractor={(item, index) => item?.id || `order-${index}`}
              contentContainerStyle={{ paddingBottom: 16 }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Requests;