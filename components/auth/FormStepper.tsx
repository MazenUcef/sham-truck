import GoogleIcon from '@/assets/icons/Auth/GoogleIcon';
import LogoutIcon from '@/assets/icons/Auth/LogoutIcon';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface FormStepperProps {
    currentStep: number;
    totalSteps: number;
    onNext: () => void;
    onBack?: () => void;
}

export default function FormStepper({ currentStep, totalSteps, onNext }: FormStepperProps) {
    return (
        <View style={{ marginTop: 24, width: "100%" }}>
            <TouchableOpacity
                style={{
                    height: 46,
                    backgroundColor: "#F9844A",
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    gap:5,
                    flexDirection: "row",
                }}
                onPress={onNext}
            >
                <Text style={{ fontWeight: '800', fontSize: 12, color: "white" }}>
                    {currentStep === totalSteps ? 'تسجيل الحساب' : 'المتابعة'}
                </Text>
                {currentStep === totalSteps && (
                    <LogoutIcon />
                )}
            </TouchableOpacity>
            <View style={{ marginTop: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ width: 136, borderWidth: 1, borderColor: "#E4E4E4" }} />
                <Text style={{ fontWeight: 600, fontSize: 10, color: "#878A8E" }}>او المتابعة من خلال</Text>
                <View style={{ width: 136, borderWidth: 1, borderColor: "#E4E4E4" }} />
            </View>
            <TouchableOpacity
                style={{ marginTop: 24, height: 46, flexDirection: "row", gap: 10, borderRadius: 8, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#CED4DA" }}

            >
                <GoogleIcon />
                <Text style={{ fontWeight: 600, fontSize: 12, color: "#878A8E" }}>تسجيل الدخول عبر</Text>
            </TouchableOpacity>
        </View>
    );
}