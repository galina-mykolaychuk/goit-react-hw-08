// LoginPage.jsx

import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => (
  <div
    style={{
      maxWidth: "600px",
      margin: "0 auto",
      padding: "10px",
    }}
  >
    <h1
      style={{
        textAlign: "center",
      }}
    >
      Login
    </h1>
    <p
      style={{
        textAlign: "justify",
        padding: "10px",
      }}
    >
      Already our user? Please, enter your registration information to access
      your personal contact collection.
    </p>
    <LoginForm />
    <br></br>
  </div>
);

export default LoginPage;
