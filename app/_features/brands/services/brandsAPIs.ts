import {
  _createSingleRecord,
  _deleteSingleRecord,
  _getEveryRecord,
  _getSingleRecord,
  _updateSingleRecord,
} from "@/app/_services/CRUD_Operations";
const APIendPoint = "brands";

export async function getAllRecords({ cookieHeader }: { cookieHeader: any }) {
  return _getEveryRecord(APIendPoint, cookieHeader);
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
