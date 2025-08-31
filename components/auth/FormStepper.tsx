import GoogleIcon from '@/assets/icons/Auth/GoogleIcon';
import LogoutIcon from '@/assets/icons/Auth/LogoutIcon';
import React from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import Button from '../ui/Button';
import ThemedText from '../ui/ThemedText';

interface FormStepperProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack?: () => void;
  loading: boolean;
}

export default function FormStepper({ currentStep, totalSteps, onNext, loading }: FormStepperProps) {
  return (
    <View style={{ marginTop: 24, width: "100%" }}>
      <TouchableOpacity
        style={{
          height: 46,
          backgroundColor: loading ? "#CCCCCC" : "#F9844A",
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          flexDirection: "row",
          opacity: loading ? 0.7 : 1, // Reduce opacity when loading
        }}
        onPress={onNext}
        disabled={loading} // Disable when loading
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <>
            <ThemedText style={{ fontSize: 12, color: "white" }}>
              {currentStep === totalSteps ? 'تسجيل الحساب' : 'المتابعة'}
            </ThemedText>
            {currentStep === totalSteps && (
              <LogoutIcon />
            )}
          </>
        )}
      </TouchableOpacity>
      <View style={{ marginTop: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ width: 136, borderWidth: 1, borderColor: "#E4E4E4" }} />
        <ThemedText weight='bold' style={{ fontSize: 10, color: "#878A8E" }}>او المتابعة من خلال</ThemedText>
        <View style={{ width: 136, borderWidth: 1, borderColor: "#E4E4E4" }} />
      </View>
      {/* gogle Sign In */}
      <Button title='تسجيل الدخول عبر' variant='outline' textStyle={{ color: "#878A8E" }} style={{ marginTop: 24 }} leftIcon={<GoogleIcon />} disabled={loading} />
    </View>
  );
} 