import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiService } from "@/config";
import { VehicleType, VehicleTypesState } from "@/types";

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
    console.log("typesssssss",response);
    
    return response;
  } catch (error: any) {
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
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to fetch vehicle type"
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

      .addCase(fetchVehicleTypes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchVehicleTypes.fulfilled, (state, action: PayloadAction<VehicleType[]>) => {
        state.status = "succeeded";
        state.vehicleTypes = action.payload;
      })
      .addCase(fetchVehicleTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch vehicle types";
      })

      .addCase(getVehicleTypeById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getVehicleTypeById.fulfilled, (state, action: PayloadAction<VehicleType>) => {
        state.status = "succeeded";
        state.vehicleType = action.payload;
      })
      .addCase(getVehicleTypeById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch vehicle type";
      });
  },
});

export const { clearError, resetStatus } = vehicleTypesSlice.actions;

export default vehicleTypesSlice.reducer;