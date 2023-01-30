import { classNames } from "@helpers/classNames";
import React, { PropsWithChildren } from "react";

interface PageProps {
  className?: string;
}

export const Page: React.FC<PropsWithChildren<PageProps>> = ({
  children,
  className,
}) => {
  const styles = classNames(["h-full", className]);
  return <div className={styles}>{children}</div>;
};
