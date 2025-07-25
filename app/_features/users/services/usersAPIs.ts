import {
  _deleteSingleRecord,
  _getAllRecords,
  _getSingleRecord,
} from "@/app/_services/CRUD_Operations";

const APIendPoint = "users";
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
