import React from "react";
import classNames from "classnames";
import { Category as CategoryType } from "../../types/api.types";
import classes from "./Category.module.scss";

type Props = {
  category: CategoryType;
};

const Category: React.FC<Props> = ({ category }) => {
  return <div className={classNames(classes.category, classes[category])}>{category}</div>;
};

export default Category;
