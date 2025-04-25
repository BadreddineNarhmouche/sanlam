import {
  FilterCriteriaDeliverySlips,
  TreatReinsuranceDeliverySlipItem,
  ValidateReinsuranceDeliverySlipItem,
  TreatAccountingDeliverySlipItem,
  ValidateAccountingDeliverySlipItem,
  PAGINATION,
  apiCallHandler,
  GeneralHelper,
  CreateDeliverySlipItem,
} from "@checkTracking/helpers";
import { takeEvery, put } from "redux-saga/effects";
import {
  mapReinsuranceDeliverySlipsList,
  mapAccountingDeliverySlipsList,
} from "./mapper";
import store from "../store";

import {
  apiCallReinsuranceDeliverySlipsListSuccess,
  apiCallReinsuranceDeliverySlipsListFailure,
  getAllReinsuranceDeliverySlipsByCriteria,
} from "./deliverySlipsReinsuranceListSlice";

import {
  apiCallAccountingDeliverySlipsListSuccess,
  apiCallAccountingDeliverySlipsListFailure,
  getAllAccountingDeliverySlipsByCriteria,
} from "./deliverySlipsAccountingListSlice";

import {
  apiCallDeliverySlipSuccess,
  apiCallDeliverySlipFailure,
  getDeliverySlipById,
} from "./deliverySlipSlice";

import {
  createDeliverySlip,
  apiCallCreateDeliverySlipFailure,
  apiCallCreateDeliverySlipSuccess,
} from "./deliverySlipCreateSlice";

import {
  treatReinsuranceDeliverySlip,
  apiCallTreatReinsuranceDeliverySlipFailure,
  apiCallTreatReinsuranceDeliverySlipSuccess,
} from "./deliverySlipTreatReinsuranceSlice";

import {
  validateReinsuranceDeliverySlip,
  apiCallValidateReinsuranceDeliverySlipFailure,
  apiCallValidateReinsuranceDeliverySlipSuccess,
} from "./deliverySlipValidateReinsuranceSlice";

import {
  treatAccountingDeliverySlip,
  apiCallTreatAccountingDeliverySlipFailure,
  apiCallTreatAccountingDeliverySlipSuccess,
} from "./deliverySlipTreatAccountingSlice";

import {
  validateAccountingDeliverySlip,
  apiCallValidateAccountingDeliverySlipFailure,
  apiCallValidateAccountingDeliverySlipSuccess,
} from "./deliverySlipValidateAccountingSlice";

import {
  getDeliverySlipDocumentById,
  getDeliverySlipDocumentByIdFailure,
  getDeliverySlipDocumentByIdSuccess,
} from "./deliverySlipGetDocumentByIdSlice";

import {
  downloadDeliverySlipDocumentById,
  downloadDeliverySlipDocumentByIdFailure,
  downloadDeliverySlipDocumentByIdSuccess,
} from "./deliverySlipDownloadDocumentByIdSlice";

import {
  getDeliverySlipDocumentByCriteria,
  getDeliverySlipDocumentByCriteriaFailure,
  getDeliverySlipDocumentByCriteriaSuccess,
} from "./deliverySlipGetDocumentByCriteriaSlice";

import {
  downloadDeliverySlipDocumentByCriteria,
  downloadDeliverySlipDocumentByCriteriaFailure,
  downloadDeliverySlipDocumentByCriteriaSuccess,
} from "./deliverySlipDownloadDocumentByCriteriaSlice";

import {
  getAllDeliverySlipDocumentsByCriteria,
  getAllDeliverySlipDocumentsByCriteriaFailure,
  getAllDeliverySlipDocumentsByCriteriaSuccess,
} from "./deliverySlipGetAllDocumentsByCriteriaSlice";

import {
  submitDocumentsDeliverySlip,
  apiCallSubmitDocumentsDeliverySlipFailure,
  apiCallSubmitDocumentsDeliverySlipSuccess,
} from "./deliverySlipSubmitDocumentsSlice";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* GetAllReinsuranceDeliverySlipsByCriteriaSaga({
  payload,
}: {
  payload: FilterCriteriaDeliverySlips;
}): any {
  const pageIndex = payload.meta?.pageIndex || 1;
  const pageSize = payload.meta?.pageSize || PAGINATION.PAGE_SIZE;

  yield apiCallHandler({
    apiPath: `/DeliverySlips/GetAllByCriteria?Reference=${payload.reference}&WorkFlowStepCode=${payload.workFlowStepCode}&pageIndex=${pageIndex}&pageSize=${pageSize}&CalculateTotalCount=true`,
    baseApiPath,
    dispatchSuccess: apiCallReinsuranceDeliverySlipsListSuccess,
    dispatchFailure: apiCallReinsuranceDeliverySlipsListFailure,
    mapper: mapReinsuranceDeliverySlipsList,
  });
}

