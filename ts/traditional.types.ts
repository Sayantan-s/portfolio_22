import { MotionProps } from "framer-motion";
import {
  AlignItems,
  BgColors,
  BorderRadius,
  Colors,
  Display,
  FlexDirection,
  FontSize,
  FontWeights,
  Height,
  JustifyContent,
  MarginSpacing,
  MaxHeight,
  MaxWidth,
  MinHeight,
  MinWidth,
  PaddingSpacing,
  Position,
  StackSpacing,
  TextAlign,
  Width,
} from "./tailwind.types";

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

export interface TypographyProps extends ColorProps {
  fontSize?: FontSize;
  fontWeight?: FontWeights;
  textAlign?: TextAlign;
}
export interface ColorProps {
  color?: Colors;
  bgColor?: BgColors;
}

export interface SpacingProps {
  m?: MarginSpacing;
  p?: PaddingSpacing;
}

export interface StackSpacingProps extends SpacingProps {
  spacing?: StackSpacing;
}

export interface LayoutProps {
  w?: Width;
  maxW?: MaxWidth;
  minW?: MinWidth;
  h?: Height;
  maxH?: MaxHeight;
  minH?: MinHeight;
}

export interface DisplayProps {
  display?: Display;
  flexDirection?: FlexDirection;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
}

export interface BorderProps {
  rounded?: BorderRadius;
}

export interface PositionProps {
  position?: Position;
}
