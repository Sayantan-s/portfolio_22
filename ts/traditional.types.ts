import { MotionProps } from "framer-motion";
import { Colors, FontSize, Strength } from "./tailwind.types";

export interface PassComponentType<E extends React.ElementType> {
  as?: E;
}

export type TraditionalType<TAnimated extends boolean = true> =
  TAnimated extends true
    ? {
        isAnimated?: TAnimated;
      } & MotionProps
    : {
        isAnimated?: TAnimated;
      };

export interface TypographyProps {
  color?: Colors;
  strength?: Strength;
  fontSize?: FontSize;
  bgColor?: Colors;
}
