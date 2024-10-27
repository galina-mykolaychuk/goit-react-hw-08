// contacts/operations.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Отримання всіх контактів
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const response = await axios.get(
        "https://connections-api.goit.global/contacts",
        {
          headers: {
            Authorization: `Bearer ${persistedToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Додавання нового контакту
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const response = await axios.post(
        "https://connections-api.goit.global/contacts",
        contact,
        {
          headers: {
            Authorization: `Bearer ${persistedToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Видалення контакту за ID
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      await axios.delete(
        `https://connections-api.goit.global/contacts/${contactId}`,
        {
          headers: {
            Authorization: `Bearer ${persistedToken}`,
          },
        },
      );
      return contactId;
    } catch (error) {
      console.error("Error deleting contact:", error.response.data);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Оновлення контакту за ID
export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ contactId, contactData }, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const response = await axios.patch(
        `https://connections-api.goit.global/contacts/${contactId}`,
        contactData,
        {
          headers: {
            Authorization: `Bearer ${persistedToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error updating contact:", error.response.data);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
