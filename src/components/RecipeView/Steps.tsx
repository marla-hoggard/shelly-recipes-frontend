import React, { useRef } from "react";
import classes from "./RecipeView.module.scss";

type Props = {
  steps: string[];
};

const Steps: React.FC<Props> = ({ steps }) => {
  const count = useRef(1);

  return (
    <div className={classes.stepsContainer}>
      {steps.map((step, i) => (
        <div key={i} className={classes.step}>
          {step.split("*").map((section, j, arr) => (
            <React.Fragment key={j}>
              <>{section}</>
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

export default Steps;
