import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from "./slices/AuthSlice";
import vehicleTypesReducer from "./slices/VehicleTypesSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // whitelist: ['auth'], // Only persist auth state
  // blacklist: ['post', 'comments'] // Don't persist these
};

const rootReducer = combineReducers({
  auth: authReducer,
  vehicleTypes: vehicleTypesReducer,
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
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;