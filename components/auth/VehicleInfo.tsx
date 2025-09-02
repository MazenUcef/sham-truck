import ArrowToLeftIcon from '@/assets/icons/Auth/ArrowToLeftIcon';
import IdentityCardIcon from '@/assets/icons/Auth/IdentityCard';
import LockIcon from '@/assets/icons/Auth/LockIcon';
import PhoneIcon from '@/assets/icons/Auth/PhoneIcon';
import SteeringIcon from '@/assets/icons/Auth/SteeringIcon';
import { clearError, fetchVehicleTypes } from '@/redux/slices/VehicleTypesSlice';
import { AppDispatch, RootState } from '@/redux/store';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { Alert, Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ThemedText from '../ui/ThemedText';
import ThemedTextInput from '../ui/ThemedTextInput';

export default function VehicleInfo() {
  const { control, formState: { errors }, setValue } = useFormContext();
  const dispatch = useDispatch<AppDispatch>()
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'عادية' | 'مغلقة' | 'مبردة'>('عادية');
  const [vehicleImage, setVehicleImage] = useState<string | null>(null);
  const { vehicleTypes, status, error } = useSelector((state: RootState) => state.vehicleTypes);

  useEffect(() => {
    dispatch(fetchVehicleTypes());
  }, []);



  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setVehicleImage(imageUri);
      setValue('vehiclePhoto', {
        uri: imageUri,
        name: imageUri.split('/').pop() || 'vehicle.jpg',
        type: 'image/jpeg'
      } as any);
    }
  };

  const getErrorMessage = (error: FieldError | undefined): string | null => {
    return error ? error.message || 'هذا الحقل مطلوب' : null;
  };

  return (
    <>
      <ThemedText weight='bold' style={{ fontSize: 16, lineHeight: 25, alignSelf: "flex-end" }}>الرجاء استكمال بيانات المركبة</ThemedText>
      <ThemedText style={{ fontWeight: 600, fontSize: 12, color: "#878A8E", alignSelf: "flex-end" }}>حتى تتم عملية تسجيلكم كسائق بنجاح</ThemedText>
      <View style={{ width: "100%" }}>
        <View style={{ marginTop: 46 }}>
          {/* Phone Number Field */}
          <View style={{ height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 7 }}>
            <Controller
              control={control}
              rules={{ required: 'رقم الهاتف مطلوب' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedTextInput
                  style={{ flex: 1, textAlign: 'right' }}
                  placeholderTextColor={"#878A8E"}
                  placeholder='رقم الهاتف'
                  keyboardType="phone-pad"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="phoneNumber"
            />
            <PhoneIcon />
          </View>
          {errors.phoneNumber && (
            <ThemedText style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
              {getErrorMessage(errors.phoneNumber as FieldError)}
            </ThemedText>
          )}

          {/* Vehicle Type Field */}
          <TouchableOpacity
            style={{ marginTop: 16, height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 7 }}
            onPress={() => setModalVisible(true)}
          >
            <Controller
              control={control}
              rules={{ required: 'نوع المركبة مطلوب' }}
              render={({ field: { value } }) => (
                <>
                  <ArrowToLeftIcon />
                  <ThemedText style={{ flex: 1, textAlign: 'right', color: value ? '#000' : '#878A8E' }}>
                    {value || 'اختر نوع المركبة'}
                  </ThemedText>
                  <SteeringIcon />
                </>
              )}
              name="vehicleType"
            />
          </TouchableOpacity>
          {errors.vehicleType && (
            <ThemedText style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
              {getErrorMessage(errors.vehicleType as FieldError)}
            </ThemedText>
          )}

          {/* Vehicle Number Field */}
          <View style={{ marginTop: 16, height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 7 }}>
            <Controller
              control={control}
              rules={{ required: 'رقم المركبة مطلوب' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedTextInput
                  style={{ flex: 1, textAlign: 'right' }}
                  placeholderTextColor={"#878A8E"}
                  placeholder='رقم المركبة'
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
            <ThemedText style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
              {getErrorMessage(errors.vehicleNumber as FieldError)}
            </ThemedText>
          )}

          {/* Vehicle Photo Field */}
          <TouchableOpacity
            style={{ marginTop: 16, height: 120, justifyContent: "center", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", alignItems: "center" }}
            onPress={pickImage}
          >
            {vehicleImage ? (
              <Image source={{ uri: vehicleImage }} style={{ width: '100%', height: '100%', borderRadius: 8 }} />
            ) : (
              <>
                <ThemedText weight='bold' style={{ fontSize: 12, color: "#878A8E", marginBottom: 8 }}>صورة الشاحنة</ThemedText>
                <LockIcon />
                <ThemedText weight='bold' style={{ color: '#AEB9C4', marginTop: 5, fontSize: 10 }}>يمكنك رفع صورة حتى حجم 8 ميغا بايت</ThemedText>
              </>
            )}
          </TouchableOpacity>
          {errors.vehiclePhoto && (
            <ThemedText style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
              {getErrorMessage(errors.vehiclePhoto as FieldError)}
            </ThemedText>
          )}
          <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
            <ThemedText style={{ fontWeight: 500, fontSize: 10, color: "#878A8E" }}>* صورة المركبة اختيارية, يمكنك تجاوز هذا الحقل</ThemedText>
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modalContainer, { direction: 'rtl' }]}>
          <View style={[styles.modalContent, { alignItems: 'flex-start' }]}>
            <View style={[styles.tabContainer, {
              padding: 4,
              height: 52,
              borderRadius: 8,
              backgroundColor: "#F6F6F6",
              flexDirection: "row-reverse",
              gap: 10
            }]}>
              {(['مبردة', 'مغلقة', 'عادية'] as const).map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tab,
                    activeTab === tab && styles.activeTab
                  ]}
                  onPress={() => setActiveTab(tab)}
                >
                  <ThemedText style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText
                  ]}>
                    {tab}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ marginTop: 24 }}>
              <ThemedText weight='semiBold' style={{ fontSize: 16, textAlign: 'right' }}>الخيارات</ThemedText>
            </View>

            <View style={[styles.vehicleTypesContainer, {}]}>
              {status === "loading" ? (
                <ThemedText style={{ alignSelf: "flex-start" }}>جاري تحميل أنواع المركبات...</ThemedText>
              ) : vehicleTypes && vehicleTypes.length > 0 ? (
                vehicleTypes
                  .filter((vehicle) => vehicle.category === activeTab)
                  .map((vehicle) => (
                    <TouchableOpacity
                      key={vehicle._id}
                      style={[styles.vehicleTypeItem]}
                      onPress={() => {
                        console.log(vehicle._id);

                        setValue("vehicleType", vehicle.type);
                        setValue("vehicleTypeId", vehicle._id);
                        setModalVisible(false);
                      }}
                    >
                      <Image
                        source={{ uri: vehicle.image }}
                        resizeMode='contain'
                        style={{ width: 80, height: 60, borderRadius: 8 }}
                      />
                      <View style={{ flex: 1, alignItems: "flex-start" }}>
                        <ThemedText weight='semiBold' style={{ fontSize: 14 }}>{vehicle.type}</ThemedText>
                        <ThemedText style={{ fontWeight: 600, fontSize: 12, color: "#878A8E", marginTop: 6 }}>
                          {vehicle.category}
                        </ThemedText>
                      </View>
                    </TouchableOpacity>
                  ))
              ) : (
                <ThemedText>لا توجد أنواع مركبات متاحة</ThemedText>
              )}
            </View>

            <TouchableOpacity
              style={[styles.closeButton]}
              onPress={() => setModalVisible(false)}
            >
              <ThemedText style={styles.closeButtonText}>ألغاء</ThemedText>
            </TouchableOpacity >
          </View >
        </View >
      </Modal >
    </>
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
  },
  closeButtonText: {
    color: '#878A8E',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 16
  },
});