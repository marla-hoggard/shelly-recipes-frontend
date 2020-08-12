import React from "react";
import { Field, ErrorMessage } from "formik";

import classes from "./RecipeForm.module.scss";

type InputFieldProps = {
  labelText: string;
  name: string;
  hasError: boolean;
  placeholder?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  labelText,
  name,
  placeholder,
  hasError,
}) => (
  <>
    <label className={classes.label} htmlFor={name}>
      {labelText}
    </label>
    <Field
      className={hasError ? classes.inputError : classes.input}
      name={name}
      type="text"
      placeholder={placeholder}
    />
    {hasError && (
      <div className={classes.errorMessage}>
        <ErrorMessage name={name} />
      </div>
    )}
  </>
);

type TextAreaFieldProps = {
  labelText?: string;
  name: string;
  hasError: boolean;
  placeholder?: string;
};

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  labelText,
  name,
  hasError,
  placeholder,
}) => (
  <>
    {labelText && (
      <label className={classes.label} htmlFor={name}>
        {labelText}
      </label>
    )}
    <Field
      className={hasError ? classes.textareaError : classes.textarea}
      name={name}
      as="textarea"
      placeholder={placeholder}
    />
    {hasError && (
      <div className={classes.errorMessage}>
        <ErrorMessage name={name} />
      </div>
    )}
  </>
);

type SelectFieldProps = {
  options: string[];
  title: string;
  name: string;
  hasError: boolean;
};

export const SelectField: React.FC<SelectFieldProps> = ({ hasError, name, options, title }) => (
  <Field className={hasError ? classes.selectError : classes.select} name={name} as="select">
    <option defaultValue={title}>{title}</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </Field>
);

type CheckboxFieldProps = {
  labelText?: string;
  name: string;
};

export const CheckboxField: React.FC<CheckboxFieldProps> = ({ labelText, name }) =>
  labelText ? (
    <label>
      <Field className={classes.checkbox} type="checkbox" name={name} />
      {labelText}
    </label>
  ) : (
    <Field className={classes.checkbox} type="checkbox" name={name} />
  );
