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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getAllOrders, clearError as clearOrdersError } from "@/redux/slices/OrdersSlice";
import { clearError, createOffer } from "@/redux/slices/OfferSlice";
import NotificationIcon from "@/assets/icons/user/NotificationIcon";
import LocationPinIcon from "@/assets/icons/Driver/PositionIcon";
import ArrowToBottomIcon from "@/assets/icons/Driver/ArrowToBottomIcon";
import FilterIcon from "@/assets/icons/Driver/FilterIcon";
import { Images, SYRIAN_CITIES } from "@/constants";
import { OrderCard } from "@/components/driver/OrderCard";

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

  const { user, role } = useSelector((state: RootState) => state.auth);
  const { orders, status: ordersStatus, error: ordersError } = useSelector((state: RootState) => state.orders);
  const { status: offersStatus, error: offersError } = useSelector((state: RootState) => state.offers);
  const dispatch = useDispatch<AppDispatch>();

  console.log("User:", user);
  console.log("Role:", role);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState("حلب");
  const [searchText, setSearchText] = useState("");
  const [isCityDropdownVisible, setCityDropdownVisible] = useState(false);
  const [filterCity, setFilterCity] = useState("الكل");

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (ordersError) {
      console.error("Orders error:", ordersError);
      dispatch(clearOrdersError());
    }
    if (offersError) {
      console.error("Offers error:", offersError);
      dispatch(clearError());
    }
  }, [ordersError, offersError, dispatch]);

  const filteredOrders = filterCity === "الكل"
    ? orders
    : orders.filter((order) => order.from_location.includes(filterCity));

  const handleOfferSubmit = async (data: { amount: number }, orderDetails: any) => {
    try {
      const offerData = {
        order_id: orderDetails._id,
        price: data.amount,
        notes: "I can pick up within 1 hour",
      };
      await dispatch(createOffer(offerData)).unwrap();
      // Reset offersStatus after successful submission
      dispatch(clearError()); // Assuming clearError resets status to "idle"
    } catch (error) {
      console.error("Failed to submit offer:", error);
    } finally {
      setModalVisible(false);
    }
  };

  // Skeleton Loader Component (unchanged)
  const SkeletonCard = () => {
    const opacity = useSharedValue(0.3);

    useEffect(() => {
      opacity.value = withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      });
      const interval = setInterval(() => {
        opacity.value = withTiming(opacity.value === 0.3 ? 1 : 0.3, {
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
        });
      }, 1000);
      return () => clearInterval(interval);
    }, [opacity]);

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
    }));

    return (
      <Animated.View
        style={[
          styles.skeletonCard,
          animatedStyle,
          {
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#E4E4E4",
            paddingVertical: 16,
            paddingHorizontal: 20,
            marginBottom: 12,
            backgroundColor: "white",
          },
        ]}
      >
        <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={styles.skeletonText} />
            <View style={styles.skeletonIcon} />
          </View>
          <View style={{ marginRight: 7.2, marginVertical: 8 }}>
            <View style={styles.skeletonDivider} />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={styles.skeletonText} />
            <View style={styles.skeletonIcon} />
          </View>
        </View>
        <View style={[styles.rowBetween, { marginTop: 17 }]}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={styles.skeletonText} />
            <View style={styles.skeletonIcon} />
          </View>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={styles.skeletonText} />
            <View style={styles.skeletonIcon} />
          </View>
        </View>
        <View style={[styles.buttonOutline, { backgroundColor: "#E4E4E4" }]} />
      </Animated.View>
    );
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
          <Text style={{ fontWeight: "700", fontSize: 16, color: "#F6F6F6" }}>
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
              data={SYRIAN_CITIES.filter((city) =>
                city.includes(searchText)
              )}
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

        {ordersStatus === "loading" ? (
          <FlatList
            data={[1, 2, 3]}
            keyExtractor={(item) => item.toString()}
            renderItem={() => <SkeletonCard />}
            style={{ marginTop: 24 }}
          />
        ) : (
          <FlatList
            data={filteredOrders}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <OrderCard
                type={item.vehicle_type.type}
                vehicle={item.vehicle_type.description}
                from={item.from_location}
                to={item.to_location}
                weight={item.weight_or_volume}
                dateTime={item.date_time_transport}
                onOfferSubmit={handleOfferSubmit}
                orderDetails={item}
              />
            )}
            ListEmptyComponent={
              <View style={{ alignItems: "center", paddingTop: 166 }}>
                <Image source={Images.emptyImg} style={{ marginBottom: 24 }} />
              </View>
            }
            style={{ marginTop: 24 }}
          />
        )}
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
  skeletonCard: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  skeletonText: {
    width: 100,
    height: 16,
    backgroundColor: "#E4E4E4",
    borderRadius: 4,
  },
  skeletonIcon: {
    width: 16,
    height: 16,
    backgroundColor: "#E4E4E4",
    borderRadius: 4,
  },
  skeletonDivider: {
    width: 20,
    height: 20,
    backgroundColor: "#E4E4E4",
    borderRadius: 4,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: "#0077B6",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    width: "100%",
    marginTop: 16,
  },
  buttonOutlineText: {
    color: "#0077B6",
    fontWeight: "600",
  },
});