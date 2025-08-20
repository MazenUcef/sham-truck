import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useForm, FormProvider } from 'react-hook-form';
import LeftIcon from '@/assets/icons/Auth/LeftIcon';
import PersonalInfoForm from '@/components/auth/PersonalInfoForm';
import FormStepper from '@/components/auth/FormStepper';
import VehicleInfo from '@/components/auth/VehicleInfo';
import SignInForm from '@/components/auth/SigninForm';
import CustomerPersonalInfoForm from '@/components/auth/CustomerPersonalInfoForm';
import { account, db } from '@/api/config';
import { ID } from 'react-native-appwrite';
import useAuth from '@/hooks/useAuth';

export default function Signup() {
  const { role } = useLocalSearchParams<{ role: 'driver' | 'customer' }>();
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>('signup');
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const { user, loading, register, login ,logout} = useAuth();

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      vehicleType: "",
      vehicleTypeId: "",
      vehicleNumber: "",
      vehiclePhoto: "",
    },
  });

  const { control, handleSubmit, formState: { errors } } = methods;
console.log(role);

  const onSubmit = async (data: any) => {
    console.log("data",data);
    
    try {
      await register(
        {
          email: data.email,
          password: data.password,
          name: data.fullName,
          phone: data.phone,
        },
        role as "driver" | "customer"
      );
      console.log("User created successfully");
      if (role === "customer") {
        router.replace("/(root)/customer/home")
      }else{
        router.replace("/(root)/driver/home")
      }
      
    } catch (error) {
      console.error(" Signup failed:", error);
    }
  };

  const onSignIn = async (data: any) => {
    try {
      await login({ email: data.email, password: data.password });
      console.log("Login successful");
      if (role === "customer") {
        router.replace("/(root)/customer/home")
      }else{

        router.replace("/(root)/driver/home")
      }
    } catch (error) {
      console.error(" Login failed:", error);
    }
  };

  const onNext = () => {
    if (currentStep === 1 && role === 'driver') {

      const step1Fields = {
        fullName: methods.getValues('fullName'),
        email: methods.getValues('email'),
        password: methods.getValues('password'),
        confirmPassword: methods.getValues('confirmPassword')
      };
      const isStep1Valid = Object.values(step1Fields).every(value => value.trim() !== '');
      if (isStep1Valid) {
        setCurrentStep(currentStep + 1);
      } else {
        Alert.alert('Error', 'Please fill all personal info fields');
      }
    } else if (currentStep === 2 && role === 'driver') {

      handleSubmit(onSubmit)();
    }
  };

  const onBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };


  return (
    <View style={{ backgroundColor: "#F9844A", flex: 1, paddingTop: 84 }}>
      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: 40, flexDirection: "row", marginLeft: 24, gap: 90 }}>
          <TouchableOpacity onPress={onBack}>
            <LeftIcon />
          </TouchableOpacity>
          <Text style={{ fontWeight: "700", fontSize: 18, lineHeight: 24, color: "white" }}>
            {activeTab === 'login' && role === "customer"
              ? 'تسجيل دخول مستخدم'
              : activeTab === 'login' && role === "driver"
                ? 'تسجيل دخول سائق'
                : activeTab === 'signup' && role === "customer"
                  ? 'انشاء حساب مستخدم'
                  : 'انشاء حساب سائق'}
          </Text>
        </View>

        <View style={{ flex: 1, backgroundColor: "white", padding: 20, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
          <View style={{ padding: 4, height: 52, width: "100%", borderRadius: 8, backgroundColor: "#F6F6F6", flexDirection: "row", gap: 10 }}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'signup' && styles.activeTab]}
              onPress={() => setActiveTab('signup')}
            >
              <Text style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}>انشاء حساب</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'login' && styles.activeTab]}
              onPress={() => setActiveTab('login')}
            >
              <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>تسجيل دخول</Text>
            </TouchableOpacity>
          </View>

          {role === "customer" ? (
            <FormProvider {...methods}>
              {activeTab === 'signup' ? (
                <View style={{ flex: 1, alignItems: "flex-end", marginTop: 24 }}>
                  <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                  >
                    <TouchableOpacity onPress={()=>logout()}>
                      <Text>logout</Text>
                    </TouchableOpacity>
                    <CustomerPersonalInfoForm
                      onSubmit={handleSubmit(onSubmit)}
                      loading={loading}
                    />
                  </ScrollView>
                </View>
              ) : (
                <SignInForm
                  control={control}
                  errors={errors}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  handleSubmit={handleSubmit}
                  onSignIn={onSignIn}
                  loading={loading}
                />
              )}
            </FormProvider>
          ) : (
            <FormProvider {...methods}>
              {activeTab === 'signup' ? (
                <View style={{ flex: 1, alignItems: "flex-end", marginTop: 24 }}>
                  <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                  >
                    {currentStep === 1 && <PersonalInfoForm />}
                    {currentStep === 2 && <VehicleInfo />}

                    <FormStepper
                      currentStep={currentStep}
                      totalSteps={2}
                      onNext={onNext}
                      onBack={onBack}
                      loading={loading}
                    />
                  </ScrollView>
                </View>
              ) : (
                <SignInForm
                  control={control}
                  errors={errors}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  handleSubmit={handleSubmit}
                  onSignIn={onSignIn}
                  loading={loading}
                />
              )}
            </FormProvider>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#F9844A',
  },
  tabText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#878A8E',
  },
  activeTabText: {
    color: 'white',
  },
});