import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiService } from "@/config";
import { Order, OrdersState } from "@/types";

const initialState: OrdersState = {
  orders: [],
  order: null,
  status: "idle",
  error: null,
};

// In your createOrder thunk
export const createOrder = createAsyncThunk<
  Order,
  {
    from_location: string;
    to_location: string;
    vehicle_type: string;
    weight_or_volume: string;
    date_time_transport: string;
    loading_time: string;
    notes?: string;
    type: string;
  },
  { rejectValue: string }
>("orders/createOrder", async (orderData, { rejectWithValue }) => {
  try {
    const response = await apiService.post<Order>("/api/orders/create", orderData);
    
    // Add debug logging to see what's actually returned
    console.log("API Response:", response);
    console.log("Response data:", response);
    
    // Return the actual data, not the full response
    return response.orders;
  } catch (error: any) {
    console.log("Error details:", error);
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to create order"
    );
  }
});

export const fetchRouterOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>("orders/fetchRouterOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await apiService.get<Order[]>("/api/orders/router/me");
    console.log("res",response);
    
    return response.orders;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to fetch router orders"
    );
  }
});

export const getOrderById = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>("orders/getOrderById", async (id, { rejectWithValue }) => {
  try {
    const response = await apiService.get<Order>(`/api/orders/${id}`);
    console.log("getOrderById",response);
    
    return response.order;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to fetch order"
    );
  }
});

export const fetchDriverOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>("orders/fetchDriverOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await apiService.get<Order[]>("/api/orders/driver/me");
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to fetch driver orders"
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
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.status = "succeeded";
        state.orders = [...state.orders, action.payload];
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to create order";
      })
      // Fetch Router Orders
      .addCase(fetchRouterOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRouterOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchRouterOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch router orders";
      })
      // Get Order By ID
      .addCase(getOrderById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
        state.status = "succeeded";
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch order";
      })
      // Fetch Driver Orders
      .addCase(fetchDriverOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDriverOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchDriverOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch driver orders";
      });
  },
});

export const { clearError, resetStatus } = ordersSlice.actions;

export default ordersSlice.reducer;