import React from 'react';
import { Controller, useFormContext, FieldError } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GrayUserIcon from '@/assets/icons/Auth/GrayUserIcon';
import MessageIcon from '@/assets/icons/Auth/MessageIcon';
import LockIcon from '@/assets/icons/Auth/LockIcon';
import PhoneIcon from '@/assets/icons/Auth/PhoneIcon';
import LogoutIcon from '@/assets/icons/Auth/LogoutIcon';
import GoogleIcon from '@/assets/icons/Auth/GoogleIcon';

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
            <Text style={{ fontWeight: "500", fontSize: 16, alignSelf: "flex-end" }}>الرجاء استكمال البيانات الشخصية</Text>
            <Text style={{ fontWeight: "600", fontSize: 12, alignSelf: "flex-end", color: "#878A8E" }}>حتى تتم عملية تسجيلكم كمستخدم بنجاح</Text>
            <View style={{ width: "100%" }}>
                <View style={{ marginTop: 24 }}>
                    {/* Full Name Field */}
                    <View style={{ height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 7 }}>
                        <Controller
                            control={control}
                            rules={{ required: 'الاسم الكامل مطلوب' }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
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
                        <Text style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
                            {getErrorMessage(errors.fullName as FieldError)}
                        </Text>
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
                                <TextInput
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
                        <Text style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
                            {getErrorMessage(errors.email as FieldError)}
                        </Text>
                    )}

                    {/* Phone Number Field */}
                    <View style={{ height: 46, marginTop: 16, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 7 }}>
                        <Controller
                            control={control}
                            rules={{ required: 'رقم الهاتف مطلوب' }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
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
                        <Text style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
                            {getErrorMessage(errors.phoneNumber as FieldError)}
                        </Text>
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
                                    <TextInput
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
                        <Text style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
                            {getErrorMessage(errors.password as FieldError)}
                        </Text>
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
                                    <TextInput
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
                        <Text style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
                            {getErrorMessage(errors.confirmPassword as FieldError)}
                        </Text>
                    )}
                </View>
                <View style={{ marginTop: 24, width: "100%" }}>
                    <TouchableOpacity
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
                                <Text style={{ fontWeight: '800', fontSize: 12, color: "white" }}>
                                    تسجيل الحساب
                                </Text>
                                <LogoutIcon />
                            </>
                        )}
                    </TouchableOpacity>
                    
                    <View style={{ marginTop: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View style={{ width: 136, borderWidth: 1, borderColor: "#E4E4E4" }} />
                        <Text style={{ fontWeight: "600", fontSize: 10, color: "#878A8E" }}>او المتابعة من خلال</Text>
                        <View style={{ width: 136, borderWidth: 1, borderColor: "#E4E4E4" }} />
                    </View>
                    
                    <TouchableOpacity
                        style={{ 
                            marginTop: 24, 
                            height: 46, 
                            flexDirection: "row", 
                            gap: 10, 
                            borderRadius: 8, 
                            justifyContent: "center", 
                            alignItems: "center", 
                            borderWidth: 1, 
                            borderColor: "#CED4DA",
                            opacity: loading ? 0.5 : 1 // Reduce opacity when loading
                        }}
                        disabled={loading} // Disable when loading
                    >
                        <GoogleIcon />
                        <Text style={{ fontWeight: "600", fontSize: 12, color: "#878A8E" }}>تسجيل الدخول عبر</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}