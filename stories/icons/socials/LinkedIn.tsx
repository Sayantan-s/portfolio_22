import React from 'react';
import { Props } from './Socials.interface';

export const LinkedIn = ({ size, className, pathClassName }: Props) => {
  return (
    <svg
      width={+(size || '24')}
      height={+(size || '24' + '1')}
      viewBox="0 0 92 93"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M35.2487 64.8957V40.1622H27.0349V64.8957H35.2495H35.2487ZM31.1435 36.7858C34.0072 36.7858 35.79 34.8866 35.79 32.5131C35.7364 30.0855 34.0072 28.2393 31.198 28.2393C28.3868 28.2393 26.5508 30.0855 26.5508 32.5129C26.5508 34.8864 28.333 36.7856 31.0897 36.7856H31.1429L31.1435 36.7858ZM39.7951 64.8957H48.0082V51.0849C48.0082 50.3466 48.0618 49.6065 48.2787 49.0792C48.8722 47.6016 50.2237 46.0722 52.4932 46.0722C55.4646 46.0722 56.6539 48.3401 56.6539 51.6654V64.8957H64.8668V50.7143C64.8668 43.1175 60.8152 39.5823 55.4114 39.5823C50.981 39.5823 49.0352 42.0608 47.9541 43.7489H48.0088V40.1631H39.7955C39.9027 42.4833 39.7949 64.8965 39.7949 64.8965L39.7951 64.8957Z"
        fill="white"
        className={`fill-gray-700 ${pathClassName}`}
      />
    </svg>
  );
};
