import React, { ElementType } from "react";
import { Props } from "./View.interface";

export const View = <TElement extends ElementType = "div">({
  as,
  isAnimated = true,
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
  ...rest
}: Props<TElement>) => {
  const Component = as || "div";
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
  ].map((style) => style || "");
  return <Component className={`${styles.join(" ")} ${className}`} {...rest} />;
};
