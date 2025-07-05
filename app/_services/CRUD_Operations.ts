import { apiResponseType, crudResponseType } from "../_types/apiResponseType";
import { generateTags } from "../_utils/helperMethods/generateTags";

const mainURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export async function _getEveryRecord(
  _APIEndpointName: string,
  cookieHeader?: any,
) {
  //// This method is used to get all records from table and apply api feature on the client side
  const res = await fetch(`${mainURL}/${_APIEndpointName}`, {
    credentials: "include",
    //// Cache for three hours
    next: {
      revalidate: 60 * 60 * 3,
      tags: generateTags(_APIEndpointName, "everyRecord"),
    },
    headers: cookieHeader,
  });

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

export async function _getAllRecords({
  _APIEndpointName,
  page = 1,
  pageSize = 10,
  sort = "",
  searchTerm = "",
  searchField = "",
  cookieHeader,
}: {
  _APIEndpointName: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  searchTerm?: string;
  searchField?: string;
  cookieHeader?: any;
}): Promise<crudResponseType> {
  const res = await fetch(
    `${mainURL}/${_APIEndpointName}?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}&searchField=${searchField}&sort=${sort}`,
    {
      credentials: "include",
      //// Cache for three hours
      next: {
        revalidate: 60 * 60 * 3,
        tags: generateTags(_APIEndpointName, "allRecords"),
      },
      headers: cookieHeader,
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

export async function _getSingleRecord({
  _APIEndpointName,
  recordId,
  cookieHeader,
}: {
  _APIEndpointName: string;
  recordId: string;
  cookieHeader?: any;
}): Promise<crudResponseType> {
  const res = await fetch(`${mainURL}/${_APIEndpointName}/${recordId}`, {
    credentials: "include",
    //// Cache for three hours
    next: {
      revalidate: 60 * 60 * 3,
      tags: generateTags(_APIEndpointName, "singleRecord", recordId),
    },
    headers: cookieHeader,
  });

  const jsonResponse: apiResponseType = await res.json(); // even if !res.ok, still need this

  if (!res.ok)
    throw new Error(
      jsonResponse.message || `Failed getting record : ${res.statusText} `,
    );

  if (!jsonResponse.success) {
    throw new Error(
      jsonResponse.error || jsonResponse.message || "Unknown error from API",
    );
  }

  return {
    success: jsonResponse.success,
    message: jsonResponse.message ?? "",
    result: jsonResponse.result,
    additionalInfo: jsonResponse.additionalInfo ?? null,
  };
}

export async function _deleteSingleRecord({
  _APIEndpointName,
  recordId,
  cookieHeader,
}: {
  _APIEndpointName: string;
  recordId: string;
  cookieHeader?: any;
}): Promise<crudResponseType> {
  const res = await fetch(`${mainURL}/${_APIEndpointName}/${recordId}`, {
    credentials: "include",
    method: "DELETE",
    headers: cookieHeader,
  });

  const jsonResponse: apiResponseType = await res.json(); // even if !res.ok, still need this

  if (!res.ok)
    throw new Error(
      jsonResponse.message || `Failed deleting record : ${res.statusText} `,
    );

  if (!jsonResponse.success) {
    throw new Error(
      jsonResponse.error || jsonResponse.message || "Unknown error from API",
    );
  }

  return {
    success: jsonResponse.success,
    message: jsonResponse.message ?? "",
    result: jsonResponse.result,
    additionalInfo: jsonResponse.additionalInfo ?? null,
  };
}

export async function _updateSingleRecord({
  _APIEndpointName,
  recordId,
  data,
  cookieHeader,
}: {
  _APIEndpointName: string;
  recordId: string;
  data: any;
  cookieHeader?: any;
}): Promise<crudResponseType> {
  const res = await fetch(`${mainURL}/${_APIEndpointName}/${recordId}`, {
    credentials: "include",
    method: "PUT",
    body: data instanceof FormData ? data : JSON.stringify(data),
    headers:
      data instanceof FormData
        ? {
            ...(cookieHeader && { Cookie: cookieHeader }),
          }
        : {
            "Content-Type": "application/json",
            ...(cookieHeader && { Cookie: cookieHeader }),
          },
  });

  const jsonResponse: apiResponseType = await res.json(); // even if !res.ok, still need this

  if (!res.ok)
    throw new Error(
      jsonResponse.message || `Failed updating record : ${res.statusText} `,
    );

  if (!jsonResponse.success) {
    throw new Error(
      jsonResponse.error ||
        jsonResponse.errors ||
        jsonResponse.message ||
        "Unknown error from API",
    );
  }

  return {
    success: jsonResponse.success,
    message: jsonResponse.message ?? "",
    result: jsonResponse.result,
    additionalInfo: jsonResponse.additionalInfo ?? null,
  };
}

export async function _createSingleRecord({
  _APIEndpointName,
  data,
  cookieHeader,
}: {
  _APIEndpointName: string;
  data: any;
  cookieHeader?: any;
}): Promise<crudResponseType> {
  const res = await fetch(`${mainURL}/${_APIEndpointName}`, {
    credentials: "include",
    method: "POST",
    body: data instanceof FormData ? data : JSON.stringify(data),
    headers:
      data instanceof FormData
        ? {
            ...(cookieHeader && { Cookie: cookieHeader }),
          }
        : {
            "Content-Type": "application/json",
            ...(cookieHeader && { Cookie: cookieHeader }),
          },
  });

  const jsonResponse: apiResponseType = await res.json();

  if (!res.ok)
    throw new Error(
      jsonResponse.message || `Failed creating record : ${res.statusText} `,
    );

  if (!jsonResponse.success) {
    throw new Error(
      jsonResponse.error || jsonResponse.message || "Unknown error from API",
    );
  }

  return {
    success: jsonResponse.success,
    message: jsonResponse.message ?? "",
    result: jsonResponse.result,
    additionalInfo: jsonResponse.additionalInfo ?? null,
  };
}
