import React from "react";
import classNames from "classnames";
import classes from "./Tag.module.scss";

type Props = {
  text: string;
};

const colors = ["red", "orange", "green", "blue", "purple", "gray", "black"];

const Tag: React.FC<Props> = ({ text }) => {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return <div className={classNames(classes.tag, classes[color])}>{text}</div>;
};

export default Tag;
