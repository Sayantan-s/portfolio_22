import React, { ElementType } from "react";
import { Props } from "./Stack.interface";

export const Stack = <TElement extends ElementType = "div">({
  as,
  className = "",
  fontSize,
  color,
  bgColor,
  fontWeight,
  textAlign,
  p,
  m,
  w,
  maxW,
  minW,
  h,
  maxH,
  minH,
  spacing,
  display,
  flexDirection,
  alignItems,
  justifyContent,
  rounded,
  ...rest
}: Props<TElement>) => {
  const styles = [
    fontSize,
    color,
    bgColor,
    fontWeight,
    textAlign,
    p,
    m,
    w,
    maxW,
    minW,
    h,
    maxH,
    minH,
    spacing,
    display,
    flexDirection,
    alignItems,
    justifyContent,
    rounded,
  ].map((style) => style || "");
  const Component = as || "div";

  return <Component {...rest} className={`${styles.join(" ")} ${className}`} />;
};
