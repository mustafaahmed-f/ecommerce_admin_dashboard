import {
  _createSingleRecord,
  _deleteSingleRecord,
  _getAllRecords,
  _getSingleRecord,
  _updateSingleRecord,
} from "@/app/_services/CRUD_Operations";
import { apiResponseType } from "@/app/_types/apiResponseType";
import { colors } from "@/app/_utils/constants/Colors";
import { sizes } from "@/app/_utils/constants/Sizes";
import { generateTags } from "@/app/_utils/helperMethods/generateTags";

const APIendPoint = "products";
const mainURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export async function getAllRecords({
  page = 1,
  pageSize = 10,
  sort = "",
  searchTerm = "",
  searchField = "",
  cookieHeader,
}: {
  page: number;
  pageSize: number;
  sort: string;
  searchTerm: string;
  searchField: string;
  cookieHeader: any;
}) {
  return _getAllRecords({
    _APIEndpointName: APIendPoint,
    page,
    pageSize,
    sort,
    searchTerm,
    searchField,
    cookieHeader,
  });
}

export async function getSingleRecord(recordId: string, cookieHeader?: any) {
  return _getSingleRecord({
    _APIEndpointName: APIendPoint,
    recordId,
    cookieHeader,
  });
}

export async function deleteSingleRecord(recordId: string, cookieHeader?: any) {
  return _deleteSingleRecord({
    _APIEndpointName: APIendPoint,
    recordId,
    cookieHeader,
  });
}

export async function updateSingleRecord(
  recordId: string,
  data: any,
  cookieHeader?: any,
) {
  return _updateSingleRecord({
    _APIEndpointName: APIendPoint,
    recordId,
    data,
    cookieHeader,
  });
}

export async function createSingleRecord(data: any, cookieHeader?: any) {
  return _createSingleRecord({
    _APIEndpointName: APIendPoint,
    data,
    cookieHeader,
  });
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${mainURL}/categories`, {
    //// Cache for three hours
    next: {
      revalidate: 60 * 60 * 3,
      tags: generateTags("categories", "allRecords"),
    },
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

  return jsonResponse.result.map((category: any) => category.title);
}

export async function getBrands(): Promise<string[]> {
  const res = await fetch(`${mainURL}/brands`, {
    //// Cache for three hours
    next: {
      revalidate: 60 * 60 * 3,
      tags: generateTags("brands", "allRecords"),
    },
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

  return jsonResponse.result.map((brand: any) => brand.title);
}

export async function getModels(): Promise<string[]> {
  const res = await fetch(`${mainURL}/models`, {
    //// Cache for three hours
    next: {
      revalidate: 60 * 60 * 3,
      tags: generateTags("models", "allRecords"),
    },
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

  return jsonResponse.result.map((model: any) => model.title);
}

export async function getColors(): Promise<string[]> {
  return colors;
}

export async function getSizes(): Promise<string[]> {
  return sizes;
}
