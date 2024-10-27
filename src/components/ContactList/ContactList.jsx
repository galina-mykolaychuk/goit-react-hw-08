// ContactList.jsx

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import ConfirmModal from "../Modal/ConfirmModal";
import { FaUser, FaPhone } from "react-icons/fa";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleDelete = (contact) => {
    setSelectedContact(contact);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedContact) {
      dispatch(deleteContact(selectedContact.id));
      setIsConfirmModalOpen(false);
      setSelectedContact(null); // Скидаємо вибраний контакт після видалення
    }
  };

  return (
    <>
      <ul className={styles.contactList}>
        {contacts.map((contact) => (
          <li key={contact.id} className={styles.contactItem}>
            <div className={styles.contactCard}>
              <div className={styles.contactInfo}>
                <div className={styles.contactRow}>
                  <FaUser /> {contact.name}
                </div>
                <div className={styles.contactRow}>
                  <FaPhone /> {contact.number}
                </div>
              </div>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(contact)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete the contact ${selectedContact ? selectedContact.name : ""}?`}
      />
    </>
  );
};

export default ContactList;
