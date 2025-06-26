import { apiCallHandler } from "@checkTracking/helpers";
import { takeEvery } from "redux-saga/effects";
import {
  AllReasonMove,
  apiCallReasonMoveAllSuccess,
  apiCallReasonMoveAllFailure,
} from "./ReasonMoveAllSlice";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* GetAllReasonMove({ payload }: { payload: any }): any {
  yield apiCallHandler({
    apiPath: `/ReasonMove/GetAllReasonMoves?To=${payload}`,
    baseApiPath,
    dispatchSuccess: apiCallReasonMoveAllSuccess,
    dispatchFailure: apiCallReasonMoveAllFailure,
  });
}

function* ReasonMoveSaga() {
  yield takeEvery(AllReasonMove, GetAllReasonMove);
}

export default ReasonMoveSaga;
