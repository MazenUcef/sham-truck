import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs, useSegments } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ActiveUserIcon from "@/assets/icons/Tabs/ActiveUserIcon";
import ActiveRequestsIcon from "@/assets/icons/Tabs/ActiveRequestsIcon";
import RequestsIcon from "@/assets/icons/Tabs/RequestsIcon";
import ActiveHomeIcon from "@/assets/icons/Tabs/ActiveHomeIcon";
import HomeIcon from "@/assets/icons/Tabs/HomeIcon";
import UserIcon from "@/assets/icons/Tabs/UserIcon";



export default function Layout() {
    const insets = useSafeAreaInsets();
    const segments = useSegments();

    console.log("Current segments:", segments);

    return (
        <Tabs
            screenOptions={{
                headerShadowVisible: false,
                tabBarStyle: {
                    ...styles.tabBarContainer,
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
                        <View >
                            {focused ? (
                                <View style={styles.activeIconContainer}>
                                    <ActiveUserIcon />
                                    <Text style={styles.activeLabelText}>الملف الشخصي</Text>
                                </View>
                            ) : (
                                <View style={styles.activeIconContainer}>
                                    <UserIcon />
                                    <Text style={styles.LabelText}>الرئيسية</Text>
                                </View>
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
                        <View >
                            {focused ? (
                                <View
                                    style={[styles.activeIconContainer]}
                                >
                                    <ActiveRequestsIcon />
                                    <Text style={styles.activeLabelText}>الطلبات</Text>
                                </View>
                            ) : (
                                <View style={styles.activeIconContainer}>
                                    <RequestsIcon />
                                    <Text style={styles.LabelText}>الطلبات</Text>
                                </View>
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
                        <View >
                            {focused ? (
                                <View style={styles.activeIconContainer}>
                                    <ActiveHomeIcon />
                                    <Text style={styles.activeLabelText}>الرئيسية</Text>
                                </View>
                            ) : (
                                <View style={styles.activeIconContainer}>
                                    <HomeIcon />
                                    <Text style={styles.LabelText}>الرئيسية</Text>
                                </View>
                            )}
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBarContainer: {
        backgroundColor: "white",
        height: 91,
        paddingTop: 5.5,
        paddingHorizontal: 20,
        position: "absolute",
        borderTopWidth: 1,
        borderColor: "#E4E4E4",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    activeIconContainer: {
        width: 121,
        height: 79,
        justifyContent: "center",
        alignItems: "center",
    },
    activeLabelText: {
        fontSize: 12,
        fontWeight: "800",
        color: "#0077B6",
    },
    LabelText: {
        fontSize: 12,
        fontWeight: "800",
        color: "#AEB9C4",
    },
});
