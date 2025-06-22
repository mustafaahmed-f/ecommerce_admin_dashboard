import { apiResponseType, crudResponseType } from "../_types/apiResponseType";

const mainURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export async function _getEveryRecord(_APIEndpointName: string) {
  //// This method is used to get all records from table and apply api feature on the client side
  const res = await fetch(`${mainURL}/${_APIEndpointName}`);

  if (!res.ok) throw new Error("Failed getting records");

  const jsonResponse: apiResponseType = await res.json();

  if (!jsonResponse.success) {
    throw new Error(jsonResponse.error || "Unknown error from API");
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
}: {
  _APIEndpointName: string;
  page?: number;
  pageSize?: number;
  searchTerm?: string;
}): Promise<crudResponseType> {
  const res = await fetch(
    `${mainURL}/${_APIEndpointName}?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}`,
  );

  if (!res.ok) throw new Error("Failed getting records");

  const jsonResponse: apiResponseType = await res.json();

  if (!jsonResponse.success) {
    throw new Error(jsonResponse.error || "Unknown error from API");
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
  const res = await fetch(
    `${mainURL}/${_APIEndpointName}/?recordId=${recordId}`,
  );

  if (!res.ok) throw new Error("Failed getting record");

  const jsonResponse: apiResponseType = await res.json();

  if (!jsonResponse.success) {
    throw new Error(jsonResponse.error || "Unknown error from API");
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
  const res = await fetch(
    `${mainURL}/${_APIEndpointName}/?recordId=${recordId}`,
    {
      method: "DELETE",
    },
  );

  if (!res.ok) throw new Error("Failed deleting record");

  const jsonResponse: apiResponseType = await res.json();

  if (!jsonResponse.success) {
    throw new Error(jsonResponse.error || "Unknown error from API");
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
  const res = await fetch(
    `${mainURL}/${_APIEndpointName}/?recordId=${recordId}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) throw new Error("Failed updating record");

  const jsonResponse: apiResponseType = await res.json();

  if (!jsonResponse.success) {
    throw new Error(jsonResponse.error || "Unknown error from API");
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

  if (!res.ok) throw new Error("Failed creating record");

  const jsonResponse: apiResponseType = await res.json();

  if (!jsonResponse.success) {
    throw new Error(jsonResponse.error || "Unknown error from API");
  }

  return {
    result: jsonResponse.result,
    additionalInfo: jsonResponse.additionalInfo ?? null,
  };
}
