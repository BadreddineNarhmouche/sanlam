import { apiCallHandler, GeneralHelper } from "@reinsurance/helpers";
import { takeEvery, put } from "redux-saga/effects";
import store from "../store";

import {
  GetCountRecoveriesSuccess,
  GetCountRecoveriesFailure,
  GetCountRecoveries,
} from "./RecoveriesKPISlice";

import {
  GetCountReinsurancesSuccess,
  GetCountReinsurancesFailure,
  GetCountReinsurances,
} from "./ReinsurancesKPISlice";

import {
  exportFileExcelRenovel,
  exportFileExcelRenovelSuccess,
  exportFileExcelRenovelFailure,
} from "./exportFileExcelRenovelSlice";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* GetAllRecoveries(): any {
  yield apiCallHandler({
    apiPath: `/KPIs/GetAllRecoveries`,
    baseApiPath,
    dispatchSuccess: GetCountRecoveriesSuccess,
    dispatchFailure: GetCountRecoveriesFailure,
  });
}

function* GetAllReinsurances(): any {
  yield apiCallHandler({
    apiPath: `/KPIs/GetAllReinsurances`,
    baseApiPath,
    dispatchSuccess: GetCountReinsurancesSuccess,
    dispatchFailure: GetCountReinsurancesFailure,
  });
}

function* ExportFileExcelRenovelSaga({ payload }: { payload: any }): any {
  const requestOptions = {
    method: "GET",
  };
  yield apiCallHandler({
    apiPath: `/KPIs/ExportFileExcel`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: exportFileExcelRenovelSuccess,
    dispatchFailure: exportFileExcelRenovelFailure,
    successCallback: function* () {
      const state = store.getState();
      const data = state?.exportFileExcelRenovel?.responseData;
      if (data && data?.content) {
        const blob = new Blob(
          [GeneralHelper.base64ToUint8Array(data?.content)],
          {
            type: data.contentType,
          }
        );
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = data.name;
        link.click();
      } else {
        yield put({
          type: "exportFileExcelRenovel/callApiFailure",
        });
      }
    },
  });
}

function* KPIsSaga() {
  yield takeEvery(GetCountRecoveries, GetAllRecoveries);
  yield takeEvery(GetCountReinsurances, GetAllReinsurances);
  yield takeEvery(exportFileExcelRenovel, ExportFileExcelRenovelSaga);
}

export default KPIsSaga;
