import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiService } from "@/config";
import { AuthState, ChangePasswordData, Driver, LoginData, SignupUserData, UpdateUserData, User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
  isAuthenticated: false
};

export const signupUser = createAsyncThunk<
  { user: User; token: string },
  SignupUserData,
  { rejectValue: string }
>("auth/signupUser", async (data, { rejectWithValue }) => {

  try {
    const response = await apiService.post<{ user: User; token: string }>("/api/auth/signup/user", data);
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to sign up user"
    );
  }
});

export const signupDriver = createAsyncThunk<
  { driver: Driver; token: string },
  FormData,
  { rejectValue: string }
>("auth/signupDriver", async (formData, { rejectWithValue }) => {
  try {
    const response = await apiService.post<{ driver: Driver; token: string }>(
      "/api/auth/signup/driver",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response;
  } catch (error: any) {
    console.log("signupDriver",error);
    
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to sign up driver"
    );
  }
});

export const login = createAsyncThunk<
  { user: User | Driver; token: string },
  LoginData,
  { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = await apiService.post<{ user: User | Driver; token: string }>(
      "/api/auth/login",
      data
    );
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to login"
    );
  }
});

export const updateUser = createAsyncThunk<
  { user: User },
  UpdateUserData,
  { rejectValue: string }
>("auth/updateUser", async (data, { rejectWithValue }) => {
  try {
    const response = await apiService.put<{ user: User }>("/api/auth/update/user", data);
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to update user"
    );
  }
});

export const updateDriver = createAsyncThunk<
  { driver: Driver },
  FormData,
  { rejectValue: string }
>("auth/updateDriver", async (formData, { rejectWithValue }) => {
  try {
    const response = await apiService.put<{ driver: Driver }>(
      "/api/auth/update/driver",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response;
  } catch (error: any) {
    console.log("error",error);
    
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to update driver"
    );
  }
});

export const changePassword = createAsyncThunk<
  void,
  ChangePasswordData,
  { rejectValue: string }
>("auth/changePassword", async (data, { rejectWithValue }) => {
  try {
    await apiService.put("/api/auth/change-password", data);
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to change password"
    );
  }
});

export const getUserById = createAsyncThunk<
  { user: User },
  void,
  { rejectValue: string }
>("auth/getUserById", async (_, { rejectWithValue }) => {
  try {
    const response = await apiService.get<{ user: User }>("/api/auth/user/me");
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to fetch user"
    );
  }
});

export const getDriverById = createAsyncThunk<
  { driver: Driver },
  void,
  { rejectValue: string }
>("auth/getDriverById", async (_, { rejectWithValue }) => {
  try {
    const response = await apiService.get<{ driver: Driver }>("/api/auth/driver/me");
    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to fetch driver"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.isAuthenticated = false;
      state.error = null;
      AsyncStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        AsyncStorage.setItem('token', action.payload.token)
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to sign up user";
        state.isAuthenticated = false;
      })
      .addCase(signupDriver.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupDriver.fulfilled, (state, action: PayloadAction<{ driver: Driver; token: string }>) => {
        state.status = "succeeded";
        state.user = action.payload.driver;
        state.token = action.payload.token;
        AsyncStorage.setItem('token', action.payload.token)
        state.isAuthenticated = true;
      })
      .addCase(signupDriver.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.error = action.payload || "Failed to sign up driver";
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User | Driver; token: string }>) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        AsyncStorage.setItem('token', action.payload.token)
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to login";
        state.isAuthenticated = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update user";
      })
      .addCase(updateDriver.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateDriver.fulfilled, (state, action: PayloadAction<{ driver: Driver }>) => {
        state.status = "succeeded";
        state.user = action.payload.driver;
        state.isAuthenticated = true;
      })
      .addCase(updateDriver.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update driver";
      })
      .addCase(changePassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to change password";
      })
      .addCase(getUserById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch user";
      })
      .addCase(getDriverById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getDriverById.fulfilled, (state, action: PayloadAction<{ driver: Driver }>) => {
        state.status = "succeeded";
        state.user = action.payload.driver;
        state.isAuthenticated = true;
      })
      .addCase(getDriverById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch driver";
      });
  },
});

export const { clearError, resetStatus, logout } = authSlice.actions;

export default authSlice.reducer;