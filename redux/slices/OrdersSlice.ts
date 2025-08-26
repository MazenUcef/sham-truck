import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiService } from "@/config";
import {
  OrdersState,
  OrdersResponse,
  CreateOrderResponse,
  CreateOrderInput,
  Order,
} from "@/types";

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
    console.log("get all order" ,response);
    
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to fetch orders"
    );
  }
});

export const createOrder = createAsyncThunk<
  CreateOrderResponse,
  CreateOrderInput,
  { rejectValue: string }
>("orders/createOrder", async (orderData, { rejectWithValue }) => {
  try {
    const response = await apiService.post<CreateOrderResponse>("/api/orders", orderData);
    return response;
  } catch (error: any) {
    console.log(error);
    
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to create order"
    );
  }
});

export const getUserOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>("orders/getUserOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await apiService.get<Order[]>("/api/orders/user");
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to fetch user orders"
    );
  }
});

export const getOrderById = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>("orders/getOrderById", async (orderId, { rejectWithValue }) => {
  try {
    const response = await apiService.get<Order>(`/api/orders/${orderId}`);
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to fetch order by ID"
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
        state.orders = action.payload.orders;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.total = action.payload.total;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch orders";
      })

      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<CreateOrderResponse>) => {
        state.status = "succeeded";
        state.orders.push(action.payload.order);
        state.total += 1;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to create order";
      })

      .addCase(getUserOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.status = "succeeded";
        state.orders = action.payload;
        state.total = action.payload.length;
        state.totalPages = 1;
        state.currentPage = 1;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch user orders";
      })

      .addCase(getOrderById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
        state.status = "succeeded";
        const order = action.payload;
        const existingIndex = state.orders.findIndex((o) => o._id === order._id);
        if (existingIndex >= 0) {
          state.orders[existingIndex] = order;
        } else {
          state.orders.push(order);
          state.total += 1;
        }
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch order by ID";
      });
  },
});

export const { clearError } = ordersSlice.actions;

export default ordersSlice.reducer;