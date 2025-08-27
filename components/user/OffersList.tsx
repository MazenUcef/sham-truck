import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Images } from "@/constants";
import ConfirmationIcon from "@/assets/icons/Driver/ConfirmationIcon";
import { acceptOffer } from "@/redux/slices/OfferSlice";
import { fetchRouterOrders } from "@/redux/slices/OrderSlice";
import HeadsetPhoneIcon from "@/assets/icons/Driver/HeadsetPhoneIcon";

interface OffersListProps {
  offers: any;
  handleAcceptOffer?: (offer: any) => void;
}

const OffersList: React.FC<OffersListProps> = ({ offers }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.offers);
  const [loadingOfferId, setLoadingOfferId] = useState<string | null>(null);

  console.log("fetchedOffersssss", offers);

  const handleAcceptOffer = async (offer: any) => {
    setLoadingOfferId(offer.id);
    try {
      await dispatch(acceptOffer(offer.id)).unwrap();
      alert("تم قبول العرض بنجاح ✅");
      await dispatch(fetchRouterOrders());
    } catch (error: any) {
      console.error("Accept offer failed:", error);
      alert("فشل في قبول العرض: " + (error || "خطأ غير معروف"));
    } finally {
      setLoadingOfferId(null);
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    console.log("itemmmmm",item?.driver_id?.phoneNumber);
    
    return (
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
        {
          item.status === "Pending" ?
            (
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
                onPress={() => handleAcceptOffer(item)}
                disabled={status === "loading" && loadingOfferId === item._id}
              >
                {status === "loading" && loadingOfferId === item._id ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <>
                    <Text
                      style={{ fontWeight: "800", fontSize: 14, color: "white" }}
                    >
                      الموافقة
                    </Text>
                    <ConfirmationIcon width={24} height={24} />
                  </>
                )}
              </TouchableOpacity>
            )
            :
            (
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${item?.driver_id?.phoneNumber}`)}
                style={{
                  width: 102,
                  height: 42,
                  borderRadius: 8,
                  backgroundColor: "#00CD00",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontWeight: "800", fontSize: 14, color: "white" }}
                >
                  اتصال
                </Text>
                <HeadsetPhoneIcon width={24} height={24} />

              </TouchableOpacity>
            )
        }
        <View
          style={{
            flexDirection: "row",
            gap: 12,
            alignItems: "center",
          }}
        >
          <View style={{ gap: 4, alignItems: "flex-end" }}>
            <Text style={{ fontWeight: "500", fontSize: 14 }}>
              {item.driver_id.fullName}
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
            <Text style={{ fontWeight: "800", fontSize: 14 }}>
              {`${item.price} ليرة سورية`}
            </Text>
          </View>
          <Image
            source={item.driver_id.photo ? { uri: item.driver_id.photo } : Images.userImg}
            style={{ width: 64, height: 64 }}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 48, alignSelf: "flex-end" }}>
        <Text style={{ fontWeight: "700", fontSize: 16 }}>
          العروض المقدمة ({offers.length})
        </Text>
      </View>

      <FlatList
        data={offers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
        ListEmptyComponent={
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 48 }}>
            <Image
              source={Images.emtyOffers}
              resizeMode="contain"
            />
            <Text style={{ textAlign: "center", marginTop: 24, color: "#878A8E", fontWeight: 700, fontSize: 18 }}>
              لا يوجد عروض حتي الان
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default OffersList;