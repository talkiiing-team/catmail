import { atom } from "recoil";

export const MAX_ON_PAGE = 20;
export const ON_SCREEN = 10;

export const messages = atom({
  key: "messages",
  default: [],
});

export const checkedMessages = atom<number[]>({
  key: "checkedMessages",
  default: [],
});
