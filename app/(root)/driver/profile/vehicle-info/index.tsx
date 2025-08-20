import React, { useState } from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View, Modal, StyleSheet, Image, Alert } from 'react-native';
import LockIcon from '@/assets/icons/Auth/LockIcon';
import * as ImagePicker from 'expo-image-picker';
import { vehicleMockData } from '@/constants';
import IdentityCardIcon from '@/assets/icons/Auth/IdentityCard';
import SteeringIcon from '@/assets/icons/Auth/SteeringIcon';
import PhoneIcon from '@/assets/icons/Auth/PhoneIcon';
import ArrowToLeftIcon from '@/assets/icons/Auth/ArrowToLeftIcon';
import RightIcon from '@/assets/icons/Driver/RightIcon';
import ToRightIcon from '@/assets/icons/Driver/ToRightIcon';
import { router } from 'expo-router';

export default function VehicleInfo() {
    const { control, formState: { errors }, setValue, handleSubmit } = useForm({
        defaultValues: {
            phoneNumber: '',
            vehicleType: '',
            vehicleNumber: '',
            vehiclePhoto: '',
            vehicleTypeId: ''
        }
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState<'عادية' | 'مغلقة' | 'مبردة'>('عادية');
    const [vehicleImage, setVehicleImage] = useState<string | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setVehicleImage(result.assets[0].uri);
            setValue('vehiclePhoto', result.assets[0].uri);
        }
    };

    const getErrorMessage = (error: FieldError | undefined): string | null => {
        return error ? error.message || 'هذا الحقل مطلوب' : null;
    };

    const onSubmit = (data: any) => {
        console.log('Form data:', data);
        Alert.alert('تم الحفظ', 'تم حفظ البيانات بنجاح');
        // Here you would typically send the data to your API
    };

    return (
        <View style={{ backgroundColor: "#F9844A", flex: 1, paddingTop: 84 }}>
            <View style={{ marginBottom: 40, flexDirection: "row", alignSelf: "flex-end", gap: 85, marginRight: 29 }}>
                <Text style={{ fontWeight: "700", fontSize: 18, lineHeight: 24, color: "white" }}>
                    معلومات الشاحنة
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
                    <View >

                        <View style={{ width: "100%" }}>
                            <View >
                                {/* Phone Number Field */}
                                <View style={{ height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 7 }}>
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
                                        name="phoneNumber"
                                    />
                                    <PhoneIcon />
                                </View>
                                {errors.phoneNumber && (
                                    <Text style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
                                        {getErrorMessage(errors.phoneNumber as FieldError)}
                                    </Text>
                                )}

                                {/* Vehicle Type Field */}
                                <TouchableOpacity
                                    style={{ marginTop: 16, height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 7 }}
                                    onPress={() => setModalVisible(true)}
                                >
                                    <Controller
                                        control={control}
                                        rules={{ required: 'نوع المركبة مطلوب' }}
                                        render={({ field: { value } }) => (
                                            <>
                                                <ArrowToLeftIcon />
                                                <Text style={{ flex: 1, textAlign: 'right', color: value ? '#000' : '#878A8E' }}>
                                                    {value || 'اختر نوع المركبة'}
                                                </Text>
                                                <SteeringIcon />
                                            </>
                                        )}
                                        name="vehicleType"
                                    />
                                </TouchableOpacity>
                                {errors.vehicleType && (
                                    <Text style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
                                        {getErrorMessage(errors.vehicleType as FieldError)}
                                    </Text>
                                )}

                                {/* Vehicle Number Field */}
                                <View style={{ marginTop: 16, height: 46, justifyContent: "flex-end", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, gap: 7 }}>
                                    <Controller
                                        control={control}
                                        rules={{ required: 'رقم المركبة مطلوب' }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={{ flex: 1, textAlign: 'right' }}
                                                placeholderTextColor={"#878A8E"}
                                                placeholder='رقم المركبة'
                                                keyboardType="number-pad"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                        name="vehicleNumber"
                                    />
                                    <IdentityCardIcon />
                                </View>
                                {errors.vehicleNumber && (
                                    <Text style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
                                        {getErrorMessage(errors.vehicleNumber as FieldError)}
                                    </Text>
                                )}

                                {/* Vehicle Photo Field */}
                                <TouchableOpacity
                                    style={{ marginTop: 16, height: 120, justifyContent: "center", borderRadius: 8, backgroundColor: "#F4F4F4CC", width: "100%", alignItems: "center" }}
                                    onPress={pickImage}
                                >
                                    <Controller
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <>
                                                {value ? (
                                                    <Image source={{ uri: value }} style={{ width: '100%', height: '100%', borderRadius: 8 }} />
                                                ) : (
                                                    <>
                                                        <Text style={{ fontWeight: "600", fontSize: 12, color: "#878A8E", marginBottom: 8 }}>صورة الشاحنة</Text>
                                                        <LockIcon />
                                                        <Text style={{ color: '#AEB9C4', marginTop: 5, fontWeight: "500", fontSize: 10 }}>يمكنك رفع  صورة حتى حجم 8 ميغا بايت</Text>
                                                    </>
                                                )}
                                            </>
                                        )}
                                        name="vehiclePhoto"
                                    />
                                </TouchableOpacity>
                                {errors.vehiclePhoto && (
                                    <Text style={{ color: 'red', textAlign: 'right', fontSize: 10, marginTop: 2 }}>
                                        {getErrorMessage(errors.vehiclePhoto as FieldError)}
                                    </Text>
                                )}
                                <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Text style={{ fontWeight: "500", fontSize: 10, color: "#878A8E" }}>* صورة المركبة اختيارية, يمكنك تجاوز هذا الحقل</Text>
                                </View>
                            </View>
                        </View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View style={[styles.modalContainer, { direction: 'rtl' }]}>
                                <View style={[styles.modalContent, { alignItems: 'flex-start' }]}>
                                    {/* Tabs Container */}
                                    <View style={[styles.tabContainer, {
                                        padding: 4,
                                        height: 52,
                                        borderRadius: 8,
                                        backgroundColor: "#F6F6F6",
                                        flexDirection: "row-reverse",
                                        gap: 10
                                    }]}>
                                        {(['مبردة', 'مغلقة', 'عادية'] as const).map((tab) => (
                                            <TouchableOpacity
                                                key={tab}
                                                style={[
                                                    styles.tab,
                                                    activeTab === tab && styles.activeTab
                                                ]}
                                                onPress={() => setActiveTab(tab)}
                                            >
                                                <Text style={[
                                                    styles.tabText,
                                                    activeTab === tab && styles.activeTabText
                                                ]}>
                                                    {tab}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>

                                    <View style={{ marginTop: 24 }}>
                                        <Text style={{ fontWeight: "500", fontSize: 16, textAlign: 'right' }}>الخيارات</Text>
                                    </View>

                                    <View style={[styles.vehicleTypesContainer, {}]}>
                                        {vehicleMockData
                                            .filter(vehicle => vehicle.category === activeTab)
                                            .map((vehicle) => (
                                                <TouchableOpacity
                                                    key={vehicle.id}
                                                    style={[styles.vehicleTypeItem]}
                                                    onPress={() => {
                                                        setValue('vehicleType', vehicle.type);
                                                        setValue('vehicleTypeId', String(vehicle.id));
                                                        setModalVisible(false);
                                                    }}
                                                >
                                                    <Image
                                                        source={vehicle.image}
                                                        style={{ width: 60, height: 60 }}
                                                    />
                                                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                                        <Text style={{ fontWeight: "800", fontSize: 14 }}>{vehicle.type}</Text>
                                                        <Text style={{ fontWeight: "600", fontSize: 12, color: "#878A8E", marginTop: 6 }}>{vehicle.category}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            ))}
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => setModalVisible(false)}
                                        style={styles.closeButton}
                                    >
                                        <Text style={styles.closeButtonText}>إغلاق</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>
                <View style={{ marginTop: 32 }}>
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        style={{ height: 46, borderRadius: 8, flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%", borderWidth: 1, borderColor: "#E4E4E4", backgroundColor: "#F9844A" }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                            <Text style={{ fontWeight: "800", fontSize: 12, color: "white" }}>حفظ التغييرات</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    tabContainer: {
        width: '100%',
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: '#0077B6',
    },
    tabText: {
        color: '#878A8E',
        fontWeight: '600',
        fontSize: 14,
        textAlign: 'right',
    },
    activeTabText: {
        color: 'white',
    },
    vehicleTypesContainer: {
        marginVertical: 10,
        width: '100%',
    },
    vehicleTypeItem: {
        height: 76,
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 10,
        gap: 10,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E4E4E4",
        borderRadius: 8,
        marginBottom: 12
    },
    closeButton: {
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: '#878A8E',
        marginTop: 20,
    },
    closeButtonText: {
        color: '#878A8E',
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 16
    },
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