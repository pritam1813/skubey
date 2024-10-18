// types/language.ts
export type Language = "en" | "hi" | "fr";

export interface TranslationDictionary {
  [key: string]: {
    [key in Language]: string;
  };
}
