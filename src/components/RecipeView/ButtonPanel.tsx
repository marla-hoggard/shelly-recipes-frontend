import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './ButtonPanel.module.scss';

type Props = {
  id: number;
  showSubmit: boolean;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ButtonPanel: React.FC<Props> = ({ id, showSubmit, handleSubmit }) => {
  const history = useHistory();

  const editRecipe = useCallback(
    (e) => {
      e.preventDefault();
      history.push(`/recipe/${id}/edit`);
    },
    [history, id],
  );

  return (
    <div className={classes.buttonPanel}>
      <button className={classes.editButton} onClick={editRecipe}>
        Edit Recipe
      </button>
      {showSubmit && (
        <button className={classes.submitButton} onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
};

export default ButtonPanel;
