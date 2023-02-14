import { Level } from "@tiptap/extension-heading";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLMotionProps, motion } from "framer-motion";
import { forwardRef } from "react";

const styles = cva([], {
  variants: {
    level: {
      "1": "text-5xl",
      "2": "text-3xl",
      "3": "text-xl",
      "4": "text-lg",
      "5": "text-md",
      "6": "text-base",
    },
    weight: {
      bold: "font-bold",
      semibold: "font-semibold",
    },
  },
  defaultVariants: {
    level: "1",
  },
});

interface HeadingProps {
  as?: `h${Level}`;
}

type Props = VariantProps<typeof styles> & HTMLMotionProps<"h1"> & HeadingProps;

export const Heading = forwardRef<HTMLHeadingElement, Props>(
  ({ level, weight, className = "", as = "h1", ...rest }, ref) => {
    const Component = motion[as];
    return (
      <Component
        className={[styles({ level, weight }), className].join(" ")}
        {...rest}
        ref={ref}
      />
    );
  }
);
