import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Images } from "@/constants";
import ConfirmationIcon from "@/assets/icons/Driver/ConfirmationIcon";


interface Offer {
  $id: string;
  driverId: string;
  driverName: string;
  price: number;
  driverImage?: string;
}

interface OffersListProps {
  offers: Offer[];
  handleAcceptOffer: (offer: Offer) => void;
}

const OffersList: React.FC<OffersListProps> = ({ offers, handleAcceptOffer }) => {
  return (
    <>
      <View style={{ marginTop: 48, alignSelf: "flex-end" }}>
        <Text style={{ fontWeight: "700", fontSize: 16 }}>
          العروض المقدمة ({offers.length})
        </Text>
      </View>
      {offers.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 16, color: "#878A8E" }}>
          لا توجد عروض متاحة حالياً
        </Text>
      ) : (
        offers.map((offer) => (
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
                <Text style={{ fontWeight: "800", fontSize: 14 }}>
                  {`${offer.price} ليرة سورية`}
                </Text>
              </View>
              <Image
                source={offer.driverImage ? { uri: offer.driverImage } : Images.userImg}
                style={{ width: 64, height: 64 }}
                resizeMode="cover"
              />
            </View>
          </View>
        ))
      )}
    </>
  );
};

export default OffersList;