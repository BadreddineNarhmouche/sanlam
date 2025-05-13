import { apiCallHandler } from "@checkTracking/helpers";
import {
  apiCallGetAllChecksFailure,
  apiCallGetAllChecksSuccess,
  getCheckById,
} from "./getByIdChecksSlice";
import { takeEvery } from "redux-saga/effects";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* getChecksById({ payload }: { payload: any }): any {
  yield apiCallHandler({
    apiPath: "/Checkes/GetById",
    baseApiPath,
    dispatchSuccess: apiCallGetAllChecksSuccess,
    dispatchFailure: apiCallGetAllChecksFailure,
  });
}

function* DetailsChSaga() {
  yield takeEvery(getCheckById, getChecksById);
}

export default DetailsChSaga;
