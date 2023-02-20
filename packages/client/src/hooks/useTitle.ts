import { useEffect } from "react";

export const useTitle = (value: string | undefined) => {
  useEffect(() => {
    const title = document.querySelector("title");
    if (title) {
      title.textContent = value ? `Upshot@${value}` : title.textContent;
    }
  }, [value]);
};
