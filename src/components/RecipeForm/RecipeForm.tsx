/* eslint-disable func-names */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { AddRecipeRequest, AddRecipeResponse, EditRecipeRequest } from '../../types/recipe.types';
import { addRecipe, editRecipe } from '../../api/recipe';
import { removeSmartQuotes, replaceFractions, trimAndRemoveEmpty } from '../../helpers';
import { InputField, TextAreaField } from './FormComponents';
import { StepsAndNotes } from './FieldArrays';
import classes from './RecipeForm.module.scss';

export type FormValues = {
  title: string;
  submitted_by: string;
  message: string;
  servings: string;
  ingredientsTextarea: string;
  steps: string;
  footnotes: string[];
};

const defaultValues: FormValues = {
  title: '',
  submitted_by: '',
  message: '',
  servings: '',
  ingredientsTextarea: '',
  steps: '',
  footnotes: [],
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  submitted_by: Yup.string().required('Required'),
  message: Yup.string(),
  servings: Yup.string(),
  ingredientsTextarea: Yup.string().required('Required'),
  steps: Yup.string().required('Required'),
  footnotes: Yup.array(Yup.string()),
});

const prepareEditRequest = (
  values: FormValues,
  savedValues: Partial<FormValues>,
): EditRecipeRequest => {
  const editRequest: EditRecipeRequest = {};
  if (values.title.trim() !== savedValues.title) {
    editRequest.title = removeSmartQuotes(values.title.trim());
  }
  if (values.submitted_by.trim() !== savedValues.submitted_by) {
    editRequest.submitted_by = values.submitted_by.trim();
  }
  if (values.message.trim() !== savedValues.message) {
    editRequest.message = removeSmartQuotes(values.message.trim());
  }
  if (values.servings !== savedValues.servings) {
    editRequest.servings = values.servings;
  }
  if (values.ingredientsTextarea !== savedValues.ingredientsTextarea) {
    editRequest.ingredients = trimAndRemoveEmpty(
      removeSmartQuotes(values.ingredientsTextarea).split(/\n/),
    );
  }
  if (values.steps !== savedValues.steps) {
    editRequest.steps = trimAndRemoveEmpty(removeSmartQuotes(values.steps).split(/\n+/));
  }
  if (
    values.footnotes.length !== savedValues.footnotes?.length ||
    trimAndRemoveEmpty(values.footnotes).join(',') !== savedValues.footnotes?.join(',')
  ) {
    editRequest.footnotes = trimAndRemoveEmpty(values.footnotes).map(removeSmartQuotes);
  }
  return editRequest;
};

type Props = {
  id?: number;
  savedValues?: Partial<FormValues>;
  type: 'add' | 'edit';
};

const RecipeForm: React.FC<Props> = ({ id, savedValues = {}, type }) => {
  const history = useHistory();
  const [submitError, setSubmitError] = useState('');

  if (type === 'edit' && !id) {
    history.push('/404');
  }

  return (
    <>
      <h1 className={classes.pageTitle}>
        {type === 'add' ? 'Share a Recipe with Shelly' : 'Edit Recipe'}
      </h1>
      <Formik
        initialValues={{
          ...defaultValues,
          ...savedValues,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }: FormikHelpers<FormValues>) => {
          setSubmitting(true);
          let result: AddRecipeResponse;

          if (type === 'edit' && id) {
            const editRequest = prepareEditRequest(values, savedValues);
            result = await editRecipe(id, editRequest);
          } else {
            const addRequest: AddRecipeRequest = {
              title: values.title.trim(),
              submitted_by: values.submitted_by.trim(),
              message: values.message.trim(),
              servings: values.servings.trim(),
              ingredients: trimAndRemoveEmpty(
                replaceFractions(values.ingredientsTextarea).split(/\n+/),
              ),
              steps: trimAndRemoveEmpty(replaceFractions(values.steps).split(/\n+/)),
              footnotes: trimAndRemoveEmpty(values.footnotes.map((f) => replaceFractions(f))),
              is_confirmed: false,
            };
            result = await addRecipe(addRequest);
          }

          if ('id' in result) {
            setSubmitting(false);
            history.push(`/recipe/${result.id}`);
          } else {
            setSubmitError(result.error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form className={classes.form}>
            <div className={classes.formRow}>
              <InputField
                labelText="From"
                placeholder="Your name"
                name="submitted_by"
                hasError={!!(errors.submitted_by && touched.submitted_by)}
                fullWidth
              />
            </div>
            <div className={classes.textareaRow}>
              <div className={classes.labelAndLinkContainer}>
                <label className={classes.textareaLabel} htmlFor="message">
                  Message
                </label>
              </div>
              <TextAreaField
                name="message"
                placeholder="Tell Shelly why you think she'll love this recipe"
                hasError={!!(errors.ingredientsTextarea && touched.ingredientsTextarea)}
              />
            </div>
            <div className={classes.formRow}>
              <InputField
                labelText="Title"
                name="title"
                placeholder="Recipe title"
                hasError={!!(errors.title && touched.title)}
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
            </div>
            <div className={classes.textareaRow}>
              <div className={classes.labelAndLinkContainer}>
                <label className={classes.textareaLabel} htmlFor="ingredientsTextarea">
                  Ingredients
                </label>
              </div>
              <TextAreaField
                name="ingredientsTextarea"
                placeholder={
                  'Enter each ingredient separated by a line break.\nTo create a section header, wrap it in underscores: _Header_'
                }
                hasError={!!(errors.ingredientsTextarea && touched.ingredientsTextarea)}
              />
            </div>
            <StepsAndNotes values={values} errors={errors} touched={touched} />
            <div className={classes.formRow}>
              <button className={classes.solidButton} type="submit" disabled={isSubmitting}>
                Preview
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
