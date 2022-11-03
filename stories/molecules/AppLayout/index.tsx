import React, { useState } from 'react';
import type { Props } from './interface';

export const AppLayout = ({ children }: Props) => {
  const [toggleMode, setToggle] = useState<boolean>(false);
  return (
    <React.Fragment>
      {/* <Navbar /> */}
      {children}
    </React.Fragment>
  );
};
