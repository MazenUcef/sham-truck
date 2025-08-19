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
import LocationPinIcon from '@/assets/icons/Driver/LocationPinIcon';
import ArrowToBottomIcon from '@/assets/icons/Driver/ArrowToBottomIcon';
import FilterIcon from '@/assets/icons/Driver/FilterIcon';
import CenterPointIconSmall from '@/assets/icons/Driver/CenterPointIconSmall';
import DashedDividerIcon from '@/assets/icons/Driver/DashedDivider';

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

  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'عادية' | 'مغلقة' | 'مبردة'>('عادية');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
        "68724035002cd5c6269d", // Database ID
        "6896ff68001f1ddeb47b"   // Orders Collection ID
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
      const res = await database.createDocument(
        "68724035002cd5c6269d",
        "6896ff68001f1ddeb47b",
        ID.unique(),
        orderData
      );
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
    <View style={{ backgroundColor: "#F9844A", flex: 1, paddingTop: 84 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 24, marginBottom: 24 }}>
            <NotificationIcon />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <ArrowToBottomIcon />
              <Text style={{ fontWeight: '700', fontSize: 16, color: "#F6F6F6" }}>حلب ، سوريا</Text>
              <LocationPinIcon />
            </View>
          </View>

          <View style={{ flex: 1, backgroundColor: "white", padding: 20, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
                <Text style={{ fontWeight: '600', fontSize: 12 }}>حسب الموقع</Text>
                <FilterIcon />
              </TouchableOpacity>
              <Text style={{ fontWeight: '500', fontSize: 18 }}>الطلبات المتاحة</Text>
            </View>

            <View style={{ marginTop: 24 }}>
              <View style={{ height: 198, borderRadius: 8, borderWidth: 1, borderColor: "#E4E4E4", paddingVertical: 16, paddingHorizontal: 20, flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12,}}>
                  <Text style={{ fontWeight: 500, fontSize: 14, color: "#11171A" }}>13 ش الكورنيش ، حلب ، سوريا</Text>
                  <CenterPointIconSmall />
                </View>
                <DashedDividerIcon />
                <View></View>
              </View>
            </View>
          </View>
        </View>

      </ScrollView >
    </View >
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