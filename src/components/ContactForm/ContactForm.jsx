// ContactForm.jsx

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addContact({ name, number }));
    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.contactForm}>
      <label htmlFor="contact-name" className={styles.contactNameLabel}>
        Contact name
      </label>
      <input
        type="text"
        id="contact-name"
        name="contactName"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        autoComplete="name"
        className={styles.input}
      />
      <label htmlFor="contact-number" className={styles.contactPhoneLabel}>
        Contact phone
      </label>
      <input
        type="tel"
        id="contact-number"
        name="contactNumber"
        placeholder="Phone number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        required
        autoComplete="tel"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
