import type { PolymorphicComponentProps } from '@ts/polymorphic.types';
import { LayoutProps, PositionProps, SpacingProps, TypographyProps } from '@ts/traditional.types';
import { ElementType } from 'react';

export interface ViewProps extends TypographyProps, LayoutProps, SpacingProps, PositionProps {}

export type Props<C extends ElementType = 'div'> = PolymorphicComponentProps<C, ViewProps>;
