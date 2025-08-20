import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

export default function Signup() {
  const { role } = useLocalSearchParams<{ role: 'driver' | 'customer' }>();
  console.log(role);
  
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>('signup');
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      vehicleType: '',
      vehicleTypeId: '',
      vehicleNumber: '',
      vehiclePhoto: ''
    }
  });
  const { control, handleSubmit, formState: { errors, isValid } } = methods;

  const onSubmit = async (data: any) => {
    try {
      // Create Appwrite user account
      const user = await account.create(
        ID.unique(),
        data.email,
        data.password,
        data.fullName
      );

      // Store additional data in the respective collection based on role
      const userData = {
        userId: user.$id,
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        ...(role === 'driver' && {
          vehicleType: data.vehicleType,
          vehicleTypeId: data.vehicleTypeId,
          vehicleNumber: data.vehicleNumber,
          vehiclePhoto: data.vehiclePhoto
        })
      };

      const collectionId = role === 'driver' ? "687366a70018db5a155a" : "6873676000023e919fe5";
      await db.createDocument(
        "68724035002cd5c6269d",
        collectionId,
        user.$id,
        userData
      );

      console.log('User and data created successfully', { user, userData });
      if (role === 'driver') {
        router.replace('/(root)/driver/home');
      } else {
        router.replace('/customer/home');
      }
    } catch (error) {
      console.error('Failed to create user or document:', error);
    }
  };

  const onNext = () => {
    if (currentStep === 1 && role === 'driver') {
      // Validate only personal info fields for step 1
      const step1Fields = { fullName: methods.getValues('fullName'), email: methods.getValues('email'), password: methods.getValues('password'), confirmPassword: methods.getValues('confirmPassword') };
      const isStep1Valid = Object.values(step1Fields).every(value => value.trim() !== '');
      if (isStep1Valid) {
        setCurrentStep(currentStep + 1);
      } else {
        console.log('Please fill all personal info fields');
      }
    } else if (currentStep === 2 && role === 'driver') {
      // Validate all fields for final submission
      handleSubmit(onSubmit)();
    }
  };

  const onBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSignIn = async (data: any) => {
    router.replace('/(root)/driver/home');
    try {
      console.log('Attempting to sign in with:', data.email, data.password);
    //   await account.deleteSession('current');
      const session = await account.createEmailPasswordSession(data.email, data.password);
      console.log('Sign in successful', session);
      router.replace('/(root)/customer/home');
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  return (
    <View style={{ backgroundColor: "#F9844A", flex: 1, paddingTop: 84 }}>
      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: 40, flexDirection: "row", marginLeft: 24, gap: 90 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <LeftIcon />
          </TouchableOpacity>
          <Text style={{ fontWeight: 700, fontSize: 18, lineHeight: 24, color: "white" }}>
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
                    <CustomerPersonalInfoForm onSubmit={onSubmit} />
                  </ScrollView>
                </View>
              ) : (
                <SignInForm
                  control={control}
                  errors={errors}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  handleSubmit={methods.handleSubmit}
                  onSignIn={onSignIn}
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
                    />
                  </ScrollView>
                </View>
              ) : (
                <SignInForm
                  control={control}
                  errors={errors}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  handleSubmit={methods.handleSubmit}
                  onSignIn={onSignIn}
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
