import { motion } from "framer-motion";
import { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import type { Props } from "./types";

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ ...rest }, ref) => {
    if ("to" in rest) return <NavLink {...rest} />;
    return <motion.button {...rest} ref={ref} />;
  }
);
