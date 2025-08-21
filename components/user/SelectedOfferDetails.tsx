import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Images } from "@/constants";
import HeadsetPhoneIcon from "@/assets/icons/Driver/HeadsetPhoneIcon";

interface Offer {
    $id: string;
    driverId: string;
    driverName: string;
    price: number;
    driverImage?: string;
}

interface SelectedOfferDetailsProps {
    selectedOffer: Offer;
}

const SelectedOfferDetails: React.FC<SelectedOfferDetailsProps> = ({ selectedOffer }) => {
    return (
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
    );
};

export default SelectedOfferDetails;