import React from "react";
import classNames from "classnames";
import classes from "./Tag.module.scss";

type Props = {
  text: string;
  small?: boolean;
};

const colors = ["red", "orange", "green", "blue", "purple", "gray", "black"];

const Tag: React.FC<Props> = ({ text, small = false }) => {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return (
    <div
      className={classNames({
        [classes.tag]: true,
        [classes[color]]: true,
        [classes.small]: small,
      })}
    >
      {text}
    </div>
  );
};

export default Tag;
