import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiService } from "@/config";
import { Order, OrdersState } from "@/types";

const initialState: OrdersState = {
  orders: [],
  order: null,
  status: "idle",
  error: null,
};

export const createOrder = createAsyncThunk<
  Order,
  {
    from_location: string;
    to_location: string;
    vehicle_type: string;
    weight_or_volume: string;
    date_time_transport: string;
    notes?: string;
    type: string;
  },
  { rejectValue: string }
>("orders/createOrder", async (orderData, { rejectWithValue }) => {
  try {
    const response = await apiService.post<{ message: string; order: Order }>("/api/orders/create", orderData);
    return response.order;
  } catch (error: any) {
    console.log("Create Order Error:", error);
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
    const response = await apiService.get<{ message: string; orders: Order[] }>("/api/orders/router/me");
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
    const response = await apiService.get<{ message: string; order: Order }>(`/api/orders/${id}`);
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
    const response = await apiService.get<{ message: string; orders: Order[] }>("/api/orders/driver/me");
    console.log("fetchDriverOrders",response);
    
    return response.orders;
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
    clearOrders: (state) => {
      state.orders = [];
      state.status = "idle";
      state.error = null;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
    receiveNewOrder: (state, action: PayloadAction<Order>) => {
      if (!state.orders.some((order) => order.id === action.payload.id)) {
        state.orders = [...state.orders, action.payload];
      }
    },
    receiveOrderCreated: (state, action: PayloadAction<Order>) => {
      if (!state.orders.some((order) => order.id === action.payload.id)) {
        state.orders = [...state.orders, action.payload];
      }
    },
    receiveOrderUpdated: (state, action: PayloadAction<Order>) => {
      state.orders = state.orders.map((order) =>
        order.id === action.payload.id ? action.payload : order
      );
      if (state.order && state.order.id === action.payload.id) {
        state.order = action.payload;
      }
    },
    removeOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter((order) => order.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.status = "succeeded";
        if (!state.orders.some((order) => order.id === action.payload.id)) {
          state.orders = [...state.orders, action.payload];
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to create order";
      })
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

export const {
  clearError,
  clearOrders,
  resetStatus,
  receiveNewOrder,
  receiveOrderCreated,
  receiveOrderUpdated,
  removeOrder, // Export the new action
} = ordersSlice.actions;

export default ordersSlice.reducer;