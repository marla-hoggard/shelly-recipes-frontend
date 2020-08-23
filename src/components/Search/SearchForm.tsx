import React from "react";
import { Formik, FormikHelpers, Form } from "formik";
import { Category } from "../../types/api.types";
import { CATEGORIES } from "../../constants";
import { RadioGroup, SelectField, InputField } from "./SearchFormComponents";
import classes from "./Search.module.scss";

export type SearchValues = {
  matchType: "any" | "all";
  category: Category;
  vegetarian: boolean | "";
  wildcard: string;
  title: string;
  source: string;
  submitted_by: string;
  tags: string;
  ingredients: string;
  step: string;
  footnote: string;
};

export const defaultValues: SearchValues = {
  matchType: "any",
  category: "",
  vegetarian: "",
  wildcard: "",
  title: "",
  source: "",
  submitted_by: "",
  tags: "",
  ingredients: "",
  step: "",
  footnote: "",
};

type Props = {
  paramValues: Partial<SearchValues>;
};

const SearchForm: React.FC<Props> = ({ paramValues }) => {
  return (
    <>
      <h1 className={classes.pageTitle}>Search Recipes</h1>
      <Formik
        initialValues={{
          ...defaultValues,
          ...paramValues,
        }}
        onSubmit={(values, { setSubmitting }: FormikHelpers<SearchValues>) => {
          setSubmitting(true);
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            <div className={classes.formRow}>
              <RadioGroup
                name="matchType"
                title="Match:"
                options={["any", "all"]}
                defaultOption="any"
              />
              <SelectField name="category" title="CATEGORY" options={CATEGORIES} />
              <RadioGroup name="vegetarian" options={["vegetarian", "non-vegetarian"]} />
            </div>
            <div className={classes.formRow}>
              <InputField labelText="Global:" name="wildcard" placeholder="Search any field" />
              <InputField labelText="Title:" name="title" />
            </div>
            <div className={classes.formRow}>
              <InputField labelText="Source:" name="source" />
              <InputField labelText="Submitted By:" name="submitted_by" />
            </div>
            <div className={classes.formRow}>
              <InputField labelText="Tags:" name="tags" placeholder="Use comma for multiple" />
              <InputField
                labelText="Ingredients:"
                name="title"
                placeholder="Use comma for multiple"
              />
            </div>
            <div className={classes.formRow}>
              <InputField labelText="Steps:" name="step" />
              <InputField labelText="Footnotes:" name="footnote" />
            </div>
            <div className={classes.formRow}>
              <button className={classes.submit} type="submit" disabled={isSubmitting}>
                Search
              </button>
            </div>
            <div className={classes.formRow}>
              <div className={classes.errorMessage}></div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SearchForm;
