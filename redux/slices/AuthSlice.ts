import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiService } from "@/config";
import {
  AuthResponse,
  AuthState,
  User,
  UserRegistration,
  LoginCredentials
} from "@/types";

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
  isAuthenticated: false,
  token: null,
  role: null
};

export const signupUser = createAsyncThunk<
  AuthResponse,
  UserRegistration,
  { rejectValue: string }
>("auth/signupUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await apiService.post<AuthResponse>("/api/auth/signup/user", userData);
    console.log(response);

    return response;
  } catch (error: any) {
    console.log(error);

    return rejectWithValue(
      error.response?.data?.message || error.message || "User registration failed"
    );
  }
});

export const signupDriver = createAsyncThunk<
  AuthResponse,
  FormData,
  { rejectValue: string }
>("auth/signupDriver", async (formData, { rejectWithValue }) => {
  try {
    console.log("formdataaaaaaaa",formData);
    
    const response = await apiService.post<AuthResponse>("/api/auth/signup/driver", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error: any) {
    console.log(error)
    return rejectWithValue(
      error.response?.data?.message || error.message || "Driver registration failed"
    );
  }
});

export const signin = createAsyncThunk<
  AuthResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth/signin", async (credentials, { rejectWithValue }) => {
  try {
    const response = await apiService.post<AuthResponse>("/api/auth/signin", credentials);
    return response; // Directly return the response
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Login failed"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;
      state.token = null;
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("user");
    },
    setAuthState: (state, action: PayloadAction<{ user: User | null; token: string | null }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload.user;
    },
    restoreAuthState: (state, action: PayloadAction<{ user: User | null; token: string | null }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload.user;
      state.status = "idle";
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign up user
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user || null;
        state.token = action.payload.token;
        state.isAuthenticated = !!action.payload.token;
        state.role = "user"

        if (action.payload.token) {
          AsyncStorage.setItem("token", action.payload.token);
          AsyncStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "User registration failed";
      })

      // Sign up driver
      .addCase(signupDriver.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupDriver.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.driver || null;
        state.token = action.payload.token;
        state.isAuthenticated = !!action.payload.token;
        state.role = "driver"

        if (action.payload.token) {
          AsyncStorage.setItem("token", action.payload.token);
          AsyncStorage.setItem("user", JSON.stringify(action.payload.driver));
        }
      })
      .addCase(signupDriver.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Driver registration failed";
      })

      // Sign in
      .addCase(signin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user || null;
        state.token = action.payload.token;
        state.isAuthenticated = !!action.payload.token;

        if (action.payload.token) {
          AsyncStorage.setItem("token", action.payload.token);
          AsyncStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed";
      });
  },
});

export const {
  logout,
  setAuthState,
  restoreAuthState,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;