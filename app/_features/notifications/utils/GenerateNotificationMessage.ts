import { actions } from "@/app/_utils/constants/Actions";
import { ModulesArray } from "@/app/_utils/constants/ModulesSet";
import { GetFinalModuleName } from "./GetFinalModuleName";

export function GenerateNotificationMessage(
  module: (typeof ModulesArray)[number],
  title: string,
  action: keyof typeof actions,
) {
  const finalModule = GetFinalModuleName(module);

  return `${finalModule} '${title}' has been ${action} successfully !`;
}