function* GetAllAccountingDeliverySlipsByCriteriaSaga({
  payload,
}: {
  payload: FilterCriteriaDeliverySlips;
}): any {
  const pageIndex = payload.meta?.pageIndex || 1;
  const pageSize = payload.meta?.pageSize || PAGINATION.PAGE_SIZE;

  yield apiCallHandler({
    apiPath: `/DeliverySlips/GetAllByCriteria?Reference=${payload.reference}&WorkFlowStepCode=${payload.workFlowStepCode}&ExternalPolicyReference=${payload.policyReference}&ExternalClientName=${payload.externalClientName}&ExternalReinsuranceReference=${payload.externalReinsuranceReference}&pageIndex=${pageIndex}&pageSize=${pageSize}&CalculateTotalCount=true`,
    baseApiPath,
    dispatchSuccess: apiCallAccountingDeliverySlipsListSuccess,
    dispatchFailure: apiCallAccountingDeliverySlipsListFailure,
    mapper: mapAccountingDeliverySlipsList,
  });
}

function* getDeliverySlipByIdSaga({ payload }: { payload: string }): any {
  let apiPath = `/DeliverySlips/GetById?Id=${payload}`;
  yield apiCallHandler({
    apiPath: apiPath,
    baseApiPath,
    dispatchSuccess: apiCallDeliverySlipSuccess,
    dispatchFailure: apiCallDeliverySlipFailure,
  });
}

function isNumber(payload: number | string) {
  if (typeof payload === "number" && !isNaN(payload)) {
    return true;
  } else if (typeof payload === "string") {
    return !isNaN(parseFloat(payload));
  } else {
    return false;
  }
}

function* TreatReinsuranceDeliverySlipSaga({
  payload,
}: {
  payload: TreatReinsuranceDeliverySlipItem;
}): any {
  const bodyFormData: any = new FormData();
  GeneralHelper.appendObjectToFormData(payload, bodyFormData);

  const requestOptions = {
    method: "POST",
    body: bodyFormData,
    contentType: "multipart/form-data",
  };

  yield apiCallHandler({
    apiPath: `/DeliverySlips/TreatReinsurance`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: apiCallTreatReinsuranceDeliverySlipSuccess,
    dispatchFailure: apiCallTreatReinsuranceDeliverySlipFailure,
    successCallback: function* () {
      yield apiCallHandler({
        apiPath: `/DeliverySlips/GetById?Id=${payload.deliverySlipId}`,
        baseApiPath,
        dispatchSuccess: apiCallDeliverySlipSuccess,
        dispatchFailure: apiCallDeliverySlipFailure,
      });
    },
  });
}

function* ValidateReinsuranceDeliverySlipSaga({
  payload,
}: {
  payload: ValidateReinsuranceDeliverySlipItem;
}): any {
  const bodyFormData: any = new FormData();

  GeneralHelper.appendObjectToFormData(payload, bodyFormData);

  const requestOptions = {
    method: "POST",
    body: bodyFormData,
    contentType: "multipart/form-data",
  };

  yield apiCallHandler({
    apiPath: `/DeliverySlips/ValidateReinsurance`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: apiCallValidateReinsuranceDeliverySlipSuccess,
    dispatchFailure: apiCallValidateReinsuranceDeliverySlipFailure,
    successCallback: function* () {
      yield apiCallHandler({
        apiPath: `/DeliverySlips/GetById?Id=${payload.deliverySlipId}`,
        baseApiPath,
        dispatchSuccess: apiCallDeliverySlipSuccess,
        dispatchFailure: apiCallDeliverySlipFailure,
      });
    },
  });
}

function* TreatAccountingDeliverySlipSaga({
  payload,
}: {
  payload: TreatAccountingDeliverySlipItem;
}): any {
  const bodyFormData: any = new FormData();
  GeneralHelper.appendObjectToFormData(payload, bodyFormData);

  const requestOptions = {
    method: "POST",
    body: bodyFormData,
    contentType: "multipart/form-data",
  };

  yield apiCallHandler({
    apiPath: `/DeliverySlips/TreatAccounting`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: apiCallTreatAccountingDeliverySlipSuccess,
    dispatchFailure: apiCallTreatAccountingDeliverySlipFailure,
    successCallback: function* () {
      yield apiCallHandler({
        apiPath: `/DeliverySlips/GetById?Id=${payload.deliverySlipId}`,
        baseApiPath,
        dispatchSuccess: apiCallDeliverySlipSuccess,
        dispatchFailure: apiCallDeliverySlipFailure,
      });
    },
  });
}

function* CreateDeliverySlipSaga({
  payload,
}: {
  payload: CreateDeliverySlipItem;
}): any {
  const bodyFormData: any = new FormData();
  GeneralHelper.appendObjectToFormData(payload, bodyFormData);

  const requestOptions = {
    method: "POST",
    body: bodyFormData,
    contentType: "multipart/form-data",
  };

  yield apiCallHandler({
    apiPath: `/DeliverySlips/Create`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: apiCallCreateDeliverySlipSuccess,
    dispatchFailure: apiCallCreateDeliverySlipFailure,
  });
}

function* ValidateAccountingDeliverySlipSaga({
  payload,
}: {
  payload: ValidateAccountingDeliverySlipItem;
}): any {
  const bodyFormData: any = new FormData();

  GeneralHelper.appendObjectToFormData(payload, bodyFormData);

  const requestOptions = {
    method: "POST",
    body: bodyFormData,
    contentType: "multipart/form-data",
  };

  yield apiCallHandler({
    apiPath: `/DeliverySlips/ValidateAccounting`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: apiCallValidateAccountingDeliverySlipSuccess,
    dispatchFailure: apiCallValidateAccountingDeliverySlipFailure,
    successCallback: function* () {
      yield apiCallHandler({
        apiPath: `/DeliverySlips/GetById?Id=${payload.deliverySlipId}`,
        baseApiPath,
        dispatchSuccess: apiCallDeliverySlipSuccess,
        dispatchFailure: apiCallDeliverySlipFailure,
      });
    },
  });
}

function* GetDeliverySlipDocumentByIdSaga({ payload }: { payload: any }): any {
  const requestOptions = {
    method: "GET",
  };
  yield apiCallHandler({
    apiPath: `/DeliverySlipDocuments/DownloadDocumentById?Id=${payload.id}`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: getDeliverySlipDocumentByIdSuccess,
    dispatchFailure: getDeliverySlipDocumentByIdFailure,
  });
}

function* DownloadDeliverySlipDocumentByIdSaga({
  payload,
}: {
  payload: any;
}): any {
  const requestOptions = {
    method: "GET",
  };
  yield apiCallHandler({
    apiPath: `/DeliverySlipDocuments/DownloadDocumentById?Id=${payload.id}`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: downloadDeliverySlipDocumentByIdSuccess,
    dispatchFailure: downloadDeliverySlipDocumentByIdFailure,
    successCallback: function* () {
      const state = store.getState();
      const data = state?.deliverySlipDownloadDocumentById?.responseData;
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
        yield put({ type: "deliverySlipDownloadDocumentById/callApiFailure" });
      }
    },
  });
}

function* GetDeliverySlipDocumentByCriteriaSaga({
  payload,
}: {
  payload: any;
}): any {
  const requestOptions = {
    method: "GET",
  };
  yield apiCallHandler({
    apiPath: `/DeliverySlipDocuments/DownloadDocumentByCriteria?DeliverySlipId=${payload.deliverySlipId}&DocumentTypeCode=${payload.documentTypeCode}&BankAccountId=${payload.bankAccountId}&Equivalent=${payload.equivalent}&RefReinsurer=${payload.refReinsurer}&CurrencyId=${payload.currencyId}`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: getDeliverySlipDocumentByCriteriaSuccess,
    dispatchFailure: getDeliverySlipDocumentByCriteriaFailure,
  });
}

