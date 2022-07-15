import type { PolymorphicComponentProps } from '@ts/polymorphic.types';
import {
  BorderProps,
  DisplayProps,
  LayoutProps,
  PositionProps,
  SpacingProps,
  TypographyProps
} from '@ts/traditional.types';
import { ElementType } from 'react';

export interface TextProps
  extends TypographyProps,
    SpacingProps,
    LayoutProps,
    BorderProps,
    PositionProps,
    DisplayProps {}

export type Props<C extends ElementType = 'p'> = PolymorphicComponentProps<C, TextProps>;
