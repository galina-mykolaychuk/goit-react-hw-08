// auth/operations.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Встановлюємо базовий URL для запитів до API
axios.defaults.baseURL = "https://connections-api.goit.global";

// Допоміжна функція для додавання токена в заголовок
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Допоміжна функція для очищення заголовка авторизації
const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

// Реєстрація нового користувача
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/signup", credentials);
      setAuthHeader(data.token); // Додаємо токен до заголовка після реєстрації
      return data;
    } catch (error) {
      // Обробка помилки при реєстрації
      if (error.response?.data.code === 11000) {
        return thunkAPI.rejectWithValue(
          "Email already in use. Please choose another one.",
        );
      }
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Логін існуючого користувача
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/login", credentials);
      setAuthHeader(data.token); // Додаємо токен до заголовка після логіну
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Логаут користувача
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader(); // Очищаємо заголовок після логауту
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Оновлення інформації про користувача (авторизація з токеном)
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token; // Отримання токена з Redux

    // Перевірка наявності токена
    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      setAuthHeader(persistedToken); // Додаємо токен до заголовка перед запитом
      const { data } = await axios.get("/users/current");
      return data; // Повертаємо дані користувача
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Обробка помилки
    }
  },
);
