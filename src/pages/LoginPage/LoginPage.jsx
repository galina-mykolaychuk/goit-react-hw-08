// LoginPage.jsx

import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => (
  <div
    style={{
      maxWidth: "600px",
      margin: "0 auto",
      textAlign: "left",
      padding: "30px",
    }}
  >
    <h1>Login</h1>
    <p
      style={{
        textAlign: "justify",
        padding: "20px",
      }}
    >
      Already our user? Please, enter your registration information to access
      your personal contact collection.
    </p>
    <LoginForm />
  </div>
);

export default LoginPage;
