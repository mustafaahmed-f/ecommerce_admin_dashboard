import { apiResponseType } from "@/app/_types/apiResponseType";
import { generateTags } from "@/app/_utils/helperMethods/generateTags";

const APIendPoint = "transactions";
const mainURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export async function getAllRecords({
  starting_after = "",
  ending_before = "",
}: {
  starting_after?: string;
  ending_before?: string;
}) {
  const res = await fetch(
    `${mainURL}/${APIendPoint}?starting_after=${starting_after}&ending_before=${ending_before}`,
    {
      //// Cache for three hours
      next: {
        revalidate: 60 * 60 * 3,
        tags: generateTags(APIendPoint, "allRecords"),
      },
    },
  );

  const jsonResponse: apiResponseType = await res.json(); // even if !res.ok, still need this

  if (!res.ok)
    throw new Error(
      jsonResponse.message || `Failed getting records : ${res.statusText} `,
    );

  if (!jsonResponse.success) {
    throw new Error(
      jsonResponse.error || jsonResponse.message || "Unknown error from API",
    );
  }

  return {
    success: jsonResponse.success,
    message: jsonResponse.message,
    result: jsonResponse.result,
    additionalInfo: jsonResponse.additionalInfo ?? null,
  };
}
