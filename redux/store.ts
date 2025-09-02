import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import vehicleTypesReducer from "./slices/VehicleTypesSlice";
import authReducer from "./slices/AuthSlice";
import ordersReducer from "./slices/OrderSlice";
import offersReducer from "./slices/OfferSlice";
import generalUserReducer from "./slices/GeneralSlice";
import notificationsReducer from "./slices/NotificationSlice";

// Define the shape of your state
export interface RootState {
  auth: ReturnType<typeof authReducer>;
  vehicleTypes: ReturnType<typeof vehicleTypesReducer>;
  orders: ReturnType<typeof ordersReducer>;
  offers: ReturnType<typeof offersReducer>;
  generalUser: ReturnType<typeof generalUserReducer>;
  notifications: ReturnType<typeof notificationsReducer>;
  _persist?: any; // Add _persist to account for redux-persist
}

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // whitelist: ['auth'], // Only persist auth state
  // blacklist: ['post', 'comments'] // Don't persist these
};

const rootReducer = combineReducers({
  auth: authReducer,
  vehicleTypes: vehicleTypesReducer,
  orders: ordersReducer,
  offers: offersReducer,
  generalUser: generalUserReducer,
  notifications: notificationsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;

export default store;