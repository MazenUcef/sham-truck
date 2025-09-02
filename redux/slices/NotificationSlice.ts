import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiService } from "@/config";
import { Notification, NotificationsState, PaginatedNotifications } from "@/types";

const initialState: NotificationsState = {
    notifications: [],
    unreadCount: 0,
    status: "idle",
    error: null,
    pagination: {
        currentPage: 1,
        totalPages: 1,
        total: 0,
        limit: 20
    }
};

export const fetchNotifications = createAsyncThunk<
    PaginatedNotifications,
    { page?: number; limit?: number; unreadOnly?: boolean },
    { rejectValue: string }
>(
    "notifications/fetchNotifications",
    async ({ page = 1, limit = 20, unreadOnly = false }, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                unreadOnly: unreadOnly.toString()
            });

            const response = await apiService.get<PaginatedNotifications>(
                `/api/notifications?${params}`
            );
            return response;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "Failed to fetch notifications"
            );
        }
    }
);

export const fetchUnreadCount = createAsyncThunk<
    number,
    void,
    { rejectValue: string }
>(
    "notifications/fetchUnreadCount",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.get<{ unreadCount: number }>(
                "/api/notifications/unread-count"
            );
            return response.unreadCount;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "Failed to fetch unread count"
            );
        }
    }
);

export const markAsRead = createAsyncThunk<
    Notification,
    string,
    { rejectValue: string }
>(
    "notifications/markAsRead",
    async (id, { rejectWithValue }) => {
        try {
            const response = await apiService.patch<{ notification: Notification }>(
                `/api/notifications/${id}/read`
                , {});
            return response.notification;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "Failed to mark notification as read"
            );
        }
    }
);

export const markAllAsRead = createAsyncThunk<
    void,
    void,
    { rejectValue: string }
>(
    "notifications/markAllAsRead",
    async (_, { rejectWithValue }) => {
        try {

            await apiService.patch("/api/notifications/read-all", {});
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "Failed to mark all notifications as read"
            );
        }
    }
);
export const deleteNotification = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>(
    "notifications/deleteNotification",
    async (id, { rejectWithValue }) => {
        try {
            await apiService.delete(`/api/notifications/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "Failed to delete notification"
            );
        }
    }
);

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        resetStatus: (state) => {
            state.status = "idle";
        },
        addNotification: (state, action: PayloadAction<Notification>) => {
            state.notifications.unshift(action.payload);
            if (!action.payload.is_read) {
                state.unreadCount += 1;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch notifications
            .addCase(fetchNotifications.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<PaginatedNotifications>) => {
                state.status = "succeeded";
                state.notifications = action.payload.notifications;
                state.unreadCount = action.payload.unreadCount;
                state.pagination = {
                    currentPage: action.payload.currentPage,
                    totalPages: action.payload.totalPages,
                    total: action.payload.total,
                    limit: action.payload.limit || 20
                };
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch notifications";
            })

            // Fetch unread count
            .addCase(fetchUnreadCount.fulfilled, (state, action: PayloadAction<number>) => {
                state.unreadCount = action.payload;
            })
            .addCase(fetchUnreadCount.rejected, (state, action) => {
                state.error = action.payload || "Failed to fetch unread count";
            })

            // Mark as read
            .addCase(markAsRead.fulfilled, (state, action: PayloadAction<Notification>) => {
                const index = state.notifications.findIndex(
                    (notification) => notification._id === action.payload._id
                );

                if (index !== -1) {
                    state.notifications[index] = action.payload;
                }

                if (state.unreadCount > 0) {
                    state.unreadCount -= 1;
                }
            })
            .addCase(markAsRead.rejected, (state, action) => {
                state.error = action.payload || "Failed to mark notification as read";
            })

            // Mark all as read
            .addCase(markAllAsRead.fulfilled, (state) => {
                state.notifications = state.notifications.map(notification => ({
                    ...notification,
                    is_read: true
                }));
                state.unreadCount = 0;
            })
            .addCase(markAllAsRead.rejected, (state, action) => {
                state.error = action.payload || "Failed to mark all notifications as read";
            })

            // Delete notification
            .addCase(deleteNotification.fulfilled, (state, action: PayloadAction<string>) => {
                const deletedNotification = state.notifications.find(
                    (notification) => notification._id === action.payload
                );

                state.notifications = state.notifications.filter(
                    (notification) => notification._id !== action.payload
                );

                if (deletedNotification && !deletedNotification.is_read && state.unreadCount > 0) {
                    state.unreadCount -= 1;
                }
            })
            .addCase(deleteNotification.rejected, (state, action) => {
                state.error = action.payload || "Failed to delete notification";
            });
    },
});

export const { clearError, resetStatus, addNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;