import { ModulesArray } from "@/app/_utils/constants/ModulesSet";

export const specialPluralWords: {
  originalWord: (typeof ModulesArray)[number];
  single: string;
}[] = [
  {
    originalWord: "categories",
    single: "Category",
  },
];
