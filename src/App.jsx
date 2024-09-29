// App.jsx

import React from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import styles from "./App.module.css";

const App = () => {
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
