import React, { useRef } from 'react';
import { Ingredient } from '../../types/recipe.types';
import classes from './RecipeView.module.scss';

type Props = {
  ingredients: Ingredient[];
};

const Ingredients: React.FC<Props> = ({ ingredients }) => {
  const count = useRef(1);

  return (
    <>
      <div className={classes.ingredientsContainer}>
        <div className={classes.sectionTitle}>Ingredients:</div>
        {ingredients.map(({ ingredient, note }, i) => {
          const isSectionHeader = /^_.+_$/.test(ingredient.trim());
          const displayText = isSectionHeader ? `${ingredient.slice(1, -1)}` : ingredient;
          return (
            <div className={isSectionHeader ? classes.sectionHeader : classes.ingredient} key={i}>
              {displayText}
              {note && <span className={classes.superscript}>[{count.current++}]</span>}
            </div>
          );
        })}
      </div>
      {ingredients.some((el) => el.note) && (
        <ol className={classes.notesList}>
          {ingredients
            .filter((el) => el.note)
            .map(({ note }, index) => (
              <li key={index} data-icon={`[${index + 1}]`}>
                {note}
              </li>
            ))}
        </ol>
      )}
    </>
  );
};

export default Ingredients;
