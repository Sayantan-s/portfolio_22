import {
  BorderProps,
  LayoutProps,
  PositionProps,
  SpacingProps,
  TraditionalType,
  TypographyProps,
} from "@ts/traditional.types";

export type Level = "1" | "2" | "3" | "4" | "5" | "6";

export interface HeadingProps
  extends Omit<TypographyProps, "fontSize">,
    SpacingProps,
    LayoutProps,
    BorderProps,
    PositionProps,
    Omit<
      React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >,
      "color"
    > {
  level?: Level;
  as?: `h${Level}`;
}

export type Props =
  | (HeadingProps & TraditionalType<false>)
  | (HeadingProps & TraditionalType<true>);
