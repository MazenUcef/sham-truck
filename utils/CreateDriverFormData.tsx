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