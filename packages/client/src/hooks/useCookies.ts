import { useMemo } from "react";
import Cookies from "universal-cookie";

export const useCookies = () => useMemo(() => new Cookies(), []);
