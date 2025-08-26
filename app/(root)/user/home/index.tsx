import CenterPointIcon from '@/assets/icons/user/CenterPointIcon';
import ClockIcon from '@/assets/icons/user/ClockIcon';
import LocationIcon from '@/assets/icons/user/LocationIcon';
import NotificationIcon from '@/assets/icons/user/NotificationIcon';
import { Images } from '@/constants';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { format } from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ArrowToLeftIcon from '@/assets/icons/Auth/ArrowToLeftIcon';
import SteeringIcon from '@/assets/icons/Auth/SteeringIcon';
import WeightIcon from '@/assets/icons/user/WeightIcon';
import PlusIcon from '@/assets/icons/user/PlusIcon';
import { OrderDriverCard } from '@/components/user/OrderDriverCard';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { createOrder, getUserOrders, clearError as clearOrdersError } from '@/redux/slices/OrdersSlice';
import { fetchVehicleTypes, clearError as clearVehicleError } from '@/redux/slices/VehicleTypesSlice';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { getUserById } from '@/redux/slices/UserSlice';

export default function Home() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fromLocation: '',
      toLocation: '',
      cargoType: '',
      weight: '',
      dateNtime: new Date(),
      vehicleType: '',
      vehicleTypeId: '',
      loadingTime: '',
      notes: '',
    },
  });
  const { token, user, role } = useSelector((state: RootState) => state.auth);
  const { user: UserData } = useSelector((state: RootState) => state.user);
  const { orders, status: ordersStatus, error: ordersError } = useSelector((state: RootState) => state.orders);
  const { vehicleTypes, status: vehicleStatus, error: vehicleError } = useSelector((state: RootState) => state.vehicleTypes);
  const dispatch = useDispatch<AppDispatch>();
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'عادية' | 'مغلقة' | 'مبردة'>('عادية');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);





  useEffect(() => {
    console.log("userrrrrrrrr", user);
    console.log("useUserDatarrrrrrrrr", UserData);
    if (user && user.id) {
      dispatch(getUserById({ id: user.id, role: "router" }));
    }
  }, [dispatch, user]);


  const opacity = useSharedValue(0.3);

  useEffect(() => {
    dispatch(getUserOrders());
    dispatch(fetchVehicleTypes());
  }, [dispatch]);
  // console.log("vehicleTypes",vehicleTypes);
  // console.log("vehicleTypes.length",vehicleTypes.length);

  useEffect(() => {
    if (ordersError) {
      console.error("Orders error:", ordersError);
      dispatch(clearOrdersError());
    }
  }, [ordersError, vehicleError, dispatch]);

  useEffect(() => {
    if (successModalVisible) {
      const timer = setTimeout(() => {
        setSuccessModalVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successModalVisible]);

  useEffect(() => {
    if (ordersStatus === 'loading') {
      opacity.value = withTiming(0.3, { duration: 1000 }, () => {
        opacity.value = withTiming(1, { duration: 1000 });
      });
    }
  }, [ordersStatus]);

  const VerticalDashedLine = () => (
    <View style={{ height: 24, width: 1, justifyContent: 'space-between' }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <View
          key={i}
          style={{
            width: 1,
            height: 4,
            backgroundColor: '#878A8E',
            marginBottom: 2,
          }}
        />
      ))}
    </View>
  );

  const formattedDate = format(date, 'dd/MM/yyyy - hh:mm a');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    setValue('dateNtime', selectedDate);
    hideDatePicker();
  };

  const onSubmit = async (data: any) => {
    console.log("dataaaaa", data);

    try {
      const orderData = {
        from_location: data.fromLocation,
        to_location: data.toLocation,
        vehicle_type: data.vehicleTypeId,
        weight_or_volume: `${data.weight} kg`,
        date_time_transport: data.dateNtime.toISOString(),
        loading_time: data.loadingTime,
        notes: data.notes,
        type: data.cargoType,
      };
      console.log("orderData", orderData);

      await dispatch(createOrder(orderData)).unwrap();
      console.log('Order created successfully');
      setSuccessModalVisible(true);
      reset();
      dispatch(getUserOrders());
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  const getErrorMessage = (error: any) => {
    return error?.message || 'هذا الحقل مطلوب';
  };

  const latestOrder = orders.length > 0 ? orders[0] : null;

  const formatDateTime = (dateTime: string | Date | undefined): string => {
    if (!dateTime) return "غير محدد";

    try {
      const date = typeof dateTime === "string" ? new Date(dateTime) : dateTime;
      if (isNaN(date.getTime())) return "غير محدد";

      // Format date and time separately for better control
      const dateFormatter = new Intl.DateTimeFormat("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const timeFormatter = new Intl.DateTimeFormat("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const formattedDate = dateFormatter.format(date);
      let formattedTime = timeFormatter.format(date);

      // Replace English AM/PM with Arabic equivalents
      formattedTime = formattedTime
        .replace("AM", "ص")
        .replace("PM", "م");

      return `${formattedDate} ${formattedTime}`;
    } catch (error) {
      console.error("Date formatting error:", error);
      return "غير محدد";
    }
  };

  return (
    <View style={{ backgroundColor: "#F9844A", flex: 1, paddingTop: 84, position: "relative" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, position: "relative" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 24, marginBottom: 24 }}>
            <NotificationIcon />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Text style={{ fontWeight: '700', fontSize: 16, color: "#F6F6F6" }}>مرحبا ، {UserData?.fullName || user?.fullName}</Text>
              <View style={{ width: 48, height: 48, backgroundColor: "white", borderRadius: 8 }}>
                <Image
                  style={{ width: 48, height: 48 }}
                  source={Images.logo}
                />
              </View>
            </View>
          </View>

          {ordersStatus === 'loading' ? (
            <View style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 1000,
            }}>
              <ActivityIndicator size="large" color="#F9844A" />
            </View>
          ) : latestOrder ? (
            <View style={{ position: "absolute", zIndex: 1000, top: 70, right: 25 }}>
              <Text style={{ fontWeight: 700, fontSize: 18, color: "white", alignSelf: "flex-end", marginBottom: 16 }}>طلباتك</Text>
              <OrderDriverCard
                type={typeof latestOrder.vehicle_type === 'string' ? latestOrder.vehicle_type : latestOrder.vehicle_type.type}
                from={latestOrder.from_location}
                to={latestOrder.to_location}
                weight={latestOrder.weight_or_volume}
                dateTime={formatDateTime(latestOrder.date_time_transport)}
                orderId={latestOrder._id}
                status={latestOrder.status}
              />
            </View>
          ) : null}

          <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20, borderTopLeftRadius: 16, borderTopRightRadius: 16, marginTop: latestOrder ? 170 : 0, paddingTop: latestOrder ? 100 : 20, paddingBottom: 100 }}>
            <Text style={{ fontWeight: '700', fontSize: 18, lineHeight: 24, alignSelf: "flex-end" }}>إنشاء طلب جديد</Text>

            <View style={{ marginTop: 24 }}>
              {/* From and To Location */}
              <Text style={{ fontWeight: '500', fontSize: 14, lineHeight: 20, alignSelf: "flex-end" }}>موقع الطلب</Text>
              <View style={{ marginTop: 8 }}>
                <View style={{ height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 7 }}>
                  <Controller
                    control={control}
                    rules={{ required: 'موقع الحمولة مطلوب' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={{ flex: 1, textAlign: 'right' }}
                        placeholderTextColor={"#878A8E"}
                        placeholder='أدخل موقع الحمولة'
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="fromLocation"
                  />
                  <CenterPointIcon />
                </View>

                <View style={{ alignItems: "flex-end", marginRight: 21 }}>
                  <VerticalDashedLine />
                </View>

                <View style={{ height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 7 }}>
                  <Controller
                    control={control}
                    rules={{ required: 'وجهة الحمولة مطلوب' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={{ flex: 1, textAlign: 'right' }}
                        placeholderTextColor={"#878A8E"}
                        placeholder='أدخل وجهة الحمولة'
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="toLocation"
                  />
                  <LocationIcon />
                </View>
                {(errors.fromLocation || errors.toLocation) && (
                  <Text style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
                    {errors.toLocation?.message || errors.fromLocation?.message}
                  </Text>
                )}
              </View>

              {/* Cargo Type and Weight */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={{ fontWeight: '500', fontSize: 14, lineHeight: 20, alignSelf: "flex-end", marginTop: 20 }}>نوع الحمولة</Text>
                  <View style={{ marginTop: 8 }}>
                    <View style={{ height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 7 }}>
                      <Controller
                        control={control}
                        rules={{ required: 'نوع الحمولة مطلوب' }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            style={{ flex: 1, textAlign: 'right' }}
                            placeholderTextColor={"#878A8E"}
                            placeholder='أدخل نوع الحمولة'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                        name="cargoType"
                      />
                      <WeightIcon />
                    </View>
                    {errors.cargoType && (
                      <Text style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
                        {getErrorMessage(errors.cargoType)}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '500', fontSize: 14, lineHeight: 20, alignSelf: "flex-end", marginTop: 20 }}>وزن الحمولة (كجم)</Text>
                  <View style={{ marginTop: 8 }}>
                    <View style={{ height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 7 }}>
                      <Controller
                        control={control}
                        rules={{
                          required: 'وزن الحمولة مطلوب',
                          pattern: {
                            value: /^[0-9]*$/,
                            message: 'يجب أن يكون الوزن رقماً فقط'
                          }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            style={{ flex: 1, textAlign: 'right' }}
                            placeholderTextColor={"#878A8E"}
                            placeholder='وزن الحمولة'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            keyboardType="numeric"
                          />
                        )}
                        name="weight"
                      />
                      <WeightIcon />
                    </View>
                    {errors.weight && (
                      <Text style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
                        {getErrorMessage(errors.weight)}
                      </Text>
                    )}
                  </View>
                </View>
              </View>

              {/* Loading Time */}
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: '500', fontSize: 14, lineHeight: 20, alignSelf: "flex-end" }}>مدة التحميل</Text>
                <View style={{ marginTop: 8 }}>
                  <View style={{ height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 7 }}>
                    <Controller
                      control={control}
                      rules={{ required: 'مدة التحميل مطلوبة' }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          style={{ flex: 1, textAlign: 'right' }}
                          placeholderTextColor={"#878A8E"}
                          placeholder='أدخل مدة التحميل (مثال: 2 ساعات)'
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="loadingTime"
                    />
                    <ClockIcon />
                  </View>
                  {errors.loadingTime && (
                    <Text style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
                      {getErrorMessage(errors.loadingTime)}
                    </Text>
                  )}
                </View>
              </View>

              {/* Date Picker */}
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: '500', fontSize: 14, lineHeight: 20, alignSelf: "flex-end" }}>وقت التحميل</Text>
                <View style={{ marginTop: 8 }}>
                  <TouchableOpacity
                    onPress={showDatePicker}
                    style={{ height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 7 }}
                  >
                    <Controller
                      control={control}
                      rules={{ required: 'وقت التحميل مطلوب' }}
                      render={({ field: { onChange } }) => (
                        <>
                          <Text style={{ flex: 1, textAlign: 'right', color: '#878A8E' }}>
                            {formattedDate}
                          </Text>
                        </>
                      )}
                      name="dateNtime"
                    />
                    <ClockIcon />
                  </TouchableOpacity>
                  {errors.dateNtime && (
                    <Text style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
                      {getErrorMessage(errors.dateNtime)}
                    </Text>
                  )}
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    date={date}
                    minimumDate={new Date()}
                    locale="ar-EG"
                  />
                </View>
              </View>

              {/* Notes */}
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: '500', fontSize: 14, lineHeight: 20, alignSelf: "flex-end" }}>ملاحظات</Text>
                <View style={{ marginTop: 8 }}>
                  <View style={{ height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 7 }}>
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          style={{ flex: 1, textAlign: 'right' }}
                          placeholderTextColor={"#878A8E"}
                          placeholder='أدخل ملاحظات إضافية (اختياري)'
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="notes"
                    />
                    <WeightIcon />
                  </View>
                </View>
              </View>

              {/* Vehicle Type */}
              <Text style={{ fontWeight: '500', fontSize: 14, lineHeight: 20, alignSelf: "flex-end", marginTop: 20 }}>اختر نوع الشاحنة</Text>
              <TouchableOpacity
                style={{ marginTop: 8, height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 7 }}
                onPress={() => setModalVisible(true)}
              >
                <Controller
                  control={control}
                  rules={{ required: 'نوع المركبة مطلوب' }}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <ArrowToLeftIcon />
                      <Text style={{ flex: 1, textAlign: 'right', color: value ? '#000' : '#878A8E' }}>
                        {value || 'اختر نوع المركبة'}
                      </Text>
                      <SteeringIcon />
                    </>
                  )}
                  name="vehicleType"
                />
              </TouchableOpacity>
              {errors.vehicleType && (
                <Text style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
                  {getErrorMessage(errors.vehicleType)}
                </Text>
              )}

              {/* Submit Button */}
              <TouchableOpacity
                style={styles.signInButton}
                onPress={handleSubmit(onSubmit)}
                disabled={ordersStatus === "loading"}
              >
                <Text style={styles.signInButtonText}>
                  إنشاء الطلب
                </Text>
                <PlusIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Vehicle Type Modal */}
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
                    <Text style={[
                      styles.tabText,
                      activeTab === tab && styles.activeTabText
                    ]}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={{ marginTop: 24 }}>
                <Text style={{ fontWeight: '500', fontSize: 16, textAlign: 'right' }}>الخيارات</Text>
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
                        style={[styles.vehicleTypeItem]}
                        onPress={() => {
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
                          <Text style={{ fontWeight: 800, fontSize: 14 }}>{vehicle.type}</Text>
                          <Text style={{ fontWeight: 600, fontSize: 12, color: "#878A8E", marginTop: 6 }}>
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
                style={[styles.closeButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>إلغاء</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Success Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={successModalVisible}
          onRequestClose={() => setSuccessModalVisible(false)}
        >
          <View style={styles.successModalContainer}>
            <View style={styles.successModalContent}>
              <Image
                source={Images.check}
              />
              <Text style={styles.successModalText}>تم إنشاء الطلب بنجاح!</Text>
            </View>
          </View>
        </Modal>
      </ScrollView>
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
  },
  closeButtonText: {
    color: '#878A8E',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 16
  },
  signInButton: {
    marginTop: 24,
    height: 46,
    backgroundColor: "#F9844A",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5
  },
  signInButtonText: {
    fontWeight: '800',
    fontSize: 12,
    color: "white"
  },
  orderCard: {
    width: 300,
    height: 124,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  successModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  successModalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  successModalText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 10
  },
  successModalButton: {
    backgroundColor: '#0077B6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  successModalButtonText: {
    fontWeight: '700',
    fontSize: 14,
    color: 'white',
  },
});