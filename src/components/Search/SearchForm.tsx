import React from "react";
import { Formik, FormikHelpers, Form } from "formik";
import { Category, SearchParams, Recipe } from "../../types/api.types";
import { CATEGORIES } from "../../constants";
import { RadioGroup, SelectField, InputField } from "./SearchFormComponents";
import classes from "./Search.module.scss";
import { searchRecipes } from "../../api";

export type SearchValues = {
  matchType: "any" | "all";
  category: Category;
  vegetarian: string;
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
  setSearchResults: (results: Recipe[]) => void;
};

const SearchForm: React.FC<Props> = ({ paramValues, setSearchResults }) => {
  return (
    <>
      <h1 className={classes.pageTitle}>Search Recipes</h1>
      <Formik
        initialValues={{
          ...defaultValues,
          ...paramValues,
        }}
        onSubmit={async (values, { setSubmitting }: FormikHelpers<SearchValues>) => {
          setSubmitting(true);
          const searchParams: SearchParams = Object.fromEntries(
            Object.entries(values).filter(([key, value]) => !!value && key !== "matchAll"),
          );
          if (values.matchType === "all") {
            searchParams.all = true;
          }
          if (values.vegetarian) {
            searchParams.vegetarian = values.vegetarian === "vegetarian";
          }
          const results = await searchRecipes(searchParams);
          setSearchResults(results);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            <div className={classes.formRow}>
              <RadioGroup name="matchType" title="Match:" options={["any", "all"]} />
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
                name="ingredients"
                placeholder="Use comma for multiple"
              />
            </div>
            <div className={classes.formRow}>
              <InputField labelText="Steps:" name="step" />
              <InputField labelText="Footnotes:" name="footnote" />
            </div>
            <div className={classes.buttonRow}>
              <button className={classes.button} type="submit" disabled={isSubmitting}>
                Search
              </button>
              <button className={classes.button} type="reset">
                Reset
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SearchForm;
