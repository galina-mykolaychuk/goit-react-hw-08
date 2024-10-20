// auth/operations.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Встановлюємо базовий URL для запитів до API
axios.defaults.baseURL = "https://connections-api.goit.global";

// Реєстрація нового користувача
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/signup", {
        name: credentials.name, // Поле name
        email: credentials.email, // Поле email
        password: credentials.password, // Поле password
      });
      return data;
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      // Перевірка коду помилки MongoDB
      if (error.response?.data.code === 11000) {
        return thunkAPI.rejectWithValue(
          "Email already in use. Please choose another one."
        );
      }
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Логін існуючого користувача
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/login", credentials);
      return data;
    } catch (error) {
      console.error("Login error:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Логаут користувача
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token; // Отримуємо токен з Redux state

  if (!persistedToken) {
    return thunkAPI.rejectWithValue("No token found"); // Якщо токен відсутній, повертаємо помилку
  }

  try {
    await axios.post("/users/logout", null, {
      headers: {
        Authorization: `Bearer ${persistedToken}`, // Додаємо токен в заголовок
      },
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Обробка помилки
  }
});

// Оновлення інформації про користувача (авторизація з токеном)
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const { data } = await axios.get("/users/current", {
        headers: {
          Authorization: `Bearer ${persistedToken}`,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
