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

  // Отримуємо контакти з бекенду при завантаженні компонента
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // Обробник для видалення контакту
  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={styles.contactList}>
      {/* Відображення списку контактів */}
      {loading && <p>Loading contacts...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && contacts.length > 0 ? (
        contacts.map((contact) => (
          <Contact
            key={contact.id}
            contact={contact}
            deleteContact={handleDeleteContact}
          />
        ))
      ) : (
        <p>Please, wait.</p>
      )}
    </div>
  );
};

export default ContactList;