function* DownloadDeliverySlipDocumentByCriteriaSaga({
  payload,
}: {
  payload: any;
}): any {
  const requestOptions = {
    method: "GET",
  };
  yield apiCallHandler({
    apiPath: `/DeliverySlipDocuments/DownloadDocumentByCriteria?DeliverySlipId=${payload.deliverySlipId}&DocumentTypeCode=${payload.documentTypeCode}&BankAccountId=${payload.bankAccountId}&Equivalent=${payload.equivalent}&RefReinsurer=${payload.refReinsurer}&CurrencyId=${payload.currencyId}`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: downloadDeliverySlipDocumentByCriteriaSuccess,
    dispatchFailure: downloadDeliverySlipDocumentByCriteriaFailure,
    successCallback: function* () {
      const state = store.getState();
      const data = state?.deliverySlipDownloadDocumentByCriteria?.responseData;
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
          type: "deliverySlipDownloadDocumentByCriteria/callApiFailure",
        });
      }
    },
  });
}

function* GetAllDeliverySlipDocumentByCriteriaSaga({
  payload,
}: {
  payload: any;
}): any {
  const requestOptions = {
    method: "GET",
  };
  yield apiCallHandler({
    apiPath: `/DeliverySlipDocuments/GetAllDocumentsByCriteria?DeliverySlipId=${payload.deliverySlipId}`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: getAllDeliverySlipDocumentsByCriteriaSuccess,
    dispatchFailure: getAllDeliverySlipDocumentsByCriteriaFailure,
  });
}

function* SubmitDeliverySlipDocumentsSaga({
  payload,
}: {
  payload: { deliverySlipId: string; documents: any };
}): any {
  const bodyFormData: any = new FormData();
  GeneralHelper.appendObjectToFormData(payload, bodyFormData);

  const requestOptions = {
    method: "POST",
    body: bodyFormData,
    contentType: "multipart/form-data",
  };

  yield apiCallHandler({
    apiPath: `/DeliverySlipDocuments/Submit`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: apiCallSubmitDocumentsDeliverySlipSuccess,
    dispatchFailure: apiCallSubmitDocumentsDeliverySlipFailure,
    successCallback: function* () {
      yield apiCallHandler({
        apiPath: `/DeliverySlipDocuments/GetAllDocumentsByCriteria?DeliverySlipId=${payload.deliverySlipId}`,
        baseApiPath,
        dispatchSuccess: getAllDeliverySlipDocumentsByCriteriaSuccess,
        dispatchFailure: getAllDeliverySlipDocumentsByCriteriaFailure,
      });
    },
  });
}

function* deliverySlipsSaga() {
  yield takeEvery(
    getAllReinsuranceDeliverySlipsByCriteria,
    GetAllReinsuranceDeliverySlipsByCriteriaSaga
  );
  yield takeEvery(
    getAllAccountingDeliverySlipsByCriteria,
    GetAllAccountingDeliverySlipsByCriteriaSaga
  );
  yield takeEvery(getDeliverySlipById, getDeliverySlipByIdSaga);
  yield takeEvery(createDeliverySlip, CreateDeliverySlipSaga);
  yield takeEvery(
    treatReinsuranceDeliverySlip,
    TreatReinsuranceDeliverySlipSaga
  );
  yield takeEvery(
    validateReinsuranceDeliverySlip,
    ValidateReinsuranceDeliverySlipSaga
  );
  yield takeEvery(treatAccountingDeliverySlip, TreatAccountingDeliverySlipSaga);
  yield takeEvery(
    validateAccountingDeliverySlip,
    ValidateAccountingDeliverySlipSaga
  );
  yield takeEvery(getDeliverySlipDocumentById, GetDeliverySlipDocumentByIdSaga);
  yield takeEvery(
    downloadDeliverySlipDocumentById,
    DownloadDeliverySlipDocumentByIdSaga
  );
  yield takeEvery(
    getDeliverySlipDocumentByCriteria,
    GetDeliverySlipDocumentByCriteriaSaga
  );
  yield takeEvery(
    downloadDeliverySlipDocumentByCriteria,
    DownloadDeliverySlipDocumentByCriteriaSaga
  );
  yield takeEvery(
    getAllDeliverySlipDocumentsByCriteria,
    GetAllDeliverySlipDocumentByCriteriaSaga
  );
  yield takeEvery(submitDocumentsDeliverySlip, SubmitDeliverySlipDocumentsSaga);
}

export default deliverySlipsSaga;
