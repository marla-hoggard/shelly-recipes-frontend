import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { InputField, TextAreaField, SelectField, CheckboxField } from "./FormComponents";

import classes from "./RecipeForm.module.scss";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  source: Yup.string(),
  sourceUrl: Yup.string(),
  submittedBy: Yup.string().required("Required"),
  servings: Yup.string(),
  category: Yup.string().required("Required"),
  vegetarian: Yup.boolean(),
  ingredients: Yup.string().required("Required"),
  steps: Yup.string().required("Required"),
});

const AddRecipeForm: React.FC = () => {
  return (
    <>
      <h1 className={classes.pageTitle}>Add a New Recipe</h1>
      <Formik
        initialValues={{
          title: "",
          source: "",
          sourceUrl: "",
          submittedBy: "Marla Hoggard",
          servings: "",
          category: "",
          vegetarian: false,
          tags: "",
          ingredients: "",
          steps: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const body = {
            ...values,
            tags: values.tags.split(",").map((el) => el.trim()),
            ingredients: values.ingredients.split(/\n/),
            steps: values.steps.split(/\n+/),
          };
          console.log(body);
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={classes.form}>
            <div className={classes.formRow}>
              <InputField
                labelText="Recipe Title:"
                name="title"
                hasError={!!(errors.title && touched.title)}
              />
            </div>
            <div className={classes.formRow}>
              <InputField
                labelText="Original Source"
                name="source"
                hasError={!!(errors.source && touched.source)}
              />
            </div>
            <div className={classes.formRow}>
              <InputField
                labelText="Source URL:"
                name="sourceUrl"
                hasError={!!(errors.sourceUrl && touched.sourceUrl)}
              />
            </div>
            <div className={classes.formRow}>
              <InputField
                labelText="Submitted By:"
                name="submittedBy"
                hasError={!!(errors.submittedBy && touched.submittedBy)}
              />
            </div>
            <div className={classes.formRow}>
              <InputField
                labelText="Servings:"
                name="servings"
                hasError={!!(errors.servings && touched.servings)}
              />
              <SelectField
                options={["appetizer", "entree", "side", "dessert", "breakfast", "beverage"]}
                title="Category"
                name="category"
                hasError={!!(errors.category && touched.category)}
              />
              <CheckboxField labelText="Vegetarian" name="vegetarian" />
            </div>
            <div className={classes.formRow}>
              <InputField
                labelText="Tags (separated by comma):"
                name="tags"
                hasError={!!(errors.tags && touched.tags)}
                placeholder="Ex: chicken, indian, one-pot"
              />
            </div>
            <div className={classes.formRow}>
              <TextAreaField
                labelText="Ingredients:"
                name="ingredients"
                placeholder="Input each ingredient/amount, separated by a line break."
                hasError={!!(errors.ingredients && touched.ingredients)}
              />
            </div>
            <div className={classes.formRow}>
              <TextAreaField
                labelText="Instructions:"
                name="steps"
                hasError={!!(touched.steps && errors.steps)}
                placeholder="Input the recipe instructions, with line breaks between steps."
              />
            </div>
            <div className={classes.formRow}>
              <button className={classes.submit} type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddRecipeForm;
