import { apiCallHandler } from "@checkTracking/helpers";
import { takeEvery } from "redux-saga/effects";
import {
  ReceivedOfficeSendClientAll,
  apiCallReceivedOfficeSendClientAllSuccess,
  apiCallReceivedOfficeSendClientAllFailure,
} from "./ReceivedOfficeSendClient";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* GetReceivedOfficeSendClientAll(): any {
  yield apiCallHandler({
    apiPath: "/KPIs/GetAllCheckTracking",
    baseApiPath,
    dispatchSuccess: apiCallReceivedOfficeSendClientAllSuccess,
    dispatchFailure: apiCallReceivedOfficeSendClientAllFailure,
  });
}

function* ReceivedOfficeSendClientSaga() {
  yield takeEvery(ReceivedOfficeSendClientAll, GetReceivedOfficeSendClientAll);
}

export default ReceivedOfficeSendClientSaga;
