// LoginPage.jsx

import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import css from "./LoginPage.module.css";

const LoginPage = () => (
  <div className={css.wrap}>
    <h1 className={css.title}>Login</h1>
    <p className={css.text}>
      Already our user? Please, enter your registration information to access
      your personal contact collection.
    </p>
    <LoginForm />
    <br />
  </div>
);

export default LoginPage;
