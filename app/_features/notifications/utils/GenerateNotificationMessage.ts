import { actions } from "@/app/_utils/constants/Actions";
import { ModulesArray } from "@/app/_utils/constants/ModulesSet";

const specialPluralWords: {
  originalWord: (typeof ModulesArray)[number];
  single: string;
}[] = [
  {
    originalWord: "categories",
    single: "Category",
  },
];

export function GenerateNotificationMessage(
  module: (typeof ModulesArray)[number],
  title: string,
  action: keyof typeof actions,
) {
  const CapitalizedModuleName =
    module.charAt(0).toUpperCase() + module.slice(1);
  const SingleWord = CapitalizedModuleName.slice(
    0,
    CapitalizedModuleName.length - 1,
  );
  const finalModule = specialPluralWords.find(
    (item) => item.originalWord === module,
  )
    ? specialPluralWords.find((item) => item.originalWord === module)!.single
    : SingleWord;

  return `${finalModule} '${title}' has been ${action} successfully !`;
}
