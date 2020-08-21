import React, { useRef } from "react";
import { Ingredient } from "../../types/api.types";
import classes from "./RecipeView.module.scss";

type Props = {
  ingredients: Ingredient[];
};

const Ingredients: React.FC<Props> = ({ ingredients }) => {
  const count = useRef(1);

  return (
    <>
      <div className={classes.ingredientsContainer}>
        <div className={classes.sectionTitle}>Ingredients:</div>
        {ingredients.map(({ ingredient, footnote }, i) =>
          footnote ? (
            <div className={classes.ingredient} key={i}>
              {ingredient}
              <span className={classes.superscript}>[{count.current++}]</span>
            </div>
          ) : (
            <div className={classes.ingredient} key={i}>
              {ingredient}
            </div>
          ),
        )}
      </div>
      {ingredients.some((el) => el.footnote) && (
        <ol className={classes.notesList}>
          {ingredients
            .filter((el) => el.footnote)
            .map(({ footnote }, index) => (
              <li key={index} data-icon={`[${index + 1}]`}>
                {footnote}
              </li>
            ))}
        </ol>
      )}
    </>
  );
};

export default Ingredients;
