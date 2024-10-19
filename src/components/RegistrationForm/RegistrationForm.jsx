// RegistrationForm.jsx

import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { register } from "../../redux/auth/operations";

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(register(values));
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={handleSubmit}
    >
      <Form>
        <label>Name</label>
        <Field name="name" type="text" required />

        <label>Email</label>
        <Field name="email" type="email" required />

        <label>Password</label>
        <Field name="password" type="password" required />

        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
