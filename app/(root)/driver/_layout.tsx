import { StyleSheet, Text, View, Platform, Dimensions } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ActiveUserIcon from "@/assets/icons/Tabs/ActiveUserIcon";
import ActiveHomeIcon from "@/assets/icons/Tabs/ActiveHomeIcon";
import HomeIcon from "@/assets/icons/Tabs/HomeIcon";
import UserIcon from "@/assets/icons/Tabs/UserIcon";
import OffersIcon from "@/assets/icons/Driver/OffersIcon";
import ActiveOfferIcon from "@/assets/icons/Driver/ActiveOffersIcon";

export default function Layout() {
    const insets = useSafeAreaInsets();
    const { height } = Dimensions.get('window');
    
    const hasBottomSpace = insets.bottom > 0;
    
    return (
        <Tabs
            screenOptions={{
                headerShadowVisible: false,
                tabBarStyle: {
                    backgroundColor: "white",
                    height: hasBottomSpace ? 91 + insets.bottom : 91,
                    paddingTop: 5.5,
                    paddingHorizontal: 20,
                    paddingBottom: hasBottomSpace ? insets.bottom : 0,
                    position: "absolute",
                    borderTopWidth: 1,
                    borderColor: "#E4E4E4",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    // Additional safety for Android
                    ...Platform.select({
                        android: {
                            elevation: 8,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: -2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 3,
                        },
                        ios: {
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: -2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 3,
                        }
                    })
                },
                tabBarShowLabel: false,
            }}
        >

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabItem}>
                            {focused ? (
                                <>
                                    <ActiveUserIcon />
                                    <Text style={styles.activeLabelText}>الملف الشخصي</Text>
                                </>
                            ) : (
                                <>
                                    <UserIcon />
                                    <Text style={styles.LabelText}>الملف الشخصي</Text>
                                </>
                            )}
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="requests"
                options={{
                    title: "Requests",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabItem}>
                            {focused ? (
                                <>
                                    <ActiveOfferIcon />
                                    <Text style={styles.activeLabelText}>العروض</Text>
                                </>
                            ) : (
                                <>
                                    <OffersIcon />
                                    <Text style={styles.LabelText}>العروض</Text>
                                </>
                            )}
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabItem}>
                            {focused ? (
                                <>
                                    <ActiveHomeIcon />
                                    <Text style={styles.activeLabelText}>الرئيسية</Text>
                                </>
                            ) : (
                                <>
                                    <HomeIcon />
                                    <Text style={styles.LabelText}>الرئيسية</Text>
                                </>
                            )}
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabItem: {
        justifyContent: "center",
        alignItems: "center",
        width: 121,
        height: 79,
    },
    activeLabelText: {
        fontSize: 12,
        fontWeight: "800",
        color: "#0077B6",
        marginTop: 4,
    },
    LabelText: {
        fontSize: 12,
        fontWeight: "800",
        color: "#AEB9C4",
        marginTop: 4,
    },
});