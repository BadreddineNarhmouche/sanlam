import {
  apiCallHandler,
} from "@checkTracking/helpers";
import { takeEvery } from "redux-saga/effects";

import {
  getBankByAllSuccess,
  getBankByAllFailure,
  getBankByAll,
} from "./BankByAllSlice";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* GetBankByAllSaga(): any {
  yield apiCallHandler({
    apiPath: `/Bank/GetAll`,
    baseApiPath,
    dispatchSuccess: getBankByAllSuccess,
    dispatchFailure: getBankByAllFailure,
  });
}

function* BanksSaga() {
  yield takeEvery(getBankByAll, GetBankByAllSaga);
}

export default BanksSaga;
