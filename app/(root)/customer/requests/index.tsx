import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { OfferCustomerCard } from "@/components/customer/OfferCustomerCard";
import { Images } from "@/constants";
import useOrders, { Order } from "@/hooks/useOrders";

const Requests = () => {
  const { orders, loading, error, fetchOrders } = useOrders();

  useEffect(() => {
    // Fetch orders for the current customer (assuming customerId is available)
    // Replace 'currentCustomerId' with actual customer ID from auth context or similar
    fetchOrders({ customerId: 'currentCustomerId' });
  }, []);

  const renderOrderItem = ({ item }: { item: Order }) => (
    <View>
      <Text
        style={{
          fontWeight: 700,
          fontSize: 18,
          color: "white",
          alignSelf: "flex-end",
        }}
      >
        طلباتك
      </Text>
      <OfferCustomerCard
        type={item.items[0]?.name || "غير محدد"}
        from={item.pickupLocation.address}
        to={item.deliveryLocation.address}
        weight={`${item.totalWeight} طن`}
        dateTime={item.preferredDeliveryTime || item.createdAt || "غير محدد"}
      />
    </View>
  );

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
        {loading ? (
          <View style={{ alignItems: "center", paddingTop: 166 }}>
            <Text style={{ fontSize: 18, color: "#878A8E", fontWeight: 700 }}>
              جارٍ التحميل...
            </Text>
          </View>
        ) : error ? (
          <View style={{ alignItems: "center", paddingTop: 166 }}>
            <Text style={{ fontSize: 18, color: "#878A8E", fontWeight: 700 }}>
              حدث خطأ: {error}
            </Text>
          </View>
        ) : (
          <FlatList
            data={orders}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.$id || item.createdAt || Math.random().toString()}
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 70 }}
            ListEmptyComponent={
              <View style={{ alignItems: "center", paddingTop: 166 }}>
                <Image source={Images.emptyImg} style={{ marginBottom: 24 }} />
                <Text style={{ fontSize: 18, color: "#878A8E", fontWeight: 700 }}>
                  لم تقم بأي طلب حتى الآن
                </Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Requests;