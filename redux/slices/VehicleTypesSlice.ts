import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiService } from "@/config";

interface VehicleType {
    _id: string;
    type: string;
    description: string;
    image: string;
    imagePublicId?: string;
}

interface VehicleTypesState {
    vehicleTypes: VehicleType[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: VehicleTypesState = {
    vehicleTypes: [],
    status: "idle",
    error: null,
};

export const fetchVehicleTypes = createAsyncThunk<
    VehicleType[],
    void,
    { rejectValue: string }
>("vehicleTypes/fetchVehicleTypes", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get<VehicleType[]>("/api/vehicle/types");
        console.log("Fetched vehicle types:", response);
        return response;
    } catch (error: any) {
        console.error("Fetch vehicle types error:", error);
        return rejectWithValue(
            error.response?.data?.message || error.message || "Failed to fetch vehicle types"
        );
    }
});

const vehicleTypesSlice = createSlice({
    name: "vehicleTypes",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVehicleTypes.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchVehicleTypes.fulfilled, (state, action: PayloadAction<VehicleType[]>) => {
                state.status = "succeeded";
                state.vehicleTypes = action.payload.map((vehicle) => ({
                    ...vehicle,
                    type: vehicle.type.trim(),
                }));
            })
            .addCase(fetchVehicleTypes.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch vehicle types";
            });
    },
});

export const { clearError } = vehicleTypesSlice.actions;

export default vehicleTypesSlice.reducer;