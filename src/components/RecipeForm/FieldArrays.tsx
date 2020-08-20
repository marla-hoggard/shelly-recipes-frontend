import React from "react";
import { FieldArray, FormikErrors, FormikTouched } from "formik";
import { FormValues } from "./RecipeForm";
import { InputField, TextAreaField } from "./FormComponents";
import classes from "./RecipeForm.module.scss";

type Props = {
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  values: FormValues;
};

export const IngredientsWithFootnotes: React.FC<Props> = ({ values, errors, touched }) => {
  return (
    <FieldArray name="ingredientsWithNotes">
      {({ swap, remove, push }) => (
        <>
          <div className={classes.textareaRow}>
            <div className={classes.labelAndLinkContainer}>
              <label className={classes.textareaLabel} htmlFor="ingredientsWithNotes">
                Ingredients
              </label>
              <div
                className={classes.addFootnoteLink}
                onClick={() => push({ ingredient: "", footnote: "" })}
              >
                + Add Ingredient
              </div>
            </div>
          </div>
          {values.ingredientsWithNotes.map((_ing, index, ingredientsWithNotes) => (
            <div key={index} className={classes.notesRow}>
              <InputField
                placeholder="Ingredient"
                name={`ingredientsWithNotes.${index}.ingredient`}
                hasError={
                  !!(
                    errors.ingredientsWithNotes &&
                    errors.ingredientsWithNotes[index] &&
                    touched.ingredientsWithNotes &&
                    touched.ingredientsWithNotes[index]
                  )
                }
                className={classes.leftInput}
              />
              <InputField
                placeholder="Footnote"
                name={`ingredientsWithNotes.${index}.footnote`}
                hasError={
                  !!(
                    errors.ingredientsWithNotes &&
                    errors.ingredientsWithNotes[index] &&
                    touched.ingredientsWithNotes &&
                    touched.ingredientsWithNotes[index]
                  )
                }
                className={classes.rightInput}
              />
              <div className={classes.notesButtons}>
                <button type="button" onClick={() => swap(index - 1, index)} disabled={index === 0}>
                  {"\u21e7"}
                </button>
                <button
                  type="button"
                  onClick={() => swap(index, index + 1)}
                  disabled={index === ingredientsWithNotes.length - 1}
                >
                  {"\u21e9"}
                </button>
                <button type="button" onClick={() => remove(index)}>
                  {"\u274c"}
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </FieldArray>
  );
};

export const StepsAndNotes: React.FC<Props> = ({ values, errors, touched }) => {
  return (
    <FieldArray name="notes">
      {({ swap, remove, push }) => (
        <>
          <div className={classes.textareaRow}>
            <div className={classes.labelAndLinkContainer}>
              <label className={classes.textareaLabel} htmlFor="steps">
                Instructions
              </label>
              {!values.notes.length && (
                <div className={classes.addFootnoteLink} onClick={() => push("")}>
                  + Add Notes
                </div>
              )}
            </div>
            <TextAreaField
              name="steps"
              hasError={!!(touched.steps && errors.steps)}
              placeholder={
                "Enter recipe instructions with line breaks between steps.\nClick + ADD NOTE to add footnotes.\nType * to indicate where to place each note (they will be associated in order)."
              }
            />
          </div>
          {values.notes.length > 0 && (
            <>
              <div className={classes.labelAndLinkContainer}>
                <label className={classes.textareaLabel} htmlFor="steps">
                  Notes
                </label>
                <div className={classes.addFootnoteLink} onClick={() => push("")}>
                  + Add Note
                </div>
              </div>
              {values.notes.map((_note, index, notes) => (
                <div key={index} className={classes.notesRow}>
                  <InputField
                    placeholder="Put * in the instructions where this note should go."
                    name={`notes.${index}`}
                    hasError={!!(errors.notes && touched.notes)}
                    className={classes.flex1}
                  />
                  <div className={classes.notesButtons}>
                    <button
                      type="button"
                      onClick={() => swap(index - 1, index)}
                      disabled={index === 0}
                    >
                      {"\u21e7"}
                    </button>
                    <button
                      type="button"
                      onClick={() => swap(index, index + 1)}
                      disabled={index === notes.length - 1}
                    >
                      {"\u21e9"}
                    </button>
                    <button type="button" onClick={() => remove(index)}>
                      {"\u274c"}
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </FieldArray>
  );
};
