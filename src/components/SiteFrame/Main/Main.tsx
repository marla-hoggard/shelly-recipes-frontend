import React from "react";
import "../../../global-styles/core.scss";
import classes from "./Main.module.scss";

type Props = {
  children: React.ReactElement;
};

const Main: React.FC<Props> = ({ children }) => (
  <main className={classes.mainContainer}>{children}</main>
);

export default Main;
