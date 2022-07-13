import React, { ElementType } from "react";
import { Props } from "./Text.interface";

export const Text = <TElement extends ElementType = "p">({
  as,
  isAnimated = true,
  className = "",
  fontSize = "text-sm",
  color = "text-gray-400",
  fontWeight = "font-normal",
  textAlign,
  bgColor,
  p,
  m,
  rounded,
  maxW,
  w,
  position,
  display,
  ...rest
}: Props<TElement>) => {
  const styles = [
    fontSize,
    color,
    bgColor || "",
    fontWeight,
    textAlign || "",
    p || "",
    m || "",
    maxW || "",
    w || "",
    position || "",
    display || "",
  ];

  const Component = as || "p";
  return <Component className={`${styles.join(" ")} ${className}`} {...rest} />;
};
