import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { Controller, FieldError, useForm } from 'react-hook-form';
import LeftIcon from '@/assets/icons/Auth/LeftIcon';
import SendIcon from '@/assets/icons/Auth/SendIcon';
import MessageIcon from '@/assets/icons/Auth/MessageIcon';

export default function Details() {
    const { control, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
        },
    })

    const getErrorMessage = (error: FieldError | undefined): string | null => {
        return error ? error.message || 'هذا الحقل مطلوب' : null;
    };

    return (
        <View style={{ backgroundColor: "#F9844A", flex: 1, paddingTop: 84 }}>
            <View style={{ flex: 1 }}>
                <View style={{ marginBottom: 40, flexDirection: "row", marginLeft: 24, gap: 90 }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <LeftIcon />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 700, fontSize: 18, lineHeight: 24, color: "white" }}>
                        استعادة كلمة المرور
                    </Text>
                </View>

                <View style={{ flex: 1, backgroundColor: "white", padding: 20, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                    <Text style={{ fontWeight: 500, fontSize: 16, lineHeight: 25, alignSelf: "flex-end" }}>يمكنك استعادة كلمة المرور دائما</Text>
                    <Text style={{ fontWeight: 600, fontSize: 12, color: "#878A8E", alignSelf: "flex-end", marginTop: 5, marginBottom: 24 }}>يرجى ادخال بريدك الالكتروني لارسال رابط الاستعادة</Text>
                    <View style={{ height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 7 }}>
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
                    <View style={{ marginTop: 24 }}>
                        <TouchableOpacity
                            style={{
                                height: 46,
                                backgroundColor: "#F9844A",
                                borderRadius: 8,
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 5,
                                flexDirection: "row",
                            }}
                        >
                            <SendIcon />
                            <Text style={{ fontWeight: '800', fontSize: 12, color: "white" }}>
                                ارسال رسالة
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

