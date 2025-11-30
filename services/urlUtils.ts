import { QuizState } from "../types";

export const encodeState = (answers: Record<number, number>): string => {
  try {
    const json = JSON.stringify(answers);
    return btoa(json);
  } catch (e) {
    console.error("Encoding error", e);
    return "";
  }
};

export const decodeState = (hash: string): Record<number, number> | null => {
  try {
    const json = atob(hash);
    return JSON.parse(json);
  } catch (e) {
    console.error("Decoding error", e);
    return null;
  }
};
