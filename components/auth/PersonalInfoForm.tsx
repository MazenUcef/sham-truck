import React from 'react';
import { Controller, useFormContext, FieldError } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GrayUserIcon from '@/assets/icons/Auth/GrayUserIcon';
import MessageIcon from '@/assets/icons/Auth/MessageIcon';
import LockIcon from '@/assets/icons/Auth/LockIcon';

export default function PersonalInfoForm() {
    const { control, formState: { errors }, watch } = useFormContext();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const getErrorMessage = (error: FieldError | undefined): string | null => {
        return error ? error.message || 'هذا الحقل مطلوب' : null;
    };

    return (
        <>
            <Text style={{ fontWeight: 500, fontSize: 16,alignSelf:"flex-end" }}>الرجاء استكمال البيانات الشخصية</Text>
            <View style={{ width: "100%" }}>
                <View style={{ marginTop: 46 }}>
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

                    {/* Password Field */}
                    <View style={{ marginTop: 16, height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 10 }}>
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={20} color="#CED4DA" />
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
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Ionicons name={showConfirmPassword ? 'eye' : 'eye-off'} size={20} color="#CED4DA" />
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
            </View>
        </>
    );
}