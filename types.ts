export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: "router";
}

export interface Driver {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  vehicleNumber: string;
  vehicleType: {
    _id: string;
    category: string;
    type: string;
    image: string;
    imagePublicId: string;
    createdAt: string;
    updatedAt: string;
  };
  photo: string;
  role: "driver";
}

export interface AuthState {
  user: User | Driver | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isAuthenticated: boolean;
}

export interface SignupUserData {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface SignupDriverData extends SignupUserData {
  vehicleNumber: string;
  vehicleTypeId: string;
  photo?: File;
}

export interface LoginData {
  email: string;
  password: string;
  role: "router" | "driver";
}

export interface UpdateUserData {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface UpdateDriverData extends UpdateUserData {
  vehicleNumber?: string;
  vehicleTypeId?: string;
  photo?: File;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}


export interface VehicleType {
  _id: string;
  category: string;
  type: string;
  image: string;
  imagePublicId?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}


export interface VehicleTypesState {
  vehicleTypes: VehicleType[];
  vehicleType: VehicleType | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}



export interface UserRegistration {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface DriverRegistration {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  vehicleNumber: string;
  vehicleTypeId: string;
  photo?: File;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: 'router' | 'driver';
}








export interface Order {
  id: string;
  customer_id?: string;
  customer: {
    id: string;
    fullName: string;
    role: string;
  };
  from_location: string;
  to_location: string;
  vehicle_type: {
    _id: string;
    category: string;
  };
  weight_or_volume: string;
  date_time_transport: string;
  loading_time: string;
  notes?: string;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersState {
  orders: Order[];
  order: Order | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface VehicleType {
  _id: string;
  category: string;
}

export interface VehicleTypesState {
  vehicleTypes: VehicleType[];
  vehicleType: VehicleType | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}


export interface Offer {
  id: string;
  order_id: string | Order;
  driver_id: string;
  price: number;
  notes?: string;
  status: "Pending" | "Accepted" | "Rejected";
  createdAt: string;
  updatedAt: string;
  vehicle_type: string;
}

export interface OffersState {
  offers: Offer[];
  offer: Offer | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}


export interface GeneralUser {
  message: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: string;
  }
}

export interface GeneralUserState {
  user: GeneralUser | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}


export interface Notification {
  _id: string;
  user_id?: string | { _id: string; fullName: string; phoneNumber: string };
  driver_id?: string | { _id: string; fullName: string; vehicleNumber: string };
  order_id?: string | { _id: string; from_location: any; to_location: any; status: string };
  type: 'new_offer' | 'offer_accepted' | 'offer_rejected' | 'order_created' | 'order_updated' | 'order_completed' | 'ring';
  title: string;
  message: string;
  is_read: boolean;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedNotifications {
  notifications: Notification[];
  total: number;
  unreadCount: number;
  totalPages: number;
  currentPage: number;
  limit?: number;
}

export interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    total: number;
    limit: number;
  };
}