import { apiService } from "@/config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Update your types to separate the API response from the user data
export interface GeneralUser {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface GeneralUserResponse {
  message: string;
  user: GeneralUser;
}

export interface GeneralUserState {
  user: GeneralUser | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Then update your thunk
export const getGeneralUser = createAsyncThunk<
  GeneralUser, // Now this matches what we're returning (response.user)
  { id: string; role: string },
  { rejectValue: string }
>("generalUser/getGeneralUser", async ({ id, role }, { rejectWithValue }) => {
  try {
    const response = await apiService.get<GeneralUserResponse>(
      `/api/auth/getGeneralUser/${id}/${role}`
    );
    
    return response.user; // This returns just the user object
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to fetch user data"
    );
  }
});


const initialState: GeneralUserState = {
  user: null,
  status: "idle",
  error: null,
};

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