import { apiCallHandler } from "@checkTracking/helpers";
import { takeEvery } from "redux-saga/effects";
import {
  apiCallGetAllChecksFailure,
  apiCallGetAllChecksSuccess,
  getAllChecks,
} from "./getAllChecksSlice";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* getAllCheck({ payload }: { payload: any }): any {
  yield apiCallHandler({
    apiPath: `/Checkes/GetAllByCriteria`,
    baseApiPath,
    dispatchSuccess: apiCallGetAllChecksSuccess,
    dispatchFailure: apiCallGetAllChecksFailure,
  });
}

function* ChecksSaga() {
  yield takeEvery(getAllChecks, getAllCheck);
}

export default ChecksSaga;
