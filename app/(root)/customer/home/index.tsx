import CenterPointIcon from '@/assets/icons/Customer/CenterPointIcon';
import ClockIcon from '@/assets/icons/Customer/ClockIcon';
import LocationIcon from '@/assets/icons/Customer/LocationIcon';
import NotificationIcon from '@/assets/icons/Customer/NotificationIcon';
import { Images, vehicleMockData } from '@/constants';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { format } from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ArrowToLeftIcon from '@/assets/icons/Auth/ArrowToLeftIcon';
import SteeringIcon from '@/assets/icons/Auth/SteeringIcon';
import { db as database } from '@/api/config';
import WeightIcon from '@/assets/icons/Customer/WeightIcon';
import PlusIcon from '@/assets/icons/Customer/PlusIcon';
import { ID } from 'react-native-appwrite';
import { OrderDriverCard } from '@/components/customer/OrderDriverCard';
import useOrders from '@/hooks/useOrders';
import useAuth from '@/hooks/useAuth';
import { router } from 'expo-router';

export default function Home() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      fromLocation: '',
      toLocation: '',
      cargoType: '',
      weight: '',
      dateNtime: new Date(),
      vehicleType: '',
      vehicleTypeId: ''
    }
  });
  const order = {
    id: 1,
    from: "13 ش الكورنيش، حلب، سوريا",
    to: "7 ش التربوي، دمشق، سوريا",
    weight: "1.5 طن",
    dateTime: "17:00 - 25/05/2025",
    type: "أثاث منزل",
    vehicle: "شاحنة عادية"
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'عادية' | 'مغلقة' | 'مبردة'>('عادية');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { createOrder } = useOrders()
  const { logout } = useAuth()

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
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await database.listDocuments(
        "68724035002cd5c6269d",
        "6896ff68001f1ddeb47b"
      );
      setOrders(response.documents);
      console.log("orders", response.documents);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders()
  }, [])

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    setValue('dateNtime', selectedDate);
    hideDatePicker();
  };

  const onSubmit = async (data: any) => {
    try {
      const orderData = {
        order_from: data.fromLocation,
        order_to: data.toLocation,
        order_date: data.dateNtime,
        order_time: data.dateNtime,
        weight: parseFloat(data.weight) || 0,
        items_type: data.cargoType,
        items_quantity: '1',
        vehicleTypes: data.vehicleTypeId
      };
      const res = await createOrder(orderData as any)
      // await database.createDocument(
      //   "68724035002cd5c6269d",
      //   "6896ff68001f1ddeb47b",
      //   ID.unique(),
      //   orderData
      // );
      console.log('res', res);
      console.log('Order created successfully');
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  const getErrorMessage = (error: any) => {
    return error?.message || 'هذا الحقل مطلوب';
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
              <Text style={{ fontWeight: '700', fontSize: 16, color: "#F6F6F6" }}>مرحبا ، سيف</Text>
              <View style={{ width: 48, height: 48, backgroundColor: "white", borderRadius: 8 }}>
                <Image
                  style={{ width: 48, height: 48 }}
                  source={Images.logo}
                />
              </View>
            </View>
          </View>

          {order && (
            <View style={{ position: "absolute", zIndex: 1000, top: 70, right: 25 }}>
              <Text style={{ fontWeight: 700, fontSize: 18, color: "white", alignSelf: "flex-end", marginBottom: 16 }}>طلباتك</Text>
              <OrderDriverCard
                type={order.type}
                from={order.from}
                to={order.to}
                weight={order.weight}
                dateTime={order.dateTime}
              />
            </View>
          )}
          <TouchableOpacity onPress={() => {
            logout()
            router.replace("/(auth)")
          }}>
            <Text>Logout</Text>
          </TouchableOpacity>
          <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20, borderTopLeftRadius: 16, borderTopRightRadius: 16, marginTop: order ? 170 : 0, paddingTop: order ? 100 : 0, paddingBottom: 100 }}>
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
                        placeholder='أدخل موقم الحمولة'
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
                    rules={{ required: ' وجهة الحمولة مطلوب' }}
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
                            placeholder=' وزن الحمولة'
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
                  />
                </View>
              </View>

              {/* Vehicle Type */}
              <Text style={{ fontWeight: '500', fontSize: 14, lineHeight: 20, alignSelf: "flex-end", marginTop: 20 }}>أختر نوع الشاحنة</Text>
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
                {vehicleMockData
                  .filter(vehicle => vehicle.category === activeTab)
                  .map((vehicle) => (
                    <TouchableOpacity
                      key={vehicle.id}
                      style={[styles.vehicleTypeItem]}
                      onPress={() => {
                        setValue('vehicleType', vehicle.type);
                        setValue('vehicleTypeId', String(vehicle.id));
                        setModalVisible(false);
                      }}
                    >
                      <Image
                        source={vehicle.image}
                        style={{ width: 40, height: 40 }}
                      />
                      <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={{ fontWeight: '800', fontSize: 14 }}>{vehicle.type}</Text>
                        <Text style={{ fontWeight: '600', fontSize: 12, color: "#878A8E", marginTop: 6 }}>{vehicle.category}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
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
});