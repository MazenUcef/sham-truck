import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiService } from "@/config";
import { GeneralUser, GeneralUserState } from "@/types";

const initialState: GeneralUserState = {
  user: null,
  status: "idle",
  error: null,
};

export const getGeneralUser = createAsyncThunk<
  GeneralUser,
  { id: string; role: string },
  { rejectValue: string }
>("generalUser/getGeneralUser", async ({ id, role }, { rejectWithValue }) => {
  try {
    const response = await apiService.get<GeneralUser>(
      `/api/auth/getGeneralUser/${id}/${role}`
    );
    
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to fetch user data"
    );
  }
});

const generalUserSlice = createSlice({
  name: "generalUser",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
    clearUser: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGeneralUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getGeneralUser.fulfilled, (state, action: PayloadAction<GeneralUser>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getGeneralUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch user data";
        state.user = null;
      });
  },
});

export const { clearError, resetStatus, clearUser } = generalUserSlice.actions;

export default generalUserSlice.reducer;