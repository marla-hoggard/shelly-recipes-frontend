/* eslint-disable func-names */
import React, { useCallback, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { createUser } from "../../api-users";
import { InputField } from "../RecipeForm/FormComponents";
import classes from "./Authentication.module.scss";

type FormValues = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const defaultValues: FormValues = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  username: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(20, "Must be at most 20 characters")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .max(20, "Must be at most 20 characters")
    .required("Required"),
  password_confirmation: Yup.string()
    .min(6, "Must be at least 6 characters")
    .max(20, "Must be at most 20 characters")
    .test("password-match", "Must match your password", function (value) {
      return this.parent.password === value;
    })
    .required("Required"),
});

const LoginForm: React.FC = () => {
  const [generalError, setGeneralError] = useState("");
  const handleSubmit = useCallback(
    async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
      setSubmitting(true);
      const { first_name, last_name, email, username, password } = values;
      const result = await createUser({ first_name, last_name, email, username, password });
      if ("user" in result) {
        setSubmitting(false);
        // log in the user
        console.log("Sign up and logged in!", result);
      } else {
        setGeneralError(result.error);
        setSubmitting(false);
      }
    },
    [],
  );
  return (
    <>
      <h1 className={classes.pageTitle}>Sign Up</h1>
      <Formik
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={classes.form}>
            <div className={classes.formRow}>
              <InputField
                name="first_name"
                placeholder="First Name"
                hasError={!!(errors.first_name && touched.first_name)}
              />
              <InputField
                name="last_name"
                placeholder="Last Name"
                hasError={!!(errors.last_name && touched.last_name)}
              />
            </div>
            <div className={classes.formRow}>
              <InputField
                name="email"
                placeholder="Email"
                hasError={!!(errors.email && touched.email)}
              />
            </div>
            <div className={classes.formRow}>
              <InputField
                name="username"
                placeholder="Username"
                hasError={!!(errors.username && touched.username)}
              />
            </div>
            <div className={classes.formRow}>
              <InputField
                name="password"
                placeholder="Password"
                hasError={!!(errors.password && touched.password)}
              />
              <InputField
                name="password_confirmation"
                placeholder="Confirm Password"
                hasError={!!(errors.password_confirmation && touched.password_confirmation)}
              />
            </div>
            <div>
              <button className={classes.submit} type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
            <div>
              <div className={classes.errorMessage}>{generalError}</div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
