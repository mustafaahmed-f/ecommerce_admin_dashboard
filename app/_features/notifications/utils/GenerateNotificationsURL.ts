import { ModulesArray } from "@/app/_utils/constants/ModulesSet";

export function GenerateNotificationsURL(
  module: (typeof ModulesArray)[number],
  id: string,
) {
  return `/view/${module}/details/${id}`;
}
