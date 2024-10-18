// operations.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Реєстрація нового користувача
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/auth/register", credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Логін існуючого користувача
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/auth/login", credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Логаут користувача
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/api/auth/logout");
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Оновлення користувача
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const { data } = await axios.get("/api/auth/refresh", {
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
