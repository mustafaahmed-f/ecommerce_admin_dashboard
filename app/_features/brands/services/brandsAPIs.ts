import {
  _createSingleRecord,
  _deleteSingleRecord,
  _getEveryRecord,
  _getSingleRecord,
  _updateSingleRecord,
} from "@/app/_services/CRUD_Operations";
const APIendPoint = "brands";

export async function getAllRecords() {
  return _getEveryRecord(APIendPoint);
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
