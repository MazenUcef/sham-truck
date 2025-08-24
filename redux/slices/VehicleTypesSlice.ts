import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiService } from "@/config";

export interface VehicleType {
    _id: string;
    type: string;
    description: string;
    image: string;
    imagePublicId?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

interface VehicleTypesState {
    vehicleTypes: VehicleType[];
    vehicleType: VehicleType | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: VehicleTypesState = {
    vehicleTypes: [],
    vehicleType: null,
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

export const getVehicleTypeById = createAsyncThunk<
    VehicleType,
    string,
    { rejectValue: string }
>("vehicleTypes/getVehicleTypeById", async (id, { rejectWithValue }) => {
    try {
        const response = await apiService.get<VehicleType>(`/api/vehicle/types/${id}`);
        console.log("Fetched vehicle type by ID:", response);
        return response;
    } catch (error: any) {
        console.error("Get vehicle type by ID error:", error);
        return rejectWithValue(
            error.response?.data?.message || error.message || "Failed to fetch vehicle type"
        );
    }
});

export const createVehicleType = createAsyncThunk<
    VehicleType,
    { type: string; description?: string; image?: File },
    { rejectValue: string }
>("vehicleTypes/createVehicleType", async (vehicleData, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append("type", vehicleData.type);
        if (vehicleData.description) {
            formData.append("description", vehicleData.description);
        }
        if (vehicleData.image) {
            formData.append("image", vehicleData.image);
        }

        const response = await apiService.post<VehicleType>("/api/vehicle/types", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Created vehicle type:", response);
        return response;
    } catch (error: any) {
        console.error("Create vehicle type error:", error);
        return rejectWithValue(
            error.response?.data?.message || error.message || "Failed to create vehicle type"
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
        resetStatus: (state) => {
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchVehicleTypes cases
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
            })
            // getVehicleTypeById cases
            .addCase(getVehicleTypeById.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getVehicleTypeById.fulfilled, (state, action: PayloadAction<VehicleType>) => {
                state.status = "succeeded";
                state.vehicleType = {
                    ...action.payload,
                    type: action.payload.type.trim(),
                };
            })
            .addCase(getVehicleTypeById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch vehicle type";
            })
            // createVehicleType cases
            .addCase(createVehicleType.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createVehicleType.fulfilled, (state, action: PayloadAction<VehicleType>) => {
                state.status = "succeeded";
                state.vehicleTypes.push({
                    ...action.payload,
                    type: action.payload.type.trim(),
                });
            })
            .addCase(createVehicleType.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to create vehicle type";
            });
    },
});

export const { clearError, resetStatus } = vehicleTypesSlice.actions;

export default vehicleTypesSlice.reducer;