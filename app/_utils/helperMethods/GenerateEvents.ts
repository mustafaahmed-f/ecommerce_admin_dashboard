import { actions } from "../constants/Actions";

export function GenerateEvents(
  module: string,
  action: (typeof actions)[keyof typeof actions],
) {
  return `${module}_${action}`;
}
