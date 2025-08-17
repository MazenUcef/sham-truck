import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Images } from '@/constants'
import UserIcon from '@/assets/icons/Auth/UserIcon'
import AutoIcon from '@/assets/icons/Auth/AutoIcon'
import { router } from 'expo-router'

export default function Auth() {
    const handlePress = (role: 'driver' | 'customer') => {
        router.push({
            pathname: '/(auth)/signup',
            params: { role }
        });
    }

    return (
        <View style={{ backgroundColor: "#F9844A", flex: 1, paddingTop: 300 }}>
            <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}>
                <Image
                    source={Images.logo}
                    style={{ width: 256, height: 256, alignSelf: "center" }}
                />
                <View style={{ marginTop: 16, width: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontWeight: "700", fontSize: 24 }}>مرحبا بك</Text>
                    <Text style={{ fontWeight: "600", fontSize: 14, color: "#878A8E", marginTop: 4 }}>يرجي الأختيار بين الخيارات للمتابعة</Text>
                </View>
                <View style={{ marginTop: 40, width: "100%", gap: 20 }}>
                    <TouchableOpacity
                        onPress={() => handlePress('customer')}
                        style={{ height: 56, borderRadius: 8, gap: 10, backgroundColor: "#0077B6", borderWidth: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", borderColor: "#A5A7AA" }}
                    >
                        <Text style={{ fontWeight: "800", fontSize: 14, color: "white" }}>تسجيل حساب عميل</Text>
                        <UserIcon />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handlePress('driver')}
                        style={{ height: 56, borderRadius: 8, gap: 10, backgroundColor: "#F9844A", borderWidth: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", borderColor: "#A5A7AA" }}
                    >
                        <Text style={{ fontWeight: "800", fontSize: 14, color: "white" }}>تسجيل حساب سائق</Text>
                        <AutoIcon />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})