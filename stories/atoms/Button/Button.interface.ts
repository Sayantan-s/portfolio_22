import { motion } from "framer-motion";
import { ComponentProps } from "react";
import { BorderProps, ColorProps, SpacingProps } from "@ts/traditional.types";
export type ButtonPropsWithMotion = ComponentProps<typeof motion.button>;
export type ButtonPropsWithNoMotion = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export interface BtnProps extends ColorProps, SpacingProps, BorderProps {
  outline: boolean;
  fontWeight?: `font-${"medium" | "semibold"}`;
}

export type Props = (
  | ({ isAnimated?: true } & ButtonPropsWithMotion)
  | ({ isAnimated?: false } & ButtonPropsWithNoMotion)
) &
  Partial<BtnProps>;
