import React from 'react';
import { motion } from 'framer-motion';
import { ButtonPropsWithNoMotion, Props } from './Button.interface';

export const Button = React.forwardRef(
  <TAnimated extends { isAnimated?: boolean }>(
    {
      isAnimated,
      className = '',
      fontWeight = 'font-semibold',
      color = 'text-gray-50',
      bgColor = 'bg-gray-800',
      m,
      p = 'px-5 py-2',
      rounded = 'rounded-full',
      ...rest
    }: Props<TAnimated>,
    ref?: React.Ref<HTMLButtonElement>
  ) => {
    const styles = [fontWeight || '', color, bgColor, p, m, rounded];
    const props = { className: `${styles.join(' ')} ${className || ''}`, ref };
    return isAnimated ? (
      <motion.button {...props} {...rest} />
    ) : (
      <button {...props} {...(rest as ButtonPropsWithNoMotion)} />
    );
  }
);

Button.displayName = 'Button';
