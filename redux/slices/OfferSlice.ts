import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiService } from "@/config";
import { Offer, OffersState } from "@/types";

const initialState: OffersState = {
    offers: [],
    offer: null,
    status: "idle",
    error: null,
};

export const createOffer = createAsyncThunk<
    Offer,
    {
        order_id: string;
        price: number;
        notes?: string;
    },
    { rejectValue: string }
>("offers/createOffer", async (offerData, { rejectWithValue }) => {
    try {
        const response = await apiService.post<Offer>("/api/offers/create", offerData);
        return response;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || error.message || "Failed to create offer"
        );
    }
});

export const fetchDriverOffers = createAsyncThunk<
    Offer[],
    void,
    { rejectValue: string }
>("offers/fetchDriverOffers", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get<Offer[]>("/api/offers/driver/me");
        return response.offers;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || error.message || "Failed to fetch driver offers"
        );
    }
});

export const fetchOrderOffers = createAsyncThunk<
    Offer[],
    string,
    { rejectValue: string }
>("offers/fetchOrderOffers", async (orderId, { rejectWithValue }) => {
    try {
        const response = await apiService.get<Offer[]>(`/api/offers/order/${orderId}`);
        return response.offers;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || error.message || "Failed to fetch order offers"
        );
    }
});

export const acceptOffer = createAsyncThunk<
    Offer,
    string,
    { rejectValue: string }
>("offers/acceptOffer", async (offerId, { rejectWithValue }) => {
    try {
        const response = await apiService.put<Offer>(`/api/offers/accept/${offerId}`, {});
        return response;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || error.message || "Failed to accept offer"
        );
    }
});

const offersSlice = createSlice({
    name: "offers",
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
            // Create Offer
            .addCase(createOffer.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createOffer.fulfilled, (state, action: PayloadAction<Offer>) => {
                state.status = "succeeded";
                state.offers = [...state.offers, action.payload];
            })
            .addCase(createOffer.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to create offer";
            })
            // Fetch Driver Offers
            .addCase(fetchDriverOffers.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchDriverOffers.fulfilled, (state, action: PayloadAction<Offer[]>) => {
                state.status = "succeeded";
                state.offers = action.payload;
            })
            .addCase(fetchDriverOffers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch driver offers";
            })
            // Fetch Order Offers
            .addCase(fetchOrderOffers.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchOrderOffers.fulfilled, (state, action: PayloadAction<Offer[]>) => {
                state.status = "succeeded";
                state.offers = action.payload;
            })
            .addCase(fetchOrderOffers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch order offers";
            })
            // Accept Offer
            .addCase(acceptOffer.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(acceptOffer.fulfilled, (state, action: PayloadAction<Offer>) => {
                state.status = "succeeded";
                state.offer = action.payload;
                state.offers = state.offers.map((offer) =>
                    offer.id === action.payload.id
                        ? action.payload
                        : { ...offer, status: offer.id !== action.payload.id ? "Rejected" : offer.status }
                );
            })
            .addCase(acceptOffer.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to accept offer";
            });
    },
});

export const { clearError, resetStatus } = offersSlice.actions;

export default offersSlice.reducer;