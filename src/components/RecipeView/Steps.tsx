import React, { useRef } from 'react';
import classes from './RecipeView.module.scss';

type Props = {
  steps: string[];
};

const Steps: React.FC<Props> = ({ steps }) => {
  const count = useRef(1);

  return (
    <div className={classes.stepsContainer}>
      <div className={classes.sectionTitle}>Instructions:</div>
      {steps.map((step, i) => (
        <div key={i} className={classes.step}>
          {step.split('*').map((section, j, arr) => (
            <React.Fragment key={j}>
              <FormattedStep text={section} />
              {j !== arr.length - 1 && (
                <span className={classes.superscript}>[{count.current++}]</span>
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};

const FormattedStep: React.FC<{ text: string }> = ({ text }) => {
  const headers = text.match(/_.+_/g);
  if (headers) {
    return (
      <>
        {text.split(/_.+_/).map((section, i, arr) => (
          <React.Fragment key={i}>
            <>{section}</>
            {i !== arr.length - 1 && (
              <span className={classes.sectionHeader}>{headers[i].slice(1, -1)}</span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  } else {
    return <>{text}</>;
  }
};

export default Steps;
