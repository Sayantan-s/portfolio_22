export interface IconProps {
  size: '24' | '32' | '40' | Omit<string, '24' | '32' | '40'>;
  className: string;
  pathClassName: string;
}

export type Props = Partial<IconProps>;
