import { apiCallHandler } from "@checkTracking/helpers";
import { takeEvery } from "redux-saga/effects";

import {
  GetAllCurrenciesSuccess,
  GetAllCurrenciesFailure,
  GetAllCurrencies,
} from "./GetAllCurrenciesSlice";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* GetAllCurrenciesSaga(): any {
  yield apiCallHandler({
    apiPath: `/Currency/GetAll`,
    baseApiPath,
    dispatchSuccess: GetAllCurrenciesSuccess,
    dispatchFailure: GetAllCurrenciesFailure,
  });
}

function* CurrenciesSaga() {
  yield takeEvery(GetAllCurrencies, GetAllCurrenciesSaga);
}

export default CurrenciesSaga;
