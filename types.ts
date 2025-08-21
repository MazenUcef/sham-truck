export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role?: 'user' | 'driver';
//   vehicleNumber?: string;
//   vehicleType?: string;
//   photo?: string;
}

export interface Driver extends User {
  vehicleNumber: string;
  vehicleType: string;
  photo: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user?: User;
  driver?: Driver;
}

export interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isAuthenticated: boolean;
  token: string | null;
  role: string | null;
}

export interface UserRegistration {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role:string
}

export interface DriverRegistration extends UserRegistration {
  vehicleNumber: string;
  vehicleType: string;
  photo?: File;
  vehicleTypeId?: string
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: 'user' | 'driver';
}