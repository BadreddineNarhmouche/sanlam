import { apiCallHandler } from "@checkTracking/helpers";
import { takeEvery } from "redux-saga/effects";
import {
  apiCallGetAllChecksByCriteriaFailure,
  apiCallGetAllChecksByCriteriaSuccess,
  getAllChecksByCriteria,
} from "./getAllChecksByCriteriaSlice";
import { mapChecksList } from "./mapper";
import {
  apiCallGetAllChecksFailure,
  apiCallGetAllChecksSuccess,
  getAllChecks,
} from "./getAllChecksSlice";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* getAllCheckByCriteria({ payload }: { payload: any }): any {
  yield apiCallHandler({
    apiPath: `/Checkes/GetAllByCriteria`,
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
    mapper: mapChecksList,
  });
}

function* GetCheckById({ payload }: { payload: string }): any {
  yield apiCallHandler({
    apiPath: `/Checkes/GetById?Id=${payload}`,
    baseApiPath,
    dispatchSuccess: apiCallGetCheckSuccess,
    dispatchFailure: apiCallGetCheckFailure,
  });

  console.log(apiCallGetCheckSuccess);
  console.log(apiCallHandler);
}

function* ChecksSaga() {
  yield takeEvery(getAllChecksByCriteria, getAllCheckByCriteria);
  yield takeEvery(getAllChecks, getAllCheck);
  yield takeEvery(getCheckById, GetCheckById);
}

export default ChecksSaga;
