export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role?: 'user' | 'driver';
  vehicleNumber?: string;
  vehicleType?: string;
  photo?: string;
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


export interface Customer {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface Order {
  _id: string;
  customer_id: string | Customer;
  from_location: string;
  to_location: string;
  vehicle_type: string | { _id: string; type: string; description: string; image: string };
  weight_or_volume: string;
  date_time_transport: string;
  loading_time: string;
  notes: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Driver {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  photo: string;
  vehicleNumber: string;
  vehicleType: string;
}

export interface Offer {
  _id: string;
  order_id: string | Order;
  driver_id: Driver;
  price: number;
  notes: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserUpdate {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}