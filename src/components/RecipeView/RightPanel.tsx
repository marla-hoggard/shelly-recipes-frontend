import React, { useMemo } from 'react';
import { GetRecipeSuccess } from '../../types/recipe.types';
import Steps from './Steps';
import classes from './RecipeView.module.scss';
import { countOccurrences } from '../../helpers';

type Props = {
  isMobileView?: boolean;
  recipe: GetRecipeSuccess;
};

const RightPanel: React.FC<Props> = ({ isMobileView = false, recipe }) => {
  const insertNoteNumbers = useMemo(() => {
    const numStars = countOccurrences('*', recipe.steps.join(''));
    return numStars === recipe.footnotes.length;
  }, [recipe.steps, recipe.footnotes.length]);

  return (
    <>
      {!isMobileView && <div className={classes.sectionTitle}>Directions</div>}
      <Steps steps={recipe.steps} insertNoteNumbers={insertNoteNumbers} />
      {recipe.footnotes.length > 0 && (
        <>
          <div className={classes.sectionTitle}>Notes</div>
          {insertNoteNumbers ? (
            <ol className={classes.notesList}>
              {recipe.footnotes.map((footnote, index) => (
                <li key={index} data-icon={`[${index + 1}]`}>
                  {footnote}
                </li>
              ))}
            </ol>
          ) : (
            <li className={classes.notesList}>
              {recipe.footnotes.map((footnote, index) => (
                <li key={index} data-icon="»">
                  {footnote}
                </li>
              ))}
            </li>
          )}
        </>
      )}
    </>
  );
};

export default RightPanel;
