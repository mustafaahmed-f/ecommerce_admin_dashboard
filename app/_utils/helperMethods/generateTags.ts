export function generateTags(
  module: string,
  method: "allRecords" | "everyRecord" | "singleRecord",
  recordId?: string,
): string[] {
  switch (method) {
    case "allRecords":
      return [`all-records-${module}`];

    case "everyRecord":
      return [`every-record-${module}`];

    case "singleRecord":
      return [`single-record-${module}-${recordId}`];

    default:
      return [];
  }
}
