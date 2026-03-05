import { apiCallHandler } from "@checkTracking/helpers";
import { takeEvery } from "redux-saga/effects";
import {
  apiCallGetAllDetailsCheckSliceSuccess,
  apiCallGetAllDetailsCheckSliceSFailure,
  getAllDetailsCheck,
} from "./getAllDetailsCheckSlice";
import {
  getDevMockCheckDetails,
  isDevelopmentOffline,
} from "../devMocks";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* getAllDetailsChecks({ payload }: { payload: any }): any {
  yield apiCallHandler({
    apiPath: `/Checkes/GetAllById`,
    baseApiPath,
    dispatchSuccess:   apiCallGetAllDetailsCheckSliceSuccess,
    dispatchFailure:     apiCallGetAllDetailsCheckSliceSFailure,
    offlineMode: isDevelopmentOffline,
    offlineCall: () => getDevMockCheckDetails(payload?.id),
  });
}

function* DetailsCheckSaga() {
  yield takeEvery(getAllDetailsCheck, getAllDetailsChecks);
}

export default DetailsCheckSaga;
