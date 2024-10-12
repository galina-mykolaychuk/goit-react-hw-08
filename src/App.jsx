// App.jsx

import React, { useEffect } from "react";
import { useDispatch } from "react-redux"; // Імпорт useDispatch з Redux
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import styles from "./App.module.css";
import { fetchContacts } from "./redux/contactsOps";

const App = () => {
  const dispatch = useDispatch(); // Отримання доступу до dispatch

  useEffect(() => {
    dispatch(fetchContacts()); // Виклик fetchContacts при завантаженні
  }, [dispatch]); // Додати dispatch як залежність

  return (
    <div className={styles.appContainer}>
      <div className={styles.sidebar}>
        <h1>Phonebook</h1>
        <ContactForm />
        <SearchBox />
      </div>
      <div className={styles.content}>
        <ContactList />
      </div>
    </div>
  );
};

export default App;
