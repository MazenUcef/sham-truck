import React, { useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import LockIcon from "@/assets/icons/Auth/LockIcon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { changePassword, ChangePasswordData } from "@/redux/slices/UserSlice";

export default function ForgetPassword() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const { user: userData, status } = useSelector((state: RootState) => state.user);

    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const {
        control,
        formState: { errors },
        handleSubmit,
        watch,
    } = methods;

    const getErrorMessage = (error: FieldError | undefined): string | null => {
        return error ? error.message || "هذا الحقل مطلوب" : null;
    };

    const onSubmit = async (data: any) => {
        console.log("Submitted Data:", data);
        if (!user || !user.id) {
            alert("فشل في تغيير كلمة المرور: لا يوجد مستخدم مسجل الدخول");
            return;
        }

        const passwordData: ChangePasswordData = {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        };

        try {
            await dispatch(changePassword({ id: user.id, passwordData })).unwrap();
            alert("تم حفظ التغييرات بنجاح ✅");
            router.back(); // Optionally navigate back after success
        } catch (error: any) {
            console.error("Password change failed:", error);
            alert("فشل في تغيير كلمة المرور: " + (error || "خطأ غير معروف"));
        }
    };

    return (
        <View style={{ backgroundColor: "#F9844A", flex: 1, paddingTop: 84 }}>
            {/* Header */}
            <View
                style={{
                    marginBottom: 40,
                    flexDirection: "row",
                    alignSelf: "flex-end",
                    gap: 85,
                    marginRight: 29,
                }}
            >
                <Text
                    style={{
                        fontWeight: "700",
                        fontSize: 18,
                        lineHeight: 24,
                        color: "white",
                    }}
                >
                    تغيير كلمة المرور
                </Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <RightIcon />
                </TouchableOpacity>
            </View>

            {/* Form */}
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
                        {/* Current Password */}
                        <View style={styles.inputWrapper}>
                            <TouchableOpacity
                                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                                <Ionicons
                                    name={showCurrentPassword ? "eye" : "eye-off"}
                                    size={20}
                                    color="#CED4DA"
                                />
                            </TouchableOpacity>
                            <View style={styles.inputInner}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: "كلمة المرور الحالية مطلوبة",
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.textInput}
                                            placeholderTextColor={"#878A8E"}
                                            placeholder="كلمة المرور الحالية"
                                            secureTextEntry={!showCurrentPassword}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                    name="currentPassword"
                                />
                                <LockIcon />
                            </View>
                        </View>
                        {errors.currentPassword && (
                            <Text style={styles.errorText}>
                                {getErrorMessage(errors.currentPassword as FieldError)}
                            </Text>
                        )}
                        <View
                            style={{ width: "100%", backgroundColor: "#E4E4E4", height: 1, marginVertical: 24 }}
                        />

                        {/* New Password */}
                        <View style={styles.inputWrapper}>
                            <TouchableOpacity
                                onPress={() => setShowNewPassword(!showNewPassword)}
                            >
                                <Ionicons
                                    name={showNewPassword ? "eye" : "eye-off"}
                                    size={20}
                                    color="#CED4DA"
                                />
                            </TouchableOpacity>
                            <View style={styles.inputInner}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: "كلمة المرور الجديدة مطلوبة",
                                        minLength: {
                                            value: 6,
                                            message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
                                        },
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.textInput}
                                            placeholderTextColor={"#878A8E"}
                                            placeholder="كلمة المرور الجديدة"
                                            secureTextEntry={!showNewPassword}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                    name="newPassword"
                                />
                                <LockIcon />
                            </View>
                        </View>
                        {errors.newPassword && (
                            <Text style={styles.errorText}>
                                {getErrorMessage(errors.newPassword as FieldError)}
                            </Text>
                        )}

                        {/* Confirm Password */}
                        <View style={styles.inputWrapper}>
                            <TouchableOpacity
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <Ionicons
                                    name={showConfirmPassword ? "eye" : "eye-off"}
                                    size={20}
                                    color="#CED4DA"
                                />
                            </TouchableOpacity>
                            <View style={styles.inputInner}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: "تأكيد كلمة المرور مطلوب",
                                        validate: (val) =>
                                            val === watch("newPassword") ||
                                            "كلمات المرور غير متطابقة",
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.textInput}
                                            placeholderTextColor={"#878A8E"}
                                            placeholder="تأكيد كلمة المرور"
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
                            <Text style={styles.errorText}>
                                {getErrorMessage(errors.confirmPassword as FieldError)}
                            </Text>
                        )}
                    </View>
                </View>

                <View>
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        disabled={status === "loading"}
                        style={styles.submitButton}
                    >
                        {status === "loading" ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text style={styles.submitText}>حفظ التغييرات</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputWrapper: {
        marginTop: 16,
        height: 46,
        justifyContent: "flex-end",
        borderRadius: 8,
        backgroundColor: "#F4F4F4CC",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    inputInner: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },
    textInput: {
        flex: 1,
        textAlign: "right",
    },
    errorText: {
        color: "red",
        textAlign: "right",
        fontSize: 10,
        marginTop: 2,
    },
    submitButton: {
        height: 46,
        marginTop: 32,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        borderWidth: 1,
        borderColor: "#E4E4E4",
        backgroundColor: "#F9844A",
    },
    submitText: {
        fontWeight: "800",
        fontSize: 12,
        color: "white",
    },
});
