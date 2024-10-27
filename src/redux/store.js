// store.js

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Імпорт локального сховища для персистенції
import contactsReducer from "./contacts/slice";
import filtersReducer from "./filters/slice";
import authReducer from "./auth/slice";

// Налаштування конфігурації для персистенції auth
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

// Комбінуємо редюсери
const rootReducer = combineReducers({
  contacts: contactsReducer,
  filters: filtersReducer,
  auth: persistReducer(authPersistConfig, authReducer), // Додаємо persistReducer до authReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store); // Ініціалізуємо persistor
