import { cva, VariantProps } from "class-variance-authority";
import { HTMLMotionProps, motion } from "framer-motion";
import { forwardRef } from "react";

const styles = cva("font-medium rounded-full", {
  variants: {
    variant: {
      "teal-primary":
        "bg-teal-400 ring-teal-900/10 shadow-teal-900/10 text-white shadow-sm ring-1",
      "sky-primary":
        "bg-sky-400 ring-sky-900/10 shadow-sky-900/10 text-white shadow-sm ring-1",
      "teal-secondary": "bg-teal-100 ring-teal-900/10 text-teal-400",
      "sky-secondary": "bg-sky-100 ring-sky-900/10 text-sky-400",
      gradient:
        "gradient_1 text-white ring-teal-900/10 shadow-teal-900/10 shadow-md ring-1 active:shadow",
    },
    disabled: {
      true: "disabled:opacity-75",
    },
    size: {
      sm: "p-2 w-20",
      md: "p-2.5 w-24",
      lg: "p-3 w-32",
      xl: "p-3 w-40",
      full: "p-3.5 w-full",
    },
  },
  defaultVariants: {
    variant: "sky-primary",
    disabled: false,
    size: "md",
  },
});

type Props = VariantProps<typeof styles> & HTMLMotionProps<"button">;

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ size, variant, disabled, ...rest }, ref) => {
    return (
      <motion.button
        whileTap={{ scale: 0.98 }}
        {...rest}
        className={styles({ size, variant, disabled })}
        ref={ref}
      />
    );
  }
);
