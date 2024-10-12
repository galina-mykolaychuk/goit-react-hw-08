// contactsSlice.js

import { createSlice, createSelector } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact as addContactOp,
  deleteContact,
} from "./contactsOps";
import { selectNameFilter } from "./filtersSlice";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Експорт дії addContact
    addContact: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Операція отримання контактів
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Операція додавання контакту
      .addCase(addContactOp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContactOp.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addContactOp.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Операція видалення контакту
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload.id
        );
        state.loading = false;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Селектори стану контактів
export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

// Мемоізований селектор для фільтрації контактів
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

// Експорт дії addContact
export const { addContact } = contactsSlice.actions;

export default contactsSlice.reducer;
