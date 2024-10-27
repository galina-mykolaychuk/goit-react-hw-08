// RegistrationPage.jsx

import React from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import "./RegistrationPage.module.css";

const RegistrationPage = () => (
  <div
    style={{
      maxWidth: "600px",
      margin: "0 auto",
      textAlign: "center",
      padding: "20px",
    }}
  >
    <h1>Register</h1>

    <p
      style={{
        textAlign: "justify",
        padding: "20px",
      }}
    >
      Join to keep your essential contacts in one app and secure place. Just
      complete the form and start your journey!
    </p>
    <br></br>
    <RegistrationForm />
    <br></br>
  </div>
);

export default RegistrationPage;
