import {
  _createSingleRecord,
  _deleteSingleRecord,
  _getAllRecords,
  _getSingleRecord,
  _updateSingleRecord,
} from "@/app/_services/CRUD_Operations";

const APIendPoint = "products";

export async function getAllRecords({
  page = 1,
  pageSize = 10,
  searchTerm = "",
}: {
  page: number;
  pageSize: number;
  searchTerm: string;
}) {
  return _getAllRecords({
    _APIEndpointName: APIendPoint,
    page,
    pageSize,
    searchTerm,
  });
}

export async function getSingleRecord(recordId: string) {
  return _getSingleRecord({ _APIEndpointName: APIendPoint, recordId });
}

export async function deleteSingleRecord(recordId: string) {
  return _deleteSingleRecord({ _APIEndpointName: APIendPoint, recordId });
}

export async function updateSingleRecord(recordId: string, data: any) {
  return _updateSingleRecord({ _APIEndpointName: APIendPoint, recordId, data });
}

export async function createSingleRecord(data: any) {
  return _createSingleRecord({ _APIEndpointName: APIendPoint, data });
}

export async function getCategories() {}

export async function getBrands() {}

export async function getModels() {}

export async function getColors() {}

export async function getSizes() {}
