import { apiCallHandler } from "@checkTracking/helpers";
import { takeEvery } from "redux-saga/effects";
import {
  AllStatus,
  apiCallStatusAllFailure,
  apiCallStatusAllSuccess,
} from "./StatusAllSlice";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* GetAllStatus(): any {
  yield apiCallHandler({
    apiPath: `/Status/GetAllStatus`,
    baseApiPath,
    dispatchSuccess: apiCallStatusAllSuccess,
    dispatchFailure: apiCallStatusAllFailure,
  });
}

function* StatusSaga() {
  yield takeEvery(AllStatus, GetAllStatus);
}

export default StatusSaga;
