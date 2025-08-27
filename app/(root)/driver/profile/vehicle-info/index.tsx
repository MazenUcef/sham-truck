import React, { useEffect, useState } from "react";
import { Controller, FieldError, useForm } from "react-hook-form";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import LockIcon from "@/assets/icons/Auth/LockIcon";
import * as ImagePicker from "expo-image-picker";
import IdentityCardIcon from "@/assets/icons/Auth/IdentityCard";
import SteeringIcon from "@/assets/icons/Auth/SteeringIcon";
import PhoneIcon from "@/assets/icons/Auth/PhoneIcon";
import ArrowToLeftIcon from "@/assets/icons/Auth/ArrowToLeftIcon";
import RightIcon from "@/assets/icons/Driver/RightIcon";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchVehicleTypes, getVehicleTypeById } from "@/redux/slices/VehicleTypesSlice";
import { Driver, UpdateDriverData } from "@/types";
import { createUpdateDriverFormData } from "@/utils/CreateDriverFormData";
import { getDriverById, updateDriver } from "@/redux/slices/AuthSlice";

export default function VehicleInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, status: userStatus } = useSelector((state: RootState) => state.auth);
  const { vehicleTypes, status: vehicleStatus } = useSelector((state: RootState) => state.vehicleTypes);

  const { control, formState: { errors }, setValue, handleSubmit } = useForm<{
    phone: string;
    vehicleType: string;
    vehicleNumber: string;
    vehiclePhoto: File | null;
    vehicleTypeId: string;
  }>({
    mode: "onChange",
    defaultValues: {
      phone: "",
      vehicleType: "",
      vehicleNumber: "",
      vehiclePhoto: null,
      vehicleTypeId: "",
    },
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"عادية" | "مغلقة" | "مبردة">("عادية");
  const [vehicleImage, setVehicleImage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchVehicleTypes());
  }, [dispatch]);

  useEffect(() => {
    if (user && user.role === "driver") {
      setValue("phone", user.phoneNumber);
      setValue("vehicleNumber", user.vehicleNumber);
      setValue("vehicleTypeId", user.vehicleType?._id || "");
      setValue("vehicleType", user.vehicleType?.type || "");
      setVehicleImage(user.photo || null);
      // Set activeTab based on user's vehicleType category
      if (user.vehicleType?.category) {
        setActiveTab(user.vehicleType.category as "عادية" | "مغلقة" | "مبردة");
      }
    }
  }, [user, setValue]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      const uri = result.assets[0].uri;
      setVehicleImage(uri);
      // Convert URI to File for FormData
      const response = await fetch(uri);
      const blob = await response.blob();
      const file = new File([blob], `vehicle_photo_${Date.now()}.jpg`, { type: blob.type });
      setValue("vehiclePhoto", file);
    }
  };

  const getErrorMessage = (error: FieldError | undefined): string | null => {
    return error ? error.message || "هذا الحقل مطلوب" : null;
  };

  const onSubmit = async (data: {
    phone: string;
    vehicleType: string;
    vehicleNumber: string;
    vehiclePhoto: File | null;
    vehicleTypeId: string;
  }) => {
    if (!user || !user.id || !user.role) {
      alert("فشل في حفظ التغييرات: لا يوجد مستخدم مسجل الدخول");
      return;
    }

    if (user.role !== "driver") {
      alert("هذه الصفحة مخصصة للسائقين فقط");
      return;
    }

    // Normalize phone number (add +20 if not present)
    let normalizedPhone = data.phone;
    if (!normalizedPhone.startsWith("+20")) {
      normalizedPhone = `+20${normalizedPhone.replace(/^0/, "")}`;
    }

    const userData: UpdateDriverData = {
      phoneNumber: normalizedPhone,
      vehicleNumber: data.vehicleNumber,
      vehicleTypeId: data.vehicleTypeId,
    };

    try {
      const formData = createUpdateDriverFormData(userData);
      await dispatch(updateDriver(formData)).unwrap();
      await dispatch(getDriverById()).unwrap();
      alert("تم حفظ التغييرات بنجاح ✅");
    } catch (error: any) {
      console.error("Update failed:", error);
      const errorMessage =
        error?.response?.data?.errors?.[0]?.msg || error || "خطأ غير معروف";
      alert(`فشل في حفظ التغييرات: ${errorMessage}`);
    }
  };

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
        <Text style={{ fontWeight: "700", fontSize: 18, lineHeight: 24, color: "white" }}>
          معلومات الشاحنة
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
        <View style={{ width: "100%" }}>
          <View>
            {/* Phone Number Field */}
            <View
              style={{
                height: 46,
                justifyContent: "flex-end",
                borderRadius: 8,
                backgroundColor: "#F4F4F4CC",
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                gap: 7,
              }}
            >
              <Controller
                control={control}
                rules={{
                  required: "رقم الهاتف مطلوب",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{ flex: 1, textAlign: "right" }}
                    placeholderTextColor={"#878A8E"}
                    placeholder="رقم الهاتف (مثال: +201234567890)"
                    keyboardType="phone-pad"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="phone"
              />
              <PhoneIcon />
            </View>
            {errors.phone && (
              <Text style={{ color: "red", textAlign: "right", fontSize: 10, marginTop: 2 }}>
                {getErrorMessage(errors.phone)}
              </Text>
            )}

            {/* Vehicle Type Field */}
            <TouchableOpacity
              style={{
                marginTop: 16,
                height: 46,
                justifyContent: "flex-end",
                borderRadius: 8,
                backgroundColor: "#F4F4F4CC",
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                gap: 7,
              }}
              onPress={() => setModalVisible(true)}
            >
              <Controller
                control={control}
                rules={{ required: "نوع المركبة مطلوب" }}
                render={({ field: { value } }) => (
                  <>
                    <ArrowToLeftIcon />
                    <Text style={{ flex: 1, textAlign: "right", color: value ? "#000" : "#878A8E" }}>
                      {value || "اختر نوع المركبة"}
                    </Text>
                    <SteeringIcon />
                  </>
                )}
                name="vehicleType"
              />
            </TouchableOpacity>
            {errors.vehicleType && (
              <Text style={{ color: "red", textAlign: "right", fontSize: 10, marginTop: 2 }}>
                {getErrorMessage(errors.vehicleType)}
              </Text>
            )}

            {/* Vehicle Number Field */}
            <View
              style={{
                marginTop: 16,
                height: 46,
                justifyContent: "flex-end",
                borderRadius: 8,
                backgroundColor: "#F4F4F4CC",
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                gap: 7,
              }}
            >
              <Controller
                control={control}
                rules={{ required: "رقم المركبة مطلوب" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{ flex: 1, textAlign: "right" }}
                    placeholderTextColor={"#878A8E"}
                    placeholder="رقم المركبة"
                    keyboardType="default"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="vehicleNumber"
              />
              <IdentityCardIcon />
            </View>
            {errors.vehicleNumber && (
              <Text style={{ color: "red", textAlign: "right", fontSize: 10, marginTop: 2 }}>
                {getErrorMessage(errors.vehicleNumber)}
              </Text>
            )}
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={[styles.modalContainer, { direction: "rtl" }]}>
            <View style={[styles.modalContent, { alignItems: "flex-start" }]}>
              <View
                style={{
                  padding: 4,
                  height: 52,
                  borderRadius: 8,
                  backgroundColor: "#F6F6F6",
                  flexDirection: "row-reverse",
                  gap: 10,
                }}
              >
                {(["عادية", "مغلقة", "مبردة"] as const).map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    style={[styles.tab, activeTab === tab && styles.activeTab]}
                    onPress={() => setActiveTab(tab)}
                  >
                    <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={{ marginTop: 24 }}>
                <Text style={{ fontWeight: "500", fontSize: 16, textAlign: "right" }}>
                  الخيارات
                </Text>
              </View>

              <View style={[styles.vehicleTypesContainer, {}]}>
                {vehicleStatus === "loading" ? (
                  <Text style={{ alignSelf: "flex-start" }}>جاري تحميل أنواع المركبات...</Text>
                ) : vehicleTypes && vehicleTypes.length > 0 ? (
                  vehicleTypes
                    .filter((vehicle) => vehicle.category === activeTab)
                    .map((vehicle) => (
                      <TouchableOpacity
                        key={vehicle._id}
                        style={[styles.vehicleTypeItem, user?.role === "driver" && vehicle._id === user?.vehicleType?._id ? styles.selectedVehicleType : {}]}
                        onPress={() => {
                          setValue("vehicleType", vehicle.type);
                          setValue("vehicleTypeId", vehicle._id);
                          setModalVisible(false);
                        }}
                      >
                        <Image
                          source={{ uri: vehicle.image }}
                          resizeMode="contain"
                          style={{ width: 80, height: 60, borderRadius: 8 }}
                        />
                        <View style={{ flex: 1, alignItems: "flex-start" }}>
                          <Text style={{ fontWeight: "800", fontSize: 14 }}>{vehicle.type}</Text>
                          <Text style={{ fontWeight: "600", fontSize: 12, color: "#878A8E", marginTop: 6 }}>
                            {vehicle.category}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))
                ) : (
                  <Text>لا توجد أنواع مركبات متاحة</Text>
                )}
              </View>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>إغلاق</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={{ marginTop: 32 }}>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={userStatus === "loading"}
            style={{
              height: 46,
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              borderWidth: 1,
              borderColor: "#E4E4E4",
              backgroundColor: "#F9844A",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              {userStatus === "loading" ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={{ fontWeight: "800", fontSize: 12, color: "white" }}>
                  حفظ التغييرات
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    tabContainer: {
        width: '100%',
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: '#0077B6',
    },
    tabText: {
        color: '#878A8E',
        fontWeight: '600',
        fontSize: 14,
        textAlign: 'right',
    },
    activeTabText: {
        color: 'white',
    },
    vehicleTypesContainer: {
        marginVertical: 10,
        width: '100%',
    },
    vehicleTypeItem: {
        height: 76,
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 10,
        gap: 10,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E4E4E4",
        borderRadius: 8,
        marginBottom: 12
    },
    closeButton: {
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: '#878A8E',
        marginTop: 20,
    },
    closeButtonText: {
        color: '#878A8E',
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 16
    },
    inputWrapper: {
        marginTop: 16,
        height: 46,
        justifyContent: "flex-end",
        borderRadius: 8,
        backgroundColor: "#F4F4F4CC",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    inputInner: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },
    textInput: {
        flex: 1,
        textAlign: "right",
    },
    errorText: {
        color: "red",
        textAlign: "right",
        fontSize: 10,
        marginTop: 2,
    },
    submitButton: {
        height: 46,
        marginTop: 32,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        borderWidth: 1,
        borderColor: "#E4E4E4",
        backgroundColor: "#F9844A",
    },
    submitText: {
        fontWeight: "800",
        fontSize: 12,
        color: "white",
    },
});