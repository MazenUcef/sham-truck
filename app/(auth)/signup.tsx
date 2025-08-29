import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import LeftIcon from '@/assets/icons/Auth/LeftIcon';
import FormStepper from '@/components/auth/FormStepper';
import VehicleInfo from '@/components/auth/VehicleInfo';
import PersonalInfoForm from '@/components/auth/PersonalInfoForm';
import UserPersonalInfoForm from '@/components/auth/UserPersonalInfoForm';
import { AppDispatch, RootState } from '@/redux/store';
import { createDriverFormData } from '@/utils/CreateDriverFormData';
import { login, signupDriver, signupUser } from '@/redux/slices/AuthSlice';
import SignInForm from '@/components/auth/SigninForm';
import { DriverRegistration, LoginCredentials, UserRegistration } from '@/types';

export default function Signup() {
  const { role } = useLocalSearchParams<{ role: 'driver' | 'user' }>();
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>('login');
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { status, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      vehicleTypeId: '',
      vehicleNumber: "",
      vehiclePhoto: null as File | null,
    },
  });

  const { control, handleSubmit, formState: { errors }, getValues } = methods;

  const onSubmit = async (data: any) => {    
    try {
      if (role === 'user') {
        const userData: UserRegistration = {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
        };      
        await dispatch(signupUser(userData)).unwrap();
        Alert.alert('Success', 'Account created successfully!');
        router.replace('/(root)/user/home');
      } else if (role === 'driver') {
        const driverData: DriverRegistration = {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
          vehicleNumber: data.vehicleNumber,
          vehicleTypeId: data.vehicleTypeId,
          photo: data.vehiclePhoto,
        };
        const formData = createDriverFormData(driverData);
        await dispatch(signupDriver(formData)).unwrap();
        Alert.alert('Success', 'Driver account created successfully!');
        router.replace('/(root)/driver/home');
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const onSignIn = async (data: any) => {
    try {
      const credentials: LoginCredentials = {
        email: data.email,
        password: data.password,
        role: role === "user" ? "router"  : "driver",
      };
      await dispatch(login(credentials)).unwrap();
      Alert.alert('Success', 'Logged in successfully!');
      router.replace(`/(root)/${role}/home`);
    } catch (err: any) {
      console.log(err);
      
      // Error is handled by useEffect
    }
  };

  const onNext = () => {
    if (currentStep === 1 && role === 'driver') {
      const step1Fields = {
        fullName: getValues('fullName'),
        email: getValues('email'),
        password: getValues('password'),
        confirmPassword: getValues('confirmPassword'),
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

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
    if (isAuthenticated) {
      router.replace(`/(root)/${role}/home`);
    }
  }, [error, isAuthenticated, role]);

  return (
    <View style={{ backgroundColor: "#F9844A", flex: 1, paddingTop: 84 }}>
      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: 40, flexDirection: "row", marginLeft: 24, gap: 90 }}>
          <TouchableOpacity onPress={onBack}>
            <LeftIcon />
          </TouchableOpacity>
          <Text style={{ fontWeight: "700", fontSize: 18, lineHeight: 24, color: "white" }}>
            {activeTab === 'login' && role === "user"
              ? 'تسجيل دخول مستخدم'
              : activeTab === 'login' && role === "driver"
                ? 'تسجيل دخول سائق'
                : activeTab === 'signup' && role === "user"
                  ? 'انشاء حساب مستخدم'
                  : 'انشاء حساب سائق'}
          </Text>
        </View>

        <View style={{ flex: 1, backgroundColor: "white", padding: 20, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
          <View style={{ padding: 4, height: 52, width: "100%", borderRadius: 8, backgroundColor: "#F6F6F6", flexDirection: "row", gap: 10 }}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'signup' && styles.activeTab]}
              onPress={() => setActiveTab('signup')}
              disabled={status === 'loading'}
            >
              <Text style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}>انشاء حساب</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'login' && styles.activeTab]}
              onPress={() => setActiveTab('login')}
              disabled={status === 'loading'}
            >
              <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>تسجيل دخول</Text>
            </TouchableOpacity>
          </View>

          {role === "user" ? (
            <FormProvider {...methods}>
              {activeTab === 'signup' ? (
                <View style={{ flex: 1, alignItems: "flex-end", marginTop: 24 }}>
                  <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                  >
                    <UserPersonalInfoForm
                      onSubmit={onSubmit}
                      loading={status === 'loading'}
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
                  loading={status === 'loading'}
                  role={role}
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
                      loading={status === 'loading'}
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
                  loading={status === 'loading'}
                  role={role}
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