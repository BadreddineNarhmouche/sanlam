import { apiCallHandler } from "@checkTracking/helpers";
import {
  apiCallGetAllChecksFailure,
  apiCallGetAllChecksSuccess,
  getCheckById,
} from "./getByIdChecksSlice";
import { takeEvery } from "redux-saga/effects";
import {
  getDevMockCheckDetails,
  isDevelopmentOffline,
} from "../devMocks";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* getChecksById({ payload }: { payload: any }): any {
  console.log(payload)
  yield apiCallHandler({
    apiPath: `/Checkes/GetById?id=${payload}`,
    baseApiPath,
    dispatchSuccess: apiCallGetAllChecksSuccess,
    dispatchFailure: apiCallGetAllChecksFailure,
    offlineMode: isDevelopmentOffline,
    offlineCall: () => getDevMockCheckDetails(payload),
  });
}

function* DetailsChSaga() {
  yield takeEvery(getCheckById, getChecksById);
}

export default DetailsChSaga;
