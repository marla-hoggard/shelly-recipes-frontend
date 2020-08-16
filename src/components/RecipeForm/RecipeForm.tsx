import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

import { AddRecipeRequest, AddRecipeResponse, Category } from "../../types/api.types";
import { addRecipe, editRecipe } from "../../api";
import { InputField, TextAreaField, SelectField, CheckboxField } from "./FormComponents";
import classes from "./RecipeForm.module.scss";

type Values = {
  title: string;
  source: string;
  sourceUrl: string;
  submittedBy: string;
  servings: string;
  category: Category;
  vegetarian: boolean;
  tags: string;
  ingredients: string;
  steps: string;
};

const defaultValues: Values = {
  title: "",
  source: "",
  sourceUrl: "",
  submittedBy: "",
  servings: "",
  category: "",
  vegetarian: false,
  tags: "",
  ingredients: "",
  steps: "",
};

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

type Props = {
  id?: number;
  savedValues?: Partial<Values>;
  type: "add" | "edit";
};

const RecipeForm: React.FC<Props> = ({ id, savedValues = {}, type }) => {
  const history = useHistory();
  const [submitError, setSubmitError] = useState("");

  if (type === "edit" && !id) {
    history.push("/404");
  }

  return (
    <>
      <h1 className={classes.pageTitle}>{type === "add" ? "Add a New Recipe" : "Edit Recipe"}</h1>
      <Formik
        initialValues={{
          ...defaultValues,
          ...savedValues,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }: FormikHelpers<Values>) => {
          setSubmitting(true);
          let result: AddRecipeResponse;

          if (type === "edit" && id) {
            const editRequest: Partial<AddRecipeRequest> = {};
            if (values.title !== savedValues.title) editRequest.title = values.title;
            if (values.source !== savedValues.source) editRequest.source = values.source;
            if (values.sourceUrl !== savedValues.sourceUrl)
              editRequest.sourceUrl = values.sourceUrl;
            if (values.submittedBy !== savedValues.submittedBy)
              editRequest.submittedBy = values.submittedBy;
            if (values.servings !== savedValues.servings) editRequest.servings = values.servings;
            if (values.category !== savedValues.category) editRequest.category = values.category;
            if (values.vegetarian !== savedValues.vegetarian)
              editRequest.vegetarian = values.vegetarian;
            if (values.tags !== savedValues.tags)
              editRequest.tags = values.tags.split(",").map((el) => el.trim());
            if (values.ingredients !== savedValues.ingredients) {
              editRequest.ingredients = values.ingredients
                .split(/\n/)
                .map((el) => el.trim())
                .filter((el) => !!el);
            }
            if (values.steps !== savedValues.steps) {
              editRequest.steps = values.steps
                .split(/\n+/)
                .map((el) => el.trim())
                .filter((el) => !!el);
            }
            result = await editRecipe(id, editRequest);
          } else {
            const addRequest: AddRecipeRequest = {
              ...values,
              tags: values.tags.split(",").map((el) => el.trim()),
              ingredients: values.ingredients
                .split(/\n/)
                .map((el) => el.trim())
                .filter((el) => !!el),
              steps: values.steps
                .split(/\n+/)
                .map((el) => el.trim())
                .filter((el) => !!el),
            };
            result = await addRecipe(addRequest);
          }

          if ("id" in result) {
            setSubmitting(false);
            history.push(`/recipe/${result.id}`);
          } else {
            setSubmitError(result.error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={classes.form}>
            <div className={classes.formRow}>
              <InputField
                labelText="Title"
                name="title"
                hasError={!!(errors.title && touched.title)}
                fullWidth
              />
            </div>
            <div className={classes.formRow}>
              <InputField
                labelText="Original Source"
                name="source"
                hasError={!!(errors.source && touched.source)}
                fullWidth
              />
            </div>
            <div className={classes.formRow}>
              <InputField
                labelText="Source URL"
                name="sourceUrl"
                hasError={!!(errors.sourceUrl && touched.sourceUrl)}
                fullWidth
              />
            </div>
            <div className={classes.formRow}>
              <InputField
                labelText="Submitted By"
                name="submittedBy"
                hasError={!!(errors.submittedBy && touched.submittedBy)}
                fullWidth
              />
            </div>
            <div className={classes.comboRow}>
              <div className={classes.servingsContainer}>
                <InputField
                  labelText="Servings"
                  name="servings"
                  hasError={!!(errors.servings && touched.servings)}
                  className={classes.servings}
                />
              </div>
              <div>
                <SelectField
                  options={[
                    "appetizer",
                    "entree",
                    "side",
                    "dessert",
                    "breakfast",
                    "sauce",
                    "beverage",
                  ]}
                  title="Category"
                  name="category"
                  hasError={!!(errors.category && touched.category)}
                />
              </div>
              <div>
                <CheckboxField labelText="Vegetarian" name="vegetarian" />
              </div>
            </div>
            <div className={classes.formRow}>
              <InputField
                labelText="Tags (separated by comma)"
                name="tags"
                hasError={!!(errors.tags && touched.tags)}
                placeholder="Ex: fish, indian, crockpot"
                fullWidth
              />
            </div>
            <div className={classes.textareaRow}>
              <TextAreaField
                labelText="Ingredients"
                name="ingredients"
                placeholder="Enter each ingredient separated by a line break."
                hasError={!!(errors.ingredients && touched.ingredients)}
              />
            </div>
            <div className={classes.textareaRow}>
              <TextAreaField
                labelText="Instructions"
                name="steps"
                hasError={!!(touched.steps && errors.steps)}
                placeholder="Enter recipe instructions with line breaks between steps."
              />
            </div>
            <div className={classes.formRow}>
              <button className={classes.submit} type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
            <div className={classes.formRow}>
              <div className={classes.errorMessage}>{submitError}</div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RecipeForm;
