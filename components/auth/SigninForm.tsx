import GoogleIcon from '@/assets/icons/Auth/GoogleIcon';
import LockIcon from '@/assets/icons/Auth/LockIcon';
import LogoutIcon from '@/assets/icons/Auth/LogoutIcon';
import MessageIcon from '@/assets/icons/Auth/MessageIcon';
import { getFontFamily } from '@/constants/fonts';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, FieldError } from 'react-hook-form';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Button from '../ui/Button';
import ThemedText from '../ui/ThemedText';
import ThemedTextInput from '../ui/ThemedTextInput';

export default function SignInForm({
  control,
  errors,
  showPassword,
  setShowPassword,
  handleSubmit,
  onSignIn,
  loading,
  role
}: {
  control: any,
  errors: any,
  showPassword: boolean,
  setShowPassword: (value: boolean) => void,
  handleSubmit: any,
  onSignIn: (data: any) => void,
  loading: boolean,
  role: string
}) {
  const [isChecked, setIsChecked] = useState(false);

  const getErrorMessage = (error: FieldError | undefined): string | null => {
    return error ? error.message || 'هذا الحقل مطلوب' : null;
  };

  return (
    <View style={{ flex: 1, alignItems: "flex-end", marginTop: 24 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedText style={{ fontFamily: getFontFamily('medium'), fontSize: 16, lineHeight: 25, alignSelf: "flex-end" }}>اهلا بعودتك</ThemedText>
        <ThemedText style={{ fontFamily: getFontFamily('semiBold'), fontSize: 12, color: "#878A8E", alignSelf: "flex-end", marginBottom: 24 }}>يرجى ملء البيانات التالية</ThemedText>

        {/* Email Field */}
        <View style={{ height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 7 }}>
          <Controller
            control={control}
            rules={{
              required: 'البريد الإلكتروني مطلوب',
              pattern: { value: /^\S+@\S+$/i, message: 'بريد إلكتروني غير صالح' }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedTextInput
                style={{ flex: 1, textAlign: 'right', fontFamily: getFontFamily('medium') }}
                placeholderTextColor={"#878A8E"}
                placeholder='البريد الإلكتروني'
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={!loading} // Disable when loading
              />
            )}
            name="email"
          />
          <MessageIcon />
        </View>
        {errors.email && (
          <ThemedText style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
            {getErrorMessage(errors.email as FieldError)}
          </ThemedText>
        )}

        {/* Password Field */}
        <View style={{ marginTop: 16, height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 10 }}>
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            disabled={loading} // Disable when loading
          >
            <Ionicons
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color={loading ? "#A0A0A0" : "#CED4DA"} // Change color when disabled
            />
          </TouchableOpacity>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
            <Controller
              control={control}
              rules={{
                required: 'كلمة المرور مطلوبة',
                minLength: { value: 6, message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedTextInput
                  style={{ flex: 1, textAlign: 'right' }}
                  placeholderTextColor={"#878A8E"}
                  placeholder='كلمة المرور'
                  secureTextEntry={!showPassword}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  editable={!loading} // Disable when loading
                />
              )}
              name="password"
            />
            <LockIcon />
          </View>
        </View>
        {errors.password && (
          <ThemedText style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
            {getErrorMessage(errors.password as FieldError)}
          </ThemedText>
        )}

        {/* Remember Me and Forgot Password */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
          <TouchableOpacity
            onPress={() => router.push('/details')}
            disabled={loading} // Disable when loading
          >
            <ThemedText style={{
              fontSize: 12,
              color: loading ? "#A0A0A0" : "#878A8E" // Change color when disabled
            }}>
              هل نسيت كلمة المرور ؟
            </ThemedText>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 6 }}>
            <ThemedText style={{
              fontSize: 12,
              color: loading ? "#A0A0A0" : "#878A8E" // Change color when disabled
            }}>
              تذكرني
            </ThemedText>
            <Checkbox
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? '#F9844A' : undefined}
              style={[styles.checkbox, { opacity: loading ? 0.5 : 1 }]} // Reduce opacity when loading
              disabled={loading} // Disable when loading
            />
          </View>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          style={[
            styles.signInButton,
            {
              backgroundColor: loading ? "#CCCCCC" : "#F9844A", // Change color when loading
              opacity: loading ? 0.7 : 1 // Reduce opacity when loading
            }
          ]}
          onPress={handleSubmit(onSignIn)}
          disabled={loading} // Disable when loading
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <ThemedText weight='semiBold' style={styles.signInButtonText}>
                تسجيل الدخول
              </ThemedText>
              <LogoutIcon />
            </>
          )}
        </TouchableOpacity>

        {/* Divider */}
        {/* <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <ThemedText style={styles.dividerText}>او المتابعة من خلال</ThemedText>
          <View style={styles.dividerLine} />
        </View> */}

        {/* Google Sign In */}
        <Button title='تسجيل الدخول عبر' variant='outline' textStyle={{ color: "#878A8E" }} style={{ marginTop: 24 }} leftIcon={<GoogleIcon />} disabled={loading} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CED4DA',
  },
  signInButton: {
    height: 46,
    backgroundColor: "#F9844A",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    flexDirection: "row",
    marginTop: 24,
  },
  signInButtonText: {
    fontSize: 13,
    color: "white",
    width: 90
  },
  dividerContainer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dividerLine: {
    width: 136,
    borderWidth: 1,
    borderColor: "#E4E4E4"
  },
  dividerText: {
    fontFamily: getFontFamily('semiBold'),
    fontSize: 10,
    color: "#878A8E"
  },
  googleButton: {
    marginTop: 24,
    height: 46,
    flexDirection: "row",
    gap: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CED4DA"
  },
  googleButtonText: {
    fontFamily: getFontFamily('semiBold'),
    fontSize: 12,
    color: "#878A8E"
  }
});