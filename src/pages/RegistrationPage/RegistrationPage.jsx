// RegistrationPage.jsx

import React from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import css from "./RegistrationPage.module.css";

const RegistrationPage = () => (
  <div className={css.wrap}>
    <h1 className={css.title}>Register</h1>
    <p className={css.text}>
      Join to keep your essential contacts in one app and secure place. Just
      complete the form and start your journey!
    </p>
    <br />
    <RegistrationForm />
    <br />
  </div>
);

export default RegistrationPage;
