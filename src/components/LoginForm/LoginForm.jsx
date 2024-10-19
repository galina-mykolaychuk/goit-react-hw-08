// LoginForm.jsx

import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { login } from "../../redux/auth/operations";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(login(values));
  };

  return (
    <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit}>
      <Form>
        <label>Email</label>
        <Field name="email" type="email" required />

        <label>Password</label>
        <Field name="password" type="password" required />

        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
