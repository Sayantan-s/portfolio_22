import type { PolymorphicComponentProps } from "@ts/polymorphic.types";
import {
  BorderProps,
  DisplayProps,
  LayoutProps,
  StackSpacingProps,
  TypographyProps,
} from "@ts/traditional.types";
import { ElementType } from "react";

export interface StackProps
  extends TypographyProps,
    LayoutProps,
    DisplayProps,
    StackSpacingProps,
    BorderProps {}

export type Props<C extends ElementType = "div"> = PolymorphicComponentProps<
  C,
  StackProps
>;
