import { cva } from "class-variance-authority";

const styles = cva([], {
  variants: {},
  defaultVariants: {},
});

interface TextFieldProps {
  as?: `input` | "textarea";
}

import React from "react";

type InputElement = HTMLInputElement | HTMLTextAreaElement;
type InputChangeEvent = React.ChangeEvent<InputElement>;
