import React from 'react';
import { FieldArray, FormikErrors, FormikTouched } from 'formik';
import { FormValues } from './RecipeForm';
import { InputField, TextAreaField } from './FormComponents';
import classes from './RecipeForm.module.scss';

type Props = {
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  values: FormValues;
};

const upArrow = '\u21e7';
const downArrow = '\u21e9';
const deleteIcon = '\u274c';

export const StepsAndNotes: React.FC<Props> = ({ values, errors, touched }) => {
  return (
    <FieldArray name="footnotes">
      {({ swap, remove, push }) => (
        <>
          <div className={classes.textareaRow}>
            <div className={classes.labelAndLinkContainer}>
              <label className={classes.textareaLabel} htmlFor="steps">
                Directions
              </label>
              {!values.footnotes.length && (
                <div className={classes.addFootnoteLink} onClick={() => push('')}>
                  + Add Footnotes
                </div>
              )}
            </div>
            <TextAreaField
              name="steps"
              hasError={!!(touched.steps && errors.steps)}
              placeholder={
                'Enter recipe directions with line breaks between steps.\nTo emphasize a section of text, wrap it in underscores: _important text_\nClick + ADD FOOTNOTES to add footnotes.\nTo denote a specific footnote location, place a * where you want it to go.'
              }
            />
          </div>
          {values.footnotes.length > 0 && (
            <>
              <div className={classes.labelAndLinkContainer}>
                <label className={classes.textareaLabel} htmlFor="steps">
                  Footnotes
                </label>
                <div className={classes.addFootnoteLink} onClick={() => push('')}>
                  + Add Footnote
                </div>
              </div>
              {values.footnotes.map((_note, index, footnotes) => (
                <div key={index} className={classes.notesRow}>
                  <InputField
                    placeholder="(Optional): Put * in the directions where this footnote should go."
                    name={`footnotes.${index}`}
                    hasError={!!(errors.footnotes && touched.footnotes)}
                    className={classes.flex1}
                  />
                  <div className={classes.notesButtons}>
                    <button
                      type="button"
                      onClick={() => swap(index - 1, index)}
                      disabled={index === 0}
                    >
                      {upArrow}
                    </button>
                    <button
                      type="button"
                      onClick={() => swap(index, index + 1)}
                      disabled={index === footnotes.length - 1}
                    >
                      {downArrow}
                    </button>
                    <button type="button" onClick={() => remove(index)}>
                      {deleteIcon}
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
