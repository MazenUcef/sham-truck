import React, { useEffect, useState } from "react";
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Linking,
} from "react-native";

import CenterPointIconSmall from "@/assets/icons/Driver/CenterPointIconSmall";
import ClockIconMini from "@/assets/icons/Driver/ClockIconMini";
import DashedDividerIcon from "@/assets/icons/Driver/DashedDivider";
import PositionIcon from "@/assets/icons/Driver/PositionIcon";
import TruckIconSmall from "@/assets/icons/Driver/TruckIconSmall";
import TypeDFurnIcon from "@/assets/icons/Driver/TypeFurnIcon";
import WeightFurnIcon from "@/assets/icons/Driver/WeightFurnIcon";
import PendingIcon from "@/assets/icons/Driver/PendingIcon";
import ExpiredIcon from "@/assets/icons/Driver/ExpiredIcon";
import CompletedIcon from "@/assets/icons/Driver/CompleteIcon";
import HeadsetPhoneIcon from "@/assets/icons/Driver/HeadsetPhoneIcon";
import MoneyIcon from "@/assets/icons/Driver/MoneyIcon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getVehicleTypeById } from "@/redux/slices/VehicleTypesSlice";

export const OfferCard = ({
    offerId,
    from,
    to,
    weight,
    dateTime,
    type,
    vehicle,
    status,
    price,
    notes,
    originalStatus,
    phoneNumber
}: {
    offerId: string;
    from: string;
    to: string;
    weight: string;
    dateTime: string;
    type: string;
    vehicle: string;
    status: string;
    price: number;
    notes?: string;
    originalStatus: string;
    phoneNumber:string
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>()
    const { vehicleType } = useSelector((state: RootState) => state.vehicleTypes)
    const { offers } = useSelector((state: RootState) => state.offers)
    const [loading, setLoading] = useState(false);
    console.log("status", status);

// console.log("phoneNumber",phoneNumber);




    useEffect(() => {
        if (confirmationVisible) {
            const timer = setTimeout(() => {
                setConfirmationVisible(false);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [confirmationVisible]);

    useEffect(() => {
        if (type) {
            dispatch(getVehicleTypeById(type));
        }
    }, [dispatch, user]);



    const handleViewDetails = () => {
        setModalVisible(true);
    };

    const renderStatusIcon = () => {
        switch (status) {
            case 'Pending':
                return <PendingIcon />;
            case 'Accepted':
                return <CompletedIcon />;
            case 'expired':
                return <ExpiredIcon />;
            default:
                return <PendingIcon />;
        }
    };

    const renderCardContent = (showExtraRow = false, showForm = false) => (
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
            <View style={{ marginBottom: 17, flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                <View>
                    {renderStatusIcon()}
                </View>
                <View
                    style={{
                        flexDirection: "column",
                        alignItems: "flex-end"
                    }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                        <Text style={styles.text}>{from}</Text>
                        <CenterPointIconSmall />
                    </View>
                    <View style={{ marginRight: 7.2 }}>
                        <DashedDividerIcon />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                        <Text style={styles.text}>{to}</Text>
                        <PositionIcon />
                    </View>
                </View>

            </View>

            {/* Weight + Date */}
            <View style={styles.rowBetween}>
                <View style={{ flexDirection: "row", gap: 12 }}>
                    <Text style={styles.text}>{weight}</Text>
                    <WeightFurnIcon />
                </View>
                <View style={{ flexDirection: "row", gap: 12 }}>
                    <Text style={styles.text}>{dateTime}</Text>
                    <ClockIconMini />
                </View>
            </View>
            <View style={[styles.rowBetween, { marginTop: 16 }]}>
                <View style={{ flexDirection: "row", gap: 12 }}>
                    <Text style={styles.text}>{vehicleType?.type}</Text>
                    <TruckIconSmall width={16} height={16} color={"gray"} />
                </View>
                <View style={{ flexDirection: "row", gap: 12 }}>
                    <Text style={styles.text}>{type}</Text>
                    <TypeDFurnIcon />
                </View>
            </View>

            {/* Button or Input */}
            <View
                style={{
                    width: "100%",
                    marginTop: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: status !== "Accepted" ? "center" : "space-between"
                }}
            >
                {status === "Accepted" ? (
                    <>
                        <TouchableOpacity
                            style={{ width: 102, height: 46, borderRadius: 8, backgroundColor: "#00CD00", gap: 8, flexDirection: "row", justifyContent: "center", alignItems: "center" }}
                            onPress={()=>Linking.openURL(`tel:${phoneNumber}`)}
                        >
                            <Text style={{ fontWeight: 800, fontSize: 14, color: "white" }}>اتصال</Text>
                            <HeadsetPhoneIcon />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ width: 210, height: 46, borderRadius: 8, borderWidth: 1, borderColor: "#0077B6", gap: 16, flexDirection: "row", justifyContent: "center", alignItems: "center" }}
                            onPress={handleViewDetails}
                        >
                            <Text style={styles.buttonFilledText}>{price} ليرة سورية</Text>
                            <MoneyIcon />
                        </TouchableOpacity>
                    </>
                ) : status === "Pending" ?
                    (
                        <>
                            <TouchableOpacity
                                style={{ width: "100%", height: 46, borderRadius: 8, borderWidth: 1, borderColor: "#0077B6", gap: 16, flexDirection: "row", justifyContent: "center", alignItems: "center" }}
                                onPress={handleViewDetails}
                            >
                                <Text style={styles.buttonFilledText}>{price} ليرة سورية</Text>
                                <MoneyIcon />
                            </TouchableOpacity>
                        </>
                    )
                    :
                    (
                        <>
                            <TouchableOpacity
                                style={{ width: "100%", height: 46, borderRadius: 8, borderWidth: 1, borderColor: "#0077B6", gap: 16, flexDirection: "row", justifyContent: "center", alignItems: "center" }}
                                onPress={handleViewDetails}
                            >
                                <Text style={styles.buttonFilledText}>{price} ليرة سورية</Text>
                                <MoneyIcon />
                            </TouchableOpacity>
                        </>
                    )}
            </View>
        </View>
    );
    return (
        <>
            {/* Normal Card */}
            {renderCardContent(false, false)}
        </>
    );
};

const styles = StyleSheet.create({
    text: { fontWeight: "500", fontSize: 14, color: "#11171A" },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    buttonOutline: {
        width: "100%",
        height: 46,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#F9844A",
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonOutlineText: {
        fontWeight: "800",
        fontSize: 14,
        color: "#F9844A",
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        width: 174,
        height: 46,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: "white",
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
    buttonFilledText: {
        fontWeight: "800",
        fontSize: 14,
        color: "#0077B6",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    confirmBox: {
        width: "85%",
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
    },
    confirmTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginTop: 12,
        marginBottom: 8,
        textAlign: "center",
    },
    confirmText: {
        fontSize: 14,
        color: "#555",
        textAlign: "center",
    },
});
