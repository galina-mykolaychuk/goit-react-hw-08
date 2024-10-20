// RegistrationForm.jsx

import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { register } from "../../redux/auth/operations";
import { useState } from "react";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    try {
      await dispatch(register(values)).unwrap();
      // Додайти тут логіку для успішної реєстрації
    } catch (error) {
      setError(error); // Встановлюємо повідомлення про помилку
    }
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div>
            <label htmlFor="name">Name</label>
            <Field
              name="name"
              type="text"
              id="name"
              required
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              type="email"
              id="email"
              required
              autoComplete="email"
            />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              type="password"
              id="password"
              required
              autoComplete="new-password"
            />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit">Register</button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
