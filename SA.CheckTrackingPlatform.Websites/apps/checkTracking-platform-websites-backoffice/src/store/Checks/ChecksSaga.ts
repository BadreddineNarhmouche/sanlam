import { apiCallHandler } from "@checkTracking/helpers";
import { takeEvery } from "redux-saga/effects";
import {
  apiCallGetAllChecksByCriteriaFailure,
  apiCallGetAllChecksByCriteriaSuccess,
  getAllChecksByCriteria,
} from "./getAllChecksByCriteriaSlice";
import { mapAllChecksList, mapChecksList } from "./mapper";
import {
  apiCallGetAllChecksFailure,
  apiCallGetAllChecksSuccess,
  getAllChecks,
} from "./getAllChecksSlice";
import {
  apiCallGetCheckFailure,
  apiCallGetCheckSuccess,
  getCheckById,
} from "./getCheckByIdSlice";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* getAllCheckByCriteria({ payload }: { payload: any }): any {
  yield apiCallHandler({
    apiPath: `/Checkes/GetAllByCriteria?CheckNumbers=${payload?.checkNumber}&LotNumber=${payload?.lotNumber}&SinisterNumber=${payload?.sinisterNumber}&StatusId=${payload?.checkStatusId}`,
    baseApiPath,
    dispatchSuccess: apiCallGetAllChecksByCriteriaSuccess,
    dispatchFailure: apiCallGetAllChecksByCriteriaFailure,
    mapper: mapChecksList,
  });
}

function* getAllCheck({ payload }: { payload: any }): any {
  yield apiCallHandler({
    apiPath: `/Checkes/GetAllChecks?status=${payload?.status}`,
    baseApiPath,
    dispatchSuccess: apiCallGetAllChecksSuccess,
    dispatchFailure: apiCallGetAllChecksFailure,
    mapper: mapAllChecksList,
  });
}

function* GetCheckById({ payload }: { payload: string }): any {
  yield apiCallHandler({
    apiPath: `/Checkes/GetById?Id=${payload}`,
    baseApiPath,
    dispatchSuccess: apiCallGetCheckSuccess,
    dispatchFailure: apiCallGetCheckFailure,
  });
}

function* ChecksSaga() {
  yield takeEvery(getAllChecksByCriteria, getAllCheckByCriteria);
  yield takeEvery(getAllChecks, getAllCheck);
  yield takeEvery(getCheckById, GetCheckById);
}

export default ChecksSaga;
