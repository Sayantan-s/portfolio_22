import React, { ElementType } from "react";
import { Props } from "./Text.interface";

export const Text = <TElement extends ElementType = "p">({
  as,
  isAnimated = true,
  className = "",
  fontSize,
  color,
  bgColor,
  strength,
  ...rest
}: Props<TElement>) => {
  const TextStyleConfiguration = {
    fontSize: `text-${fontSize}`,
    textColor: `text-${color || "emerald"}-${strength || "50"}`,
    bgColor: bgColor ? `bg-${bgColor}-${strength || "50"}` : "",
  };
  const Component = as || "p";
  return (
    <Component
      className={`${Object.values(TextStyleConfiguration).join(
        " "
      )} ${className}`}
      {...rest}
    />
  );
};
