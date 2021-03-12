import React from 'react';
import classNames from 'classnames';
import classes from './Ingredients.module.scss';

type Props = {
  ingredients: string[];
};

const Ingredients: React.FC<Props> = ({ ingredients }) => {
  return (
    <div>
      {ingredients.map((ingredient, i) => {
        const isSectionHeader = /^_.+_$/.test(ingredient.trim());
        const displayText = isSectionHeader ? `${ingredient.slice(1, -1)}` : ingredient;
        return (
          <div
            className={classNames({
              [classes.ingredient]: true,
              [classes.ingredientHeader]: isSectionHeader,
            })}
            key={i}
          >
            {displayText}
          </div>
        );
      })}
    </div>
  );
};

export default Ingredients;
