import { UpdateDriverData } from "@/types";
import { DriverRegistration } from '@/types';

export const createDriverFormData = (driverData: DriverRegistration): FormData => {
    const formData = new FormData();
    console.log("from", driverData);
    formData.append('fullName', driverData.fullName);
    formData.append('email', driverData.email);
    formData.append('password', driverData.password);
    formData.append('phoneNumber', driverData.phoneNumber);
    formData.append('vehicleNumber', driverData.vehicleNumber);
    formData.append('vehicleTypeId', driverData.vehicleTypeId);


    if (driverData.photo) {
        const photo = driverData.photo as any;
        formData.append('photo', {
            uri: photo.uri,
            name: photo.name || 'vehicle.jpg',
            type: photo.type || 'image/jpeg'
        } as any);
    }

    return formData;
};




export const createUpdateDriverFormData = (data: UpdateDriverData): FormData => {
  const formData = new FormData();
  if (data.fullName) formData.append("fullName", data.fullName);
  if (data.email) formData.append("email", data.email);
  if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);
  if (data.vehicleNumber) formData.append("vehicleNumber", data.vehicleNumber);
  if (data.vehicleTypeId) formData.append("vehicleTypeId", data.vehicleTypeId);
  if (data.photo) formData.append("photo", data.photo);
  return formData;
};