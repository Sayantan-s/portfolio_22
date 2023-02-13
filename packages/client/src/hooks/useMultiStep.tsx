import { useState } from "react";

export const useMultiStep = (steps: JSX.Element[]) => {
  const [currIndex, setIndex] = useState(0);

  const goto = (index: number) => setIndex(index);

  const next = () => {
    setIndex((prevIndex) => {
      if (prevIndex >= steps.length - 1) return prevIndex;
      return prevIndex + 1;
    });
  };

  const back = () => {
    setIndex((prevIndex) => {
      if (prevIndex <= 0) return prevIndex;
      return prevIndex - 1;
    });
  };

  return {
    goto,
    next,
    back,
    step: steps[currIndex],
  };
};
