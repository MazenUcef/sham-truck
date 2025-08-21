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

interface OrdersResponse {
    orders: Order[];
    totalPages: number;
    currentPage: number;
    total: number;
}

interface CreateOrderResponse {
    message: string;
    order: Order;
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



export const createOrder = createAsyncThunk<
    CreateOrderResponse,
    {
        from_location: string;
        to_location: string;
        vehicle_type: string;
        weight_or_volume: string;
        date_time_transport: string;
        loading_time: string;
        notes: string;
    },
    { rejectValue: string }
>("orders/createOrder", async (orderData, { rejectWithValue }) => {
    try {
        const response = await apiService.post<CreateOrderResponse>("/api/orders", orderData);
        console.log("Created order:", response);
        return response;
    } catch (error: any) {
        console.error("Create order error:", error);
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
        console.log("Fetched user orders:", response);
        return response;
    } catch (error: any) {
        console.error("Fetch user orders error:", error);
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
        console.log("Fetched order by ID:", response);
        return response;
    } catch (error: any) {
        console.error("Fetch order by ID error:", error);
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
            })
            .addCase(createOrder.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action: PayloadAction<CreateOrderResponse>) => {
                state.status = "succeeded";
                state.orders.push({
                    ...action.payload.order,
                    vehicle_type: typeof action.payload.order.vehicle_type === "string"
                        ? action.payload.order.vehicle_type
                        : {
                            ...action.payload.order.vehicle_type,
                            type: action.payload.order.vehicle_type.type.trim(),
                            description: action.payload.order.vehicle_type.description.trim(),
                            image: action.payload.order.vehicle_type.image.trim(),
                        },
                });
                state.total += 1;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to create order";
            })
            // getUserOrders cases
            .addCase(getUserOrders.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getUserOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.status = "succeeded";
                state.orders = action.payload.map((order) => ({
                    ...order,
                    vehicle_type: typeof order.vehicle_type === "string"
                        ? order.vehicle_type
                        : {
                            ...order.vehicle_type,
                            type: order.vehicle_type.type.trim(),
                            description: order.vehicle_type.description.trim(),
                            image: order.vehicle_type.image.trim(),
                        },
                }));
                state.total = action.payload.length;
                state.totalPages = 1; // Assuming no pagination for user orders
                state.currentPage = 1;
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch user orders";
            })
            // getOrderById cases
            .addCase(getOrderById.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
                state.status = "succeeded";
                const order = {
                    ...action.payload,
                    vehicle_type: typeof action.payload.vehicle_type === "string"
                        ? action.payload.vehicle_type
                        : {
                            ...action.payload.vehicle_type,
                            type: action.payload.vehicle_type.type.trim(),
                            description: action.payload.vehicle_type.description.trim(),
                            image: action.payload.vehicle_type.image.trim(),
                        },
                };
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
            })
    },
});

export const { clearError } = ordersSlice.actions;

export default ordersSlice.reducer;