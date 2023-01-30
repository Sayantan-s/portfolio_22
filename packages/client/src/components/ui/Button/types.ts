import { HTMLMotionProps } from "framer-motion";
import { ForwardRefExoticComponent } from "react";
import { NavLinkProps } from "react-router-dom";

type ButtonProps = ForwardRefExoticComponent<HTMLMotionProps<"button">>;

type LinkProps = NavLinkProps & React.RefAttributes<HTMLAnchorElement>;

export type Props = ButtonProps | LinkProps;
