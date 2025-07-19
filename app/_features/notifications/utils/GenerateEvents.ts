import { actions } from "@/app/_utils/constants/Actions";
import { ModulesArray } from "@/app/_utils/constants/ModulesSet";
import { GetFinalModuleName } from "./GetFinalModuleName";

export function GenerateEvents(
  module: (typeof ModulesArray)[number],
  action: (typeof actions)[keyof typeof actions],
) {
  const finalModule = GetFinalModuleName(module);

  return `${finalModule}_${action}`;
}
