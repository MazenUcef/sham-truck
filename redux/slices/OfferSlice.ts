import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiService } from "@/config";

interface Customer {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface Order {
  _id: string;
  customer_id: Customer;
  from_location: string;
  to_location: string;
  vehicle_type: string;
  weight_or_volume: string;
  date_time_transport: string;
  loading_time: string;
  notes: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Driver {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  photo: string;
  vehicleNumber: string;
  vehicleType: string;
}

interface Offer {
  _id: string;
  order_id: Order;
  driver_id: Driver;
  price: number;
  notes: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface OfferResponse {
  message: string;
  offer: Offer;
}

interface OffersState {
  offers: Offer[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OffersState = {
  offers: [],
  status: "idle",
  error: null,
};

export const createOffer = createAsyncThunk<
  OfferResponse,
  { order_id: string; price: number; notes: string },
  { rejectValue: string }
>("offers/createOffer", async (offerData, { rejectWithValue }) => {
  try {
    const response = await apiService.post<OfferResponse>("/api/offers", offerData);
    console.log("Created offer:", response);
    return response;
  } catch (error: any) {
    console.error("Create offer error:", error);
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to create offer"
    );
  }
});

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.status = "idle"; // Reset status to idle
    },
    resetStatus: (state) => {
      state.status = "idle"; // Reset status to idle without clearing offers
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOffer.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOffer.fulfilled, (state, action: PayloadAction<OfferResponse>) => {
        state.status = "succeeded";
        state.offers.push({
          ...action.payload.offer,
          driver_id: {
            ...action.payload.offer.driver_id,
            phoneNumber: action.payload.offer.driver_id.phoneNumber.trim(),
            vehicleNumber: action.payload.offer.driver_id.vehicleNumber.trim(),
            vehicleType: action.payload.offer.driver_id.vehicleType.trim(),
          },
          order_id: {
            ...action.payload.offer.order_id,
            vehicle_type: action.payload.offer.order_id.vehicle_type.trim(),
          },
        });
      })
      .addCase(createOffer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to create offer";
      });
  },
});

export const { clearError, resetStatus } = offersSlice.actions;

export default offersSlice.reducer;