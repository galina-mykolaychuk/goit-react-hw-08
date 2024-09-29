// ContactList.jsx

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectContacts, deleteContact } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";
import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.contactList}>
      {filteredContacts.map((contact) => (
        <Contact
          key={contact.id}
          contact={contact}
          deleteContact={handleDeleteContact}
        />
      ))}
    </div>
  );
};

export default ContactList;
