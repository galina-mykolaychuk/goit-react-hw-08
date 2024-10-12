// contactsOps.js

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// URL для роботи з API
axios.defaults.baseURL = "https://670a53fbac6860a6c2c92fc0.mockapi.io";

// Отримання всіх контактів
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Додавання нового контакту
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post("/contacts", contact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Видалення контакту за ID
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    console.log("Deleting contact with id:", contactId); // Логування id контакту
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      console.log("Response from delete:", response); // Логування відповіді
      return response.data;
    } catch (error) {
      console.error("Error deleting contact:", error.message); // Логування помилок
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
