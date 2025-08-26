import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiService } from "@/config";
import { OfferResponse, CreateOfferInput, Offer, OffersState } from "@/types";

const initialState: OffersState = {
  offers: [],
  status: "idle",
  error: null,
};

export const createOffer = createAsyncThunk<
  OfferResponse,
  CreateOfferInput,
  { rejectValue: string }
>("offers/createOffer", async (offerData, { rejectWithValue }) => {
  try {
    const response = await apiService.post<OfferResponse>("/api/offers", offerData);
    return response;
  } catch (error: any) {
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
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to fetch offers"
    );
  }
});

export const acceptOffer = createAsyncThunk<
  OfferResponse,
  string,
  { rejectValue: string }
>("offers/acceptOffer", async (offerId, { rejectWithValue }) => {
  try {
    const response = await apiService.post<OfferResponse>(`/api/offers/${offerId}/accept`, {});
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to accept offer"
    );
  }
});

export const getDriverOffers = createAsyncThunk<
  Offer[],
  void,
  { rejectValue: string }
>("offers/getDriverOffers", async (_, { rejectWithValue }) => {
  try {
    const response = await apiService.get<Offer[]>("/api/offers/driver");
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to fetch driver offers"
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

      .addCase(createOffer.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOffer.fulfilled, (state, action: PayloadAction<OfferResponse>) => {
        state.status = "succeeded";
        state.offers.push(action.payload.offer);
      })
      .addCase(createOffer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to create offer";
      })

      .addCase(getOrderOffers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getOrderOffers.fulfilled, (state, action: PayloadAction<Offer[]>) => {
        state.status = "succeeded";
        state.offers = action.payload;
      })
      .addCase(getOrderOffers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch offers";
      })

      .addCase(getDriverOffers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getDriverOffers.fulfilled, (state, action: PayloadAction<Offer[]>) => {
        state.status = "succeeded";
        state.offers = action.payload;
      })
      .addCase(getDriverOffers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch driver offers";
      })

      .addCase(acceptOffer.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(acceptOffer.fulfilled, (state, action: PayloadAction<OfferResponse>) => {
        state.status = "succeeded";
        const updatedOffer = action.payload.offer;
        const existingIndex = state.offers.findIndex((o) => o._id === updatedOffer._id);
        if (existingIndex >= 0) {
          state.offers[existingIndex] = updatedOffer;
        } else {
          state.offers.push(updatedOffer);
        }
      })
      .addCase(acceptOffer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to accept offer";
      });
  },
});

export const { clearError, resetStatus } = offersSlice.actions;

export default offersSlice.reducer;