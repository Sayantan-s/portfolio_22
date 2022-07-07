import { motion } from "framer-motion";
import React from "react";
import { Props } from "./Heading.interface";
import { FontSize } from "@ts/tailwind.types";

export const Heading = React.forwardRef(
  (
    {
      level = "1",
      as = `h${level}`,
      isAnimated = false,
      className = "",
      color = "text-gray-400",
      bgColor,
      m,
      p,
      fontWeight = "font-semibold",
      textAlign,
      rounded,
      maxW,
      w,
      ...rest
    }: Props,
    ref?: React.Ref<HTMLHeadingElement>
  ) => {
    const HeadingLevel: FontSize[] = [
      "text-6xl",
      "text-5xl",
      "text-4xl",
      "text-3xl",
      "text-2xl",
      "text-xl",
    ];

    const Component = isAnimated ? motion[as || "h1"] : (as as any);

    const styles = [
      HeadingLevel[+level],
      color,
      bgColor || "",
      textAlign || "",
      fontWeight,
      m || "",
      p || "",
      rounded || "",
      maxW || "",
      w || "",
    ];
    return (
      <Component
        {...rest}
        className={`${styles.join(" ")}  ${className}`}
        ref={ref}
      />
    );
  }
);

Heading.displayName = "Heading";
