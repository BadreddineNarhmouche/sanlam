import { apiCallHandler } from "@checkTracking/helpers";
import { takeEvery } from "redux-saga/effects";
import {
  GetCheckTrackingKPIs,
  GetCheckTrackingKPIsSuccess,
  GetCheckTrackingKPIsFailure,
} from "./CheckTrackingKPISlice";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* GetAllCheckTracking(): any {
  yield apiCallHandler({
    apiPath: "/KPIs/GetAllCheckTracking",
    baseApiPath,
    dispatchSuccess: GetCheckTrackingKPIsSuccess,
    dispatchFailure: GetCheckTrackingKPIsFailure,
  });
}

function* CheckTrackingKPIsSaga() {
  yield takeEvery(GetCheckTrackingKPIs, GetAllCheckTracking);
}

export default CheckTrackingKPIsSaga;
