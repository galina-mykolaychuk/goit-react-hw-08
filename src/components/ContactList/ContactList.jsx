// ContactList.jsx

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFilteredContacts,
  selectLoading,
  selectError,
} from "../../redux/contactsSlice";
import { fetchContacts, deleteContact } from "../../redux/contactsOps";
import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={styles.contactList}>
      {loading && <p>Loading contacts...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && contacts.length > 0 ? ( // Перевіряємо, чи є контакти
        contacts.map((contact) => (
          <Contact
            key={contact.id} // Унікальний ключ для кожного контакту
            contact={contact}
            deleteContact={handleDeleteContact}
          />
        ))
      ) : (
        <p>No contacts available.</p> // Повідомлення, якщо контактів немає
      )}
    </div>
  );
};

export default ContactList;
