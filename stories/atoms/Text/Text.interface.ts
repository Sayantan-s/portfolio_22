import type { PolymorphicComponentProps } from "@ts/polymorphic.types";
import { Colors, FontSize, Strength } from "@ts/tailwind.types";
import { TraditionalType, TypographyProps } from "@ts/traditional.types";
import { ElementType } from "react";

export interface TextProps extends TypographyProps {
  fontSize?: FontSize;
  bgColor?: Colors;
  color?: Colors;
  strength?: Strength;
}

export type TextPropsWithMotion =
  | (TextProps & TraditionalType<true>)
  | (TextProps & TraditionalType<false>);

export type Props<C extends ElementType = "p"> = PolymorphicComponentProps<
  C,
  TextProps
>;
