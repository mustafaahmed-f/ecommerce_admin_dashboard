import { actions } from "@/app/_utils/constants/Actions";
import { ModulesArray } from "@/app/_utils/constants/ModulesSet";

export function GenerateEvents(
  module: (typeof ModulesArray)[number],
  action: (typeof actions)[keyof typeof actions],
) {
  return `${module}_${action}`;
}
