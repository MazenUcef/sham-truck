import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import LeftIcon from '@/assets/icons/Auth/LeftIcon';
import FormStepper from '@/components/auth/FormStepper';
import VehicleInfo from '@/components/auth/VehicleInfo';
import SignInForm from '@/components/auth/SigninForm';
import type { UserRegistration, DriverRegistration, LoginCredentials } from '@/types';
import { AppDispatch, RootState } from '@/redux/store';
import { signin, signupDriver, signupUser } from '@/redux/slices/AuthSlice';
import { createDriverFormData } from '@/utils/CreateDriverFormData';
import PersonalInfoForm from '@/components/auth/PersonalInfoForm';
import UserPersonalInfoForm from '@/components/auth/UserPersonalInfoForm';

export default function Signup() {
  const { role } = useLocalSearchParams<{ role: 'driver' | 'user' }>();
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>('signup');
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { status, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const loading = status === 'loading';

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      vehicleType: "",
      vehicleNumber: "",
      vehiclePhoto: null as File | null,
    },
  });

  const { control, handleSubmit, formState: { errors }, getValues } = methods;

  const onSubmit = async (data: any) => {
    console.log(data);

    try {
      if (role === 'user') {
        // user registration
        const userData: UserRegistration = {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
          role: "user"
        };

        await dispatch(signupUser(userData)).unwrap();
        Alert.alert('Success', 'Account created successfully!');
        router.replace('/(root)/user/home');

      } else if (role === 'driver') {
        console.log("from driverData",data.vehicleTypeId);
        
        const driverData: DriverRegistration = {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
          vehicleNumber: data.vehicleNumber,
          vehicleType: data.vehicleTypeId,
          photo: data.vehiclePhoto,
          role:"driver",
        };
        console.log("driverData",driverData);
        

        const formData = createDriverFormData(driverData);
        await dispatch(signupDriver(formData)).unwrap();
        Alert.alert('Success', 'Driver account created successfully!');
        router.replace('/(root)/driver/home');
      }
    } catch (error: any) {
      Alert.alert('Error', error || 'Registration failed');
    }
  };

  const onSignIn = async (data: LoginCredentials) => {
    try {
      const credentials: LoginCredentials = {
        email: data.email,
        password: data.password,
        role: role || 'user',
      };

      await dispatch(signin(credentials)).unwrap();
      Alert.alert('Success', 'Logged in successfully!');
      router.replace(`/(root)/${role}/home`);
    } catch (error: any) {
      Alert.alert('Error', error || 'Login failed');
    }
  };

  const onNext = () => {
    if (currentStep === 1 && role === 'driver') {
      const step1Fields = {
        fullName: getValues('fullName'),
        email: getValues('email'),
        password: getValues('password'),
        confirmPassword: getValues('confirmPassword')
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

  // Show error alerts when they occur
  React.useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);



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

          {role === "user" ? (
            <FormProvider {...methods}>
              {activeTab === 'signup' ? (
                <View style={{ flex: 1, alignItems: "flex-end", marginTop: 24 }}>
                  <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                  >
                    <UserPersonalInfoForm
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