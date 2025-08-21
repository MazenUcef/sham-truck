import NotificationIcon from "@/assets/icons/user/NotificationIcon";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Image,
  Modal,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { db as database } from "@/api/config";
import LocationPinIcon from "@/assets/icons/Driver/PositionIcon";
import ArrowToBottomIcon from "@/assets/icons/Driver/ArrowToBottomIcon";
import FilterIcon from "@/assets/icons/Driver/FilterIcon";
import { Images, mockOrders, SYRIAN_CITIES } from "@/constants";
import { OrderCard } from "@/components/driver/OrderCard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";



export default function Home() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fromLocation: "",
      toLocation: "",
      cargoType: "",
      weight: "",
      dateNtime: new Date(),
      vehicleType: "",
      vehicleTypeId: "",
    },
  });
  const {user,role} = useSelector((state:RootState)=>state.auth)
console.log(user);
console.log(role);

  const [modalVisible, setModalVisible] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState("حلب");
  const [searchText, setSearchText] = useState("");
  const [isCityDropdownVisible, setCityDropdownVisible] = useState(false);
   const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [filterCity, setFilterCity] = useState("الكل");

  // const { offers, loading, error, createOffer, getOffers } = useOffers();

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await database.listDocuments(
        "68724035002cd5c6269d",
        "6896ff68001f1ddeb47b"
      );
      setOrders(response.documents);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // getOffers();
  }, []);


  const filteredOrders = filterCity === "الكل"
    ? mockOrders
    : mockOrders.filter(order => order.from.includes(filterCity));


  const handleOfferSubmit = async (data: { amount: string }, orderDetails: any) => {
    setIsLoading(true);
    try {
      const offerData = {
        status: 'pending',
        pricing: parseFloat(data.amount),
        orders: orderDetails.$id, 
        order_from: orderDetails.from,
        order_to: orderDetails.to,
        order_date: new Date(orderDetails.dateTime).toISOString(),
        order_time: new Date(orderDetails.dateTime).toISOString(),
        weight: parseFloat(orderDetails.weight),
        vehicleTypes: orderDetails.vehicleTypeId,
      };
      // await createOffer(offerData);
      setModalVisible(false);
      setConfirmationVisible(true);
    } catch (err) {
      console.error("Failed to create offer:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ backgroundColor: "#F9844A", flex: 1, paddingTop: 84 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 24,
          marginBottom: 24,
        }}
      >
        <NotificationIcon />
        <TouchableOpacity
          onPress={() => setCityDropdownVisible(true)}
          style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
        >
          <ArrowToBottomIcon />
          <Text
            style={{ fontWeight: "700", fontSize: 16, color: "#F6F6F6" }}
          >
            {selectedCity} ، سوريا
          </Text>
          <LocationPinIcon />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isCityDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setCityDropdownVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#E4E4E4",
                borderRadius: 8,
                padding: 10,
                marginBottom: 10,
                textAlign: "right",
              }}
              placeholder="ابحث عن مدينة..."
              value={searchText}
              onChangeText={setSearchText}
            />
            <FlatList
              data={SYRIAN_CITIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedCity(item);
                    setCityDropdownVisible(false);
                    setSearchText("");
                  }}
                  style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#E4E4E4",
                  }}
                >
                  <Text style={{ textAlign: "right" }}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setCityDropdownVisible(false)}
            >
              <Text style={styles.closeButtonText}>إغلاق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          padding: 20,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
          >
            <Text style={{ fontWeight: "600", fontSize: 12 }}>
              {filterCity === "الكل" ? "حسب الموقع" : `حسب ${filterCity}`}
            </Text>
            <FilterIcon />
          </TouchableOpacity>
          <Text style={{ fontWeight: "500", fontSize: 18 }}>
            الطلبات المتاحة
          </Text>
        </View>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={["الكل", ...SYRIAN_CITIES]}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setFilterCity(item);
                      setModalVisible(false);
                    }}
                    style={{
                      padding: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: "#E4E4E4",
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>{item}</Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <View style={{ alignItems: "center", paddingTop: 166 }}>
                    <Image
                      source={Images.emptyImg}
                      style={{ marginBottom: 24 }}
                    />
                  </View>
                }
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>إغلاق</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <FlatList
          data={filteredOrders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <OrderCard
              type={item.type}
              vehicle={item.vehicle}
              from={item.from}
              to={item.to}
              weight={item.weight}
              dateTime={item.dateTime}
              onOfferSubmit={handleOfferSubmit}
              orderDetails={item}
            />
          )}
          style={{ marginTop: 24 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  tabContainer: {
    width: "100%",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#0077B6",
  },
  tabText: {
    color: "#878A8E",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "right",
  },
  activeTabText: {
    color: "white",
  },
  vehicleTypesContainer: {
    marginVertical: 10,
    width: "100%",
  },
  vehicleTypeItem: {
    height: 76,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E4E4E4",
    borderRadius: 8,
    marginBottom: 12,
  },
  closeButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#878A8E",
  },
  closeButtonText: {
    color: "#878A8E",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 16,
  },
  signInButton: {
    marginTop: 24,
    height: 46,
    backgroundColor: "#F9844A",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  signInButtonText: {
    fontWeight: "800",
    fontSize: 12,
    color: "white",
  },
});