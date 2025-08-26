import React, { useEffect } from "react";
import { Controller, FieldError, useForm } from "react-hook-form";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { router } from "expo-router";
import RightIcon from "@/assets/icons/Driver/RightIcon";
import GrayUserIcon from "@/assets/icons/Auth/GrayUserIcon";
import MessageIcon from "@/assets/icons/Auth/MessageIcon";
import PhoneIcon from "@/assets/icons/Auth/PhoneIcon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getUserById, updateUser, UserUpdate } from "@/redux/slices/UserSlice";
import ToRightIcon from "@/assets/icons/Driver/ToRightIcon";

export default function ProfilePage() {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const { user: userData, status } = useSelector((state: RootState) => state.user);

    console.log("user?.id", user?.id);
    console.log("userData", userData);

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
        }
    });
    const { control, formState: { errors }, handleSubmit, setValue } = methods;

    useEffect(() => {
        if (user && user.id && user.role) {
            dispatch(getUserById({ id: user.id, role: "driver" }));
        }
    }, []);

    useEffect(() => {
        if (userData) {
            setValue("fullName", userData.fullName);
            setValue("email", userData.email);
            setValue("phone", userData.phoneNumber);
        }
    }, [userData, setValue]);

    const getErrorMessage = (error: FieldError | undefined): string | null => {
        return error ? error.message || 'هذا الحقل مطلوب' : null;
    };

    const onSubmit = async (data: any) => {
        if (!user || !user.id || !user.role) {
            alert("فشل في حفظ التغييرات: لا يوجد مستخدم مسجل الدخول");
            return;
        }

        const userData: UserUpdate = {
            fullName: data.fullName,
            email: data.email,
            phoneNumber: data.phone,
            vehicleNumber: data.vehicleNumber,
            vehicleType: data.vehicleType,
            role: "driver"
        };
        console.log("userrrrrrrrrrrrrrrrr", user);

        try {
            const updateResult = await dispatch(
                updateUser({ id: user.id, userData })
            ).unwrap();
            console.log("Update successful:", updateResult);
            await dispatch(getUserById({ id: user.id, role: user.role })).unwrap();
            alert("تم حفظ التغييرات بنجاح ✅");
        } catch (error: any) {
            console.error("Update failed:", error);
            alert("فشل في حفظ التغييرات: " + (error || "خطأ غير معروف"));
        }
    };

    return (
        <View style={{ backgroundColor: "#F9844A", flex: 1, paddingTop: 84 }}>
            <View style={{ marginBottom: 40, flexDirection: "row", alignSelf: "flex-end", gap: 85, marginRight: 29 }}>
                <Text style={{ fontWeight: "700", fontSize: 18, lineHeight: 24, color: "white" }}>
                    البيانات الشخصية
                </Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <RightIcon />
                </TouchableOpacity>
            </View>

            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    padding: 20,
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                }}
            >
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
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                                name="phone"
                            />
                            <PhoneIcon />
                        </View>
                        {errors.phone && (
                            <Text style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
                                {getErrorMessage(errors.phone as FieldError)}
                            </Text>
                        )}
                    </View>
                </View>
                <View
                    style={{ width: "100%", backgroundColor: "#E4E4E4", height: 1, marginVertical: 24 }}
                />
                <View style={{ marginBottom: 33, gap: 24 }}>
                    <TouchableOpacity
                        onPress={() => router.push("/(root)/driver/profile/profile-page/forget-password")}
                        style={{ height: 66, borderRadius: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", borderWidth: 1, borderColor: "#E4E4E4", paddingVertical: 20, paddingHorizontal: 16 }}
                    >
                        <ToRightIcon />
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                            <Text style={{ fontWeight: "800", fontSize: 14, color: "#11171A" }}>تغيير كلمة المرور</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        disabled={status === "loading"}
                        style={{
                            height: 46,
                            borderRadius: 8,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            borderWidth: 1,
                            borderColor: "#E4E4E4",
                            backgroundColor: "#F9844A",
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                            {status === "loading" ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Text style={{ fontWeight: "800", fontSize: 12, color: "white" }}>
                                    حفظ التغييرات
                                </Text>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
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
});