import React, { ComponentProps } from "react";
import { Props } from "./Button.interface";
import { motion } from "framer-motion";

export const Button = React.forwardRef(
  (
    {
      isAnimated = false,
      className = "",
      fontWeight = "font-semibold",
      color = "text-gray-50",
      bgColor = "bg-gray-800",
      m,
      p = "px-5 py-2",
      rounded = "rounded-full",
      ...rest
    }: Props,
    ref?: React.Ref<HTMLButtonElement>
  ) => {
    const styles = [fontWeight || "", color, bgColor, p, m, rounded];
    return isAnimated ? (
      <motion.button
        {...(rest as ComponentProps<typeof motion.button>)}
        className={`${styles.join(" ")} ${className || ""}`}
        ref={ref}
      />
    ) : (
      <button
        className={`${styles.join(" ")} ${className || ""}`}
        ref={ref}
        {...(rest as React.DetailedHTMLProps<
          React.ButtonHTMLAttributes<HTMLButtonElement>,
          HTMLButtonElement
        >)}
      />
    );
  }
);

Button.displayName = "Button";
