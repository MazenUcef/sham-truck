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
  order_id: string | Order;
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

export const getOrderOffers = createAsyncThunk<
  Offer[],
  string,
  { rejectValue: string }
>("offers/getOrderOffers", async (orderId, { rejectWithValue }) => {
  try {
    const response = await apiService.get<Offer[]>(`/api/offers/order/${orderId}`);
    console.log("Fetched offers for order:", response);
    return response;
  } catch (error: any) {
    console.error("Fetch offers error:", error);
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to fetch offers"
    );
  }
});

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.status = "idle";
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // createOffer cases
      .addCase(createOffer.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOffer.fulfilled, (state, action: PayloadAction<OfferResponse>) => {
        state.status = "succeeded";
        // Ensure state.offers is an array
        if (!Array.isArray(state.offers)) {
          console.warn("state.offers was undefined or not an array, reinitializing to []");
          state.offers = [];
        }
        console.log("Current state.offers before push:", state.offers);
        state.offers.push({
          ...action.payload.offer,
          driver_id: {
            ...action.payload.offer.driver_id,
            phoneNumber: action.payload.offer.driver_id.phoneNumber.trim(),
            vehicleNumber: action.payload.offer.driver_id.vehicleNumber.trim(),
            vehicleType: action.payload.offer.driver_id.vehicleType.trim(),
          },
          order_id: typeof action.payload.offer.order_id === "string"
            ? action.payload.offer.order_id
            : {
                ...action.payload.offer.order_id,
                vehicle_type: action.payload.offer.order_id.vehicle_type.trim(),
              },
        });
        console.log("Current state.offers after push:", state.offers);
      })
      .addCase(createOffer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to create offer";
        console.error("createOffer rejected:", state.error);
      })
      // getOrderOffers cases
      .addCase(getOrderOffers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getOrderOffers.fulfilled, (state, action: PayloadAction<Offer[]>) => {
        state.status = "succeeded";
        // Ensure action.payload is an array
        const offers = Array.isArray(action.payload) ? action.payload : [];
        console.log("getOrderOffers payload:", offers);
        state.offers = offers.map((offer) => ({
          ...offer,
          driver_id: {
            ...offer.driver_id,
            phoneNumber: offer.driver_id.phoneNumber.trim(),
            vehicleNumber: offer.driver_id.vehicleNumber.trim(),
            vehicleType: offer.driver_id.vehicleType.trim(),
          },
          order_id: typeof offer.order_id === "string"
            ? offer.order_id
            : {
                ...offer.order_id,
                vehicle_type: offer.order_id.vehicle_type.trim(),
              },
        }));
        console.log("Current state.offers after getOrderOffers:", state.offers);
      })
      .addCase(getOrderOffers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch offers";
        console.error("getOrderOffers rejected:", state.error);
      });
  },
});

export const { clearError, resetStatus } = offersSlice.actions;

export default offersSlice.reducer;