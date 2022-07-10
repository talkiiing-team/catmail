import { atom } from "recoil";

export const themeStore = atom<"light" | "cats" | "dogs" | "dark" | "contrast">(
  {
    key: "theme",
    default: "light",
  }
);
