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

export type ColorGenerator<
  TType extends "bg" | "text" | Omit<string, "bg" | "text"> = "text",
  TColor extends MyColors = "orange"
> = `${TType extends "bg"
  ? "bg"
  : TType extends "text"
  ? "text"
  : string}-${TColor}-${Strength}`;

export type OrangeColor<
  TType extends "bg" | "text" | Omit<string, "bg" | "text"> = "text"
> = ColorGenerator<TType>;
export type GrayColor<
  TType extends "bg" | "text" | Omit<string, "bg" | "text"> = "text"
> = ColorGenerator<TType, "gray">;
export type EmeraldColor<
  TType extends "bg" | "text" | Omit<string, "bg" | "text"> = "text"
> = ColorGenerator<TType, "emerald">;

export type AllColorsArray<
  TType extends "bg" | "text" | Omit<string, "bg" | "text"> = "text"
> = (OrangeColor<TType> | GrayColor<TType> | EmeraldColor<TType>)[];
