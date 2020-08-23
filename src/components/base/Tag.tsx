import React, { useCallback } from "react";
import classNames from "classnames";
import classes from "./Tag.module.scss";
import { useHistory } from "react-router-dom";

type Props = {
  text: string;
};

const colors = ["red", "orange", "green", "blue", "purple", "gray", "black"];

const Tag: React.FC<Props> = ({ text }) => {
  const history = useHistory();
  const color = colors[Math.floor(Math.random() * colors.length)];

  const searchByTag = useCallback(() => {
    history.push(`/search?tags=${text}`);
  }, [history, text]);

  return (
    <div className={classNames(classes.tag, classes[color])} onClick={searchByTag}>
      {text}
    </div>
  );
};

export default Tag;
