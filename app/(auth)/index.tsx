import AutoIcon from '@/assets/icons/Auth/AutoIcon'
import UserIcon from '@/assets/icons/Auth/UserIcon'
import Button from '@/components/ui/Button'
import ThemedText from '@/components/ui/ThemedText'
import { Images } from '@/constants'
import { RootState } from '@/redux/store'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

export default function Auth() {
  const { isAuthenticated, user, token } = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    if (isAuthenticated && user?.role) {
      if (user?.role === "router") {
        router.replace('/(root)/user/home')
      } else {
        router.replace('/(root)/driver/home')
      }
    }
  }, []);

  const handlePress = (role: 'driver' | 'user') => {
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
          <ThemedText weight='bold' variant='2xl'>مرحبا بك</ThemedText>
          <ThemedText style={{ fontWeight: "600", fontSize: 14, color: "#878A8E", marginTop: 4 }}>يرجي الأختيار بين الخيارات للمتابعة</ThemedText>
        </View>
        <View style={{ marginTop: 40, width: "100%", gap: 20 }}>
          <Button
            title="تسجيل حساب عميل"
            variant="primary"
            size="lg"
            rightIcon={<UserIcon />}
            onPress={() => handlePress('user')}
          />

          <Button
            title="تسجيل حساب سائق"
            variant="secondary"
            size="lg"
            rightIcon={<AutoIcon />}
            onPress={() => handlePress('driver')}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})