export type Responsive<TElement extends string> = [
  `sm:${TElement}`,
  `md:${TElement}`,
  `lg:${TElement}`,
  `xl:${TElement}`,
  `2xl:${TElement}`
];

// SPACING
type SpaceSize =
  | "0"
  | "0.5"
  | "1"
  | "1.5"
  | "2"
  | "2.5"
  | "3"
  | "3.5"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "14"
  | "16"
  | "20"
  | "24"
  | "28"
  | "32"
  | "36"
  | "40"
  | "44"
  | "48"
  | "52"
  | "56"
  | "60"
  | "64"
  | "72"
  | "80"
  | "96"
  | "px"
  | "reverse";

type Direction = "x" | "y" | "t" | "b" | "r" | "l";
type MPDirection = Direction | "";

export type NRStackSpacing = `space-${Extract<
  Direction,
  "x" | "y"
>}-${SpaceSize}`;

export type StackSpacing = NRStackSpacing | Responsive<NRStackSpacing>;

export type MarginSpacing = `m${MPDirection}-${SpaceSize | "auto"}${
  | ` m${MPDirection}-${SpaceSize}`
  | ""}`;
export type PaddingSpacing =
  `p${MPDirection}-${SpaceSize} p${MPDirection}-${SpaceSize}`;

// TYPOGRAPHY

export type TextSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl";

type MyColors = "orange" | "emerald" | "gray";
type Strength =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export type Colors = `text-${MyColors}-${Strength}`;
export type BgColors = `bg-${MyColors}-${Strength}`;
export type FontSize = `text-${TextSize}`;

type AlignTypes = "center" | "left" | "right" | "justify" | "start" | "end";
export type TextAlign = `text-${AlignTypes}`;

type Weights =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

export type FontWeights = `font-${Weights}`;

// LayoutProps

export type TextWidthHeightSize = "full" | "mix" | "max" | "fit" | "screen";

export type WidthHeightSizes =
  | "auto"
  | "1/2"
  | "1/3"
  | "2/3"
  | "1/4"
  | "2/4"
  | "3/4"
  | "1/5"
  | "2/5"
  | "3/5"
  | "4/5"
  | "1/6"
  | "2/6"
  | "3/6"
  | "4/6"
  | "5/6"
  | "1/12"
  | "2/12"
  | "3/12"
  | "4/12"
  | "5/12"
  | "6/12"
  | "7/12"
  | "8/12"
  | "9/12"
  | "10/12"
  | "11/12"
  | TextWidthHeightSize;

export type Size = SpaceSize | WidthHeightSizes;

export type Width = `w-${Size}`;
export type MinWidth = `min-w-${Exclude<TextWidthHeightSize, "screen"> | "0"}`;
export type Height = `h-${Size}`;
export type MinHeight = `min-h-${TextWidthHeightSize | "0"}`;
export type MaxHeight = `max-h-${SpaceSize}`;
type MaxWSize =
  | "0"
  | "none"
  | TextSize
  | Exclude<TextWidthHeightSize, "screen">
  | "prose"
  | `screen-${Extract<TextSize, "sm" | "lg" | "xl" | "2xl"> | "md"}`;
export type MaxWidth = `max-w-${MaxWSize}`;

// DISPLAY PROPS

export type Display =
  | "block"
  | "inline-block"
  | "flex"
  | "inline-flex"
  | "hidden";

export type FlexDirection =
  | "flex-col"
  | "flex-row"
  | "flex-row-reverse"
  | "flex-col-reverse";

export type JustifyContent =
  | "justify-start"
  | "justify-end"
  | "justify-center"
  | "justify-between"
  | "justify-around"
  | "justify-evenly";

export type AlignItems =
  | "items-start"
  | "items-end"
  | "items-center"
  | "items-baseline"
  | "items-baseline";

//BORDER PROPS

type Rounded = "none" | "sm" | "md" | "full" | "lg" | "xl" | "2xl" | "3xl";

export type BorderRadius = `rounded-${Rounded}`;

// POSITION

export type Position = "relative" | "absolute" | "fixed" | "sticky" | "static";
