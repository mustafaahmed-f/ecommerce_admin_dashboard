import {
  _createSingleRecord,
  _deleteSingleRecord,
  _getAllRecords,
  _getSingleRecord,
  _updateSingleRecord,
} from "@/app/_services/CRUD_Operations";

const APIendPoint = "coupons";

export async function getAllRecords(params: {
  page: number;
  pageSize: number;
  sort: string;
  searchTerm: string;
  searchField: string;
  cookieHeader: any;
}) {
  return _getAllRecords({ _APIEndpointName: APIendPoint, ...params });
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

export async function getDiscountTypes() {
  return [
    { value: "percentage", lable: "Percentage (%)" },
    { value: "amount", lable: "Fixed Amount ($)" },
  ];
}
