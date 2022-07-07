import React from "react";
import Navbar from "../Navbar";
import { Props } from "./interface";

export const AppLayout = ({ children }: Props) => {
  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  );
};
