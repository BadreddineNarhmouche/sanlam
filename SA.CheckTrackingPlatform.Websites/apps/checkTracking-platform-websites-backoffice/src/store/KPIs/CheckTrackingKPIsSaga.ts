import { apiCallHandler, GeneralHelper } from "@checkTracking/helpers";
import { takeEvery, put } from "redux-saga/effects";
import store from "../store";
import {
  GetCheckTrackingKPIs,
  GetCheckTrackingKPIsSuccess,
  GetCheckTrackingKPIsFailure,
} from "./CheckTrackingKPISlice";
import {
  exportDocumentKpiExcelSlice,
  exportDocumentKpiExcelSliceSuccess,
  exportDocumentKpiExcelSliceFailure,
} from "./ExportDocumentKpiExcelSlice";
import {
  devMockExportedKpiFile,
  devMockKpis,
  isDevelopmentOffline,
} from "../devMocks";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* GetAllCheckTracking(): any {
  yield apiCallHandler({
    apiPath: "/KPIs/GetAllCheckTracking",
    baseApiPath,
    dispatchSuccess: GetCheckTrackingKPIsSuccess,
    dispatchFailure: GetCheckTrackingKPIsFailure,
    offlineMode: isDevelopmentOffline,
    offlineCall: () => devMockKpis,
  });
}

function* GetDocumentByDocumentTypeCodesSaga({
  payload,
}: {
  payload: any;
}): any {
  const requestOptions = {
    method: "Get",
  };

  yield apiCallHandler({
    apiPath: `/KPIs/ExportFileExcel?DocumentTypeCode=${payload.documentTypeCode}`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: exportDocumentKpiExcelSliceSuccess,
    dispatchFailure: exportDocumentKpiExcelSliceFailure,
    offlineMode: isDevelopmentOffline,
    offlineCall: () => devMockExportedKpiFile,
    successCallback: function* () {
      const state = store.getState();
      const data = state?.ExportDocumentKpiExcel?.responseData;
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
          type: "exportDocumentKpiExcelSlice/callApiFailure",
        });
      }
    },
  });
}

function* CheckTrackingKPIsSaga() {
  yield takeEvery(GetCheckTrackingKPIs, GetAllCheckTracking);
  yield takeEvery(
    exportDocumentKpiExcelSlice,
    GetDocumentByDocumentTypeCodesSaga
  );
}

export default CheckTrackingKPIsSaga;
