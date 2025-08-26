export type Role = "user" | "driver";


export interface BaseUser {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}


export interface User extends BaseUser {
  role?: "user";
}


export interface Driver extends BaseUser {
  role?: "driver";
  vehicleNumber: string;
  vehicleType: {
    _id: string;
    category: string;
    type: string;
    image: string;
    imagePublicId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  photo: string;
}


export type AuthUser = User | Driver;


export interface AuthState {
  user: AuthUser | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isAuthenticated: boolean;
  token: string | null;
  role: Role | null;
}


export interface AuthResponse {
  message: string;
  token: string;
  user?: User;
  driver?: Driver;
}


export interface UserRegistration {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}


export interface LoginCredentials {
  email: string;
  password: string;
  role: Role;
}


export interface DriverRegistration {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  vehicleNumber: string;
  vehicleTypeId: string;
  [key: string]: string;
}


export type OrderStatus = "Pending" | "Active" | "Completed" | "Cancelled";


export interface Customer {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}


export interface VehicleType {
  _id: string;
  category: string;
  type: string;
  image: string;
}


export interface Order {
  _id: string;
  customer_id: Customer;
  from_location: string;
  to_location: string;
  vehicle_type: {
    _id: string;
    category: string;
    type: string;
    image: string;
  };
  weight_or_volume: string;
  date_time_transport: string;
  loading_time: string;
  notes: string;
  type: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface CreateOrderInput {
  from_location: string;
  to_location: string;
  vehicle_type: string;
  weight_or_volume: string;
  date_time_transport: string;
  loading_time: string;
  notes: string;
}


export interface CreateOrderResponse {
  message: string;
  order: Order;
}


export interface OrdersResponse {
  orders: Order[];
  totalPages: number;
  currentPage: number;
  total: number;
}


export interface OrdersState {
  orders: Order[];
  totalPages: number;
  currentPage: number;
  total: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}




export type OfferStatus = "Pending" | "Accepted" | "Rejected";


export interface Driver {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  photo: string;
  vehicleNumber: string;
  vehicleType: {
    _id: string;
    category: string;
    type: string;
    image: string;
    imagePublicId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}


export interface Offer {
  _id: string;
  order_id: Order | string;
  driver_id: Driver;
  price: number;
  notes: string;
  status: OfferStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface CreateOfferInput {
  order_id: string;
  price: number;
  notes: string;
}


export interface OfferResponse {
  message: string;
  offer: Offer;
  order?: Order;
}


export interface OffersState {
  offers: Offer[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
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