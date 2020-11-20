import { useEffect } from "react";
import useTheme from "./use-theme";

export default function Enhancers({ map, time }) {
  useTheme(map);
  return null;
}
