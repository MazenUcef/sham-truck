import GoogleIcon from '@/assets/icons/Auth/GoogleIcon';
import GrayUserIcon from '@/assets/icons/Auth/GrayUserIcon';
import LockIcon from '@/assets/icons/Auth/LockIcon';
import LogoutIcon from '@/assets/icons/Auth/LogoutIcon';
import MessageIcon from '@/assets/icons/Auth/MessageIcon';
import PhoneIcon from '@/assets/icons/Auth/PhoneIcon';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import Button from '../ui/Button';
import ThemedText from '../ui/ThemedText';
import ThemedTextInput from '../ui/ThemedTextInput';

interface UserPersonalInfoFormProps {
  onSubmit: (data: any) => void;
  loading: boolean; // Add loading prop
}

export default function UserPersonalInfoForm({ onSubmit, loading }: UserPersonalInfoFormProps) {
  const { control, formState: { errors }, handleSubmit, watch } = useFormContext();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const getErrorMessage = (error: FieldError | undefined): string | null => {
    return error ? error.message || 'هذا الحقل مطلوب' : null;
  };

  return (
    <>
      <ThemedText weight='semiBold' style={{ alignSelf: "flex-end" }}>الرجاء استكمال البيانات الشخصية</ThemedText>
      <ThemedText style={{ alignSelf: "flex-end", color: "#878A8E", fontSize: 12 }}>حتى تتم عملية تسجيلكم كمستخدم بنجاح</ThemedText>
      <View style={{ width: "100%" }}>
        <View style={{ marginTop: 24 }}>
          {/* Full Name Field */}
          <View style={{ height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 7 }}>
            <Controller
              control={control}
              rules={{ required: 'الاسم الكامل مطلوب' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedTextInput
                  style={{ flex: 1, textAlign: 'right' }}
                  placeholderTextColor={"#878A8E"}
                  placeholder='الاسم الكامل'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  editable={!loading} // Disable when loading
                />
              )}
              name="fullName"
            />
            <GrayUserIcon />
          </View>
          {errors.fullName && (
            <ThemedText style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
              {getErrorMessage(errors.fullName as FieldError)}
            </ThemedText>
          )}

          {/* Email Field */}
          <View style={{ marginTop: 16, height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 7 }}>
            <Controller
              control={control}
              rules={{
                required: 'البريد الإلكتروني مطلوب',
                pattern: { value: /^\S+@\S+$/i, message: 'بريد إلكتروني غير صالح' }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedTextInput
                  style={{ flex: 1, textAlign: 'right' }}
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

          {/* Phone Number Field */}
          <View style={{ height: 46, marginTop: 16, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 7 }}>
            <Controller
              control={control}
              rules={{ required: 'رقم الهاتف مطلوب' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedTextInput
                  style={{ flex: 1, textAlign: 'right' }}
                  placeholderTextColor={"#878A8E"}
                  placeholder='رقم الهاتف'
                  keyboardType="phone-pad"
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    onChange(text);
                  }}
                  value={value}
                  editable={!loading} // Disable when loading
                />
              )}
              name="phoneNumber"
            />
            <PhoneIcon />
          </View>
          {errors.phoneNumber && (
            <ThemedText style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
              {getErrorMessage(errors.phoneNumber as FieldError)}
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

          {/* Confirm Password Field */}
          <View style={{ marginTop: 16, height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 10 }}>
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={loading} // Disable when loading
            >
              <Ionicons
                name={showConfirmPassword ? 'eye' : 'eye-off'}
                size={20}
                color={loading ? "#A0A0A0" : "#CED4DA"} // Change color when disabled
              />
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
              <Controller
                control={control}
                rules={{
                  required: 'تأكيد كلمة المرور مطلوب',
                  validate: (val) => val === watch('password') || 'كلمات المرور غير متطابقة'
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedTextInput
                    style={{ flex: 1, textAlign: 'right' }}
                    placeholderTextColor={"#878A8E"}
                    placeholder='تأكيد كلمة المرور'
                    secureTextEntry={!showConfirmPassword}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    editable={!loading} // Disable when loading
                  />
                )}
                name="confirmPassword"
              />
              <LockIcon />
            </View>
          </View>
          {errors.confirmPassword && (
            <ThemedText style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
              {getErrorMessage(errors.confirmPassword as FieldError)}
            </ThemedText>
          )}
        </View>
        <View style={{ marginTop: 24, width: "100%" }}>
          {/* <TouchableOpacity
            style={{
              height: 46,
              backgroundColor: loading ? "#CCCCCC" : "#F9844A", // Change color when loading
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              flexDirection: "row",
              opacity: loading ? 0.7 : 1, // Reduce opacity when loading
            }}
            onPress={handleSubmit(onSubmit)}
            disabled={loading} // Disable when loading
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <ThemedText style={{ fontWeight: '800', fontSize: 12, color: "white" }}>
                  تسجيل الحساب
                </ThemedText>
                <LogoutIcon />
              </>
            )}
          </TouchableOpacity> */}

          <Button title='تسجيل الحساب' variant="secondary" onPress={handleSubmit(onSubmit)} rightIcon={<LogoutIcon />}
            disabled={loading} />
          <View style={{ marginTop: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ width: 136, borderWidth: 1, borderColor: "#E4E4E4" }} />
            <ThemedText style={{ fontWeight: "600", fontSize: 10, color: "#878A8E" }}>او المتابعة من خلال</ThemedText>
            <View style={{ width: 136, borderWidth: 1, borderColor: "#E4E4E4" }} />
          </View>
          <Button title='تسجيل الدخول عبر' variant='outline' textStyle={{ color: "#878A8E" }} style={{ marginTop: 24 }} leftIcon={<GoogleIcon />} disabled={loading} />
        </View>
      </View>
    </>
  );
}