import { apiResponseType, crudResponseType } from "../_types/apiResponseType";

const mainURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export async function _getEveryRecord(_APIEndpointName: string) {
  //// This method is used to get all records from table and apply api feature on the client side
  const res = await fetch(`${mainURL}/${_APIEndpointName}`);

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
    result: jsonResponse.result,
    additionalInfo: jsonResponse.additionalInfo ?? null,
  };
}

export async function _getAllRecords({
  _APIEndpointName,
  page = 1,
  pageSize = 10,
  searchTerm = "",
  searchField = "",
}: {
  _APIEndpointName: string;
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  searchField?: string;
}): Promise<crudResponseType> {
  const res = await fetch(
    `${mainURL}/${_APIEndpointName}?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}&searchField=${searchField}`,
    {
      //// Cache for one hour
      next: { revalidate: 60 * 60 },
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
    result: jsonResponse.result,
    additionalInfo: jsonResponse.additionalInfo ?? null,
  };
}

export async function _getSingleRecord({
  _APIEndpointName,
  recordId,
}: {
  _APIEndpointName: string;
  recordId: string;
}): Promise<crudResponseType> {
  const res = await fetch(`${mainURL}/${_APIEndpointName}/${recordId}`, {
    //// Cache for one hour
    next: { revalidate: 60 * 60 },
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
    result: jsonResponse.result,
    additionalInfo: jsonResponse.additionalInfo ?? null,
  };
}

export async function _deleteSingleRecord({
  _APIEndpointName,
  recordId,
}: {
  _APIEndpointName: string;
  recordId: string;
}): Promise<crudResponseType> {
  const res = await fetch(`${mainURL}/${_APIEndpointName}/${recordId}`, {
    method: "DELETE",
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
    result: jsonResponse.result,
    additionalInfo: jsonResponse.additionalInfo ?? null,
  };
}

export async function _updateSingleRecord({
  _APIEndpointName,
  recordId,
  data,
}: {
  _APIEndpointName: string;
  recordId: string;
  data: any;
}): Promise<crudResponseType> {
  const res = await fetch(`${mainURL}/${_APIEndpointName}/${recordId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  const jsonResponse: apiResponseType = await res.json(); // even if !res.ok, still need this

  if (!res.ok)
    throw new Error(
      jsonResponse.message || `Failed updating record : ${res.statusText} `,
    );

  if (!jsonResponse.success) {
    throw new Error(
      jsonResponse.error || jsonResponse.message || "Unknown error from API",
    );
  }

  return {
    result: jsonResponse.result,
    additionalInfo: jsonResponse.additionalInfo ?? null,
  };
}

export async function _createSingleRecord({
  _APIEndpointName,
  data,
}: {
  _APIEndpointName: string;
  data: any;
}): Promise<crudResponseType> {
  const res = await fetch(`${mainURL}/${_APIEndpointName}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const jsonResponse: apiResponseType = await res.json(); // even if !res.ok, still need this

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
    result: jsonResponse.result,
    additionalInfo: jsonResponse.additionalInfo ?? null,
  };
}
