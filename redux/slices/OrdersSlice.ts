import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiService } from "@/config";

interface Customer {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface VehicleType {
  _id: string;
  type: string;
  description: string;
  image: string;
}

interface Order {
  _id: string;
  customer_id: Customer;
  from_location: string;
  to_location: string;
  vehicle_type: VehicleType;
  weight_or_volume: string;
  date_time_transport: string;
  loading_time: string;
  notes: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface OrdersResponse {
  orders: Order[];
  totalPages: number;
  currentPage: number;
  total: number;
}

interface OrdersState {
  orders: Order[];
  totalPages: number;
  currentPage: number;
  total: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  totalPages: 1,
  currentPage: 1,
  total: 0,
  status: "idle",
  error: null,
};

export const getAllOrders = createAsyncThunk<
  OrdersResponse,
  void,
  { rejectValue: string }
>("orders/getAllOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await apiService.get<OrdersResponse>("/api/orders");
    console.log("Fetched orders:", response);
    return response;
  } catch (error: any) {
    console.error("Fetch orders error:", error);
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to fetch orders"
    );
  }
});

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action: PayloadAction<OrdersResponse>) => {
        state.status = "succeeded";
        state.orders = action.payload.orders.map((order) => ({
          ...order,
          vehicle_type: {
            ...order.vehicle_type,
            type: order.vehicle_type.type.trim(),
          },
        }));
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.total = action.payload.total;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch orders";
      });
  },
});

export const { clearError } = ordersSlice.actions;

export default ordersSlice.reducer;