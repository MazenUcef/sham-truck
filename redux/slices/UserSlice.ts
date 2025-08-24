import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiService } from "@/config";
import { User } from "@/types";

interface UserState {
    user: User | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

export interface UserUpdate {
    fullName?: string;
    email?: string;
    phoneNumber?: string;
}

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}

const initialState: UserState = {
    user: null,
    status: "idle",
    error: null,
};

export const getUser = createAsyncThunk<
    User,
    string,
    { rejectValue: string }
>("user/getUser", async (id, { rejectWithValue }) => {
    try {
        const response = await apiService.get<User>(`/api/user/${id}`);
        return response;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || error.message || "Failed to fetch user"
        );
    }
});

export const updateUser = createAsyncThunk<
    { message: string; user: User },
    { id: string; userData: UserUpdate },
    { rejectValue: string }
>("user/updateUser", async ({ id, userData }, { rejectWithValue }) => {
    try {
        const response = await apiService.put<{ message: string; user: User }>(
            `/api/user/${id}`,
            userData
        );
        return response;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || error.message || "User update failed"
        );
    }
});


export const changePassword = createAsyncThunk<
    { message: string },
    { id: string; passwordData: ChangePasswordData },
    { rejectValue: string }
>("user/changePassword", async ({ id, passwordData }, { rejectWithValue }) => {
    try {
        const response = await apiService.post<{ message: string }>(
            `/api/user/${id}/change-password`,
            passwordData
        );
        return response;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || error.message || "Password change failed"
        );
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Get user
            .addCase(getUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
                state.error = null;
                AsyncStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch user";
            })
            // Update user
            .addCase(updateUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
                state.error = null;
                AsyncStorage.setItem("user", JSON.stringify(action.payload.user));
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "User update failed";
            })

            .addCase(changePassword.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Password change failed";
            });
    },
});

export const { clearError, setUser } = userSlice.actions;

export default userSlice.reducer;