import { motion } from "framer-motion";
import React from "react";
import { Props } from "./Heading.interface";

export const Heading = React.forwardRef(
  (
    {
      level = "1",
      as = `h${level}`,
      isAnimated = false,
      className = "",
      color,
      bgColor,
      strength,
      ...rest
    }: Props,
    ref?: React.Ref<HTMLHeadingElement>
  ) => {
    const HeadingStyleConfiguration = {
      fontSize: `text-${level === "1" ? "" : level || as[1]}xl`,
      textColor: `text-${color || "orange"}-${strength || "50"}`,
      bgColor: bgColor ? `bg-${bgColor}-${strength || "50"}` : "",
    };

    const Component = isAnimated ? motion[as || "h1"] : (as as any);

    return (
      <Component
        className={`${Object.values(HeadingStyleConfiguration).join(
          " "
        )}  ${className}`}
        {...rest}
        ref={ref}
      />
    );
  }
);

Heading.displayName = "Heading";
