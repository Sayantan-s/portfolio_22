import { motion } from 'framer-motion';
import { ComponentProps } from 'react';
import type { BorderProps, ColorProps, SpacingProps } from '@ts/traditional.types';
import React from 'react';
export type ButtonPropsWithMotion = { isAnimated?: true } & ComponentProps<typeof motion.button>;
export type ButtonPropsWithNoMotion = {
  isAnimated?: false;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export interface BtnProps extends ColorProps, SpacingProps, BorderProps {
  outline: boolean;
  fontWeight?: `font-${'medium' | 'semibold'}`;
}

export type Props<TAnimated extends { isAnimated?: boolean }> = (TAnimated extends {
  isAnimated?: false;
}
  ? ButtonPropsWithNoMotion
  : ButtonPropsWithMotion) &
  Partial<BtnProps>;

export type See = Props<ButtonPropsWithMotion>;
