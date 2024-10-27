// contacts/slice.js

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
} from "./operations";
import { logOut } from "../auth/operations"; // Імпорт дії logOut

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload,
        );
        state.loading = false;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Додаємо обробку logOut.fulfilled для очищення стану контактів
      .addCase(logOut.fulfilled, (state) => {
        state.items = []; // Очищення списку контактів
        state.loading = false; // Скидання стану завантаження
        state.error = null; // Скидання помилки
      });
  },
});

export default contactsSlice.reducer;
