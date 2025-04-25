import {
  FilterCriteriaQuittances,
  PAGINATION,
  apiCallHandler,
  GeneralHelper,
  CreatePayment,
  ValidatePaymentItem,
} from "@checkTracking/helpers";
import { put, takeEvery } from "redux-saga/effects";
import { mapPaymentList } from "./mapper";

import {
  getPaymentByCriteriaSuccess,
  getPaymentByCriteriaFailure,
  getPaymentByCriteria,
} from "./PaymentByCriteriaSlice";

import {
  getPaymentByIdSuccess,
  getPaymentByIdFailure,
  getPaymentById,
} from "./PaymentByIdSlice";

import {
  PaymentCreateSuccess,
  PaymentCreateFailure,
  PaymentCreate,
} from "./PaymentCreateSlice";

import {
  PaymentValidateSuccess,
  PaymentValidateFailure,
  PaymentValidate,
} from "./PaymentValidateSlice";

import {
  downloadPaymentDocumentByCriteria,
  downloadPaymentDocumentByCriteriaFailure,
  downloadPaymentDocumentByCriteriaSuccess,
} from "./PaymentsDownloadDocumentByCriteriaSlice";

import {
  downloadPaymentDocumentById,
  downloadPaymentDocumentByIdFailure,
  downloadPaymentDocumentByIdSuccess,
} from "./PaymentsDownloadDocumentByIdSlice";

import {
  getAllPaymentsDocumentsByCriteria,
  getAllPaymentsDocumentsByCriteriaFailure,
  getAllPaymentsDocumentsByCriteriaSuccess,
} from "./PaymentsGetAllDocumentsByCriteriaSlice";

import {
  getPaymentsDocumentByCriteria,
  getPaymentsDocumentByCriteriaFailure,
  getPaymentsDocumentByCriteriaSuccess,
} from "./PaymentsGetDocumentByCriteriaSlice";

import {
  getPaymentsDocumentById,
  getPaymentsDocumentByIdFailure,
  getPaymentsDocumentByIdSuccess,
} from "./PaymentsGetDocumentByIdSlice";

import store from "../store";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* GetPaymentByCriteriaSaga({
  payload,
}: {
  payload: FilterCriteriaQuittances;
}): any {
  const pageIndex = payload.meta?.pageIndex || 1;
  const pageSize = payload.meta?.pageSize || PAGINATION.PAGE_SIZE;

  yield apiCallHandler({
    apiPath: `/Payments/GetAllByCriteria?Reference=${payload.reference}&WorkFlowStepCode=${payload.workFlowStepCode}&pageIndex=${pageIndex}&pageSize=${pageSize}&CalculateTotalCount=true`,
    baseApiPath,
    dispatchSuccess: getPaymentByCriteriaSuccess,
    dispatchFailure: getPaymentByCriteriaFailure,
    mapper: mapPaymentList,
  });
}

function* GetPaymentByIdSaga({ payload }: { payload: string }): any {
  yield apiCallHandler({
    apiPath: `/Payments/GetById?Id=${payload}`,
    baseApiPath,
    dispatchSuccess: getPaymentByIdSuccess,
    dispatchFailure: getPaymentByIdFailure,
  });
}

function* CreatePaymentSaga({ payload }: { payload: CreatePayment }): any {
  const bodyFormData: any = new FormData();
  GeneralHelper.appendObjectToFormData(payload, bodyFormData);

  const requestOptions = {
    method: "POST",
    body: bodyFormData,
    contentType: "multipart/form-data",
  };

  yield apiCallHandler({
    apiPath: `/Payments/Create`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: PaymentCreateSuccess,
    dispatchFailure: PaymentCreateFailure,
  });
}

function* ValidatePaymentSaga({
  payload,
}: {
  payload: ValidatePaymentItem;
}): any {
  const bodyFormData: any = new FormData();

  GeneralHelper.appendObjectToFormData(payload, bodyFormData);

  const requestOptions = {
    method: "POST",
    body: bodyFormData,
    contentType: "multipart/form-data",
  };

  yield apiCallHandler({
    apiPath: `/Payments/ValidateAccounting`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: PaymentValidateSuccess,
    dispatchFailure: PaymentValidateFailure,
    successCallback: function* () {
      yield apiCallHandler({
        apiPath: `/Payments/GetById?Id=${payload.paymentId}`,
        baseApiPath,
        dispatchSuccess: getPaymentByIdSuccess,
        dispatchFailure: getPaymentByIdFailure,
      });
    },
  });
}

function* DownloadPaymentDocumentByCriteriaSaga({
  payload,
}: {
  payload: any;
}): any {
  const requestOptions = {
    method: "GET",
  };
  yield apiCallHandler({
    apiPath: `/PaymentsDocuments/DownloadDocumentByCriteria?PaymentId=${payload.paymentId}&DocumentTypeCode=${payload.documentTypeCode}&BankAccountId=${payload.bankAccountId}&Equivalent=${payload.equivalent}&RefReinsurer=${payload.refReinsurer}&CurrencyId=${payload.currencyId}`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: downloadPaymentDocumentByCriteriaSuccess,
    dispatchFailure: downloadPaymentDocumentByCriteriaFailure,
    successCallback: function* () {
      const state = store.getState();
      const data = state?.paymentDownloadDocumentByCriteria?.responseData;
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
          type: "paymentDownloadDocumentByCriteria/callApiFailure",
        });
      }
    },
  });
}

function* DownloadPaymentDocumentByIdSaga({ payload }: { payload: any }): any {
  const requestOptions = {
    method: "GET",
  };
  yield apiCallHandler({
    apiPath: `/PaymentsDocuments/DownloadDocumentById?Id=${payload.id}`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: downloadPaymentDocumentByIdSuccess,
    dispatchFailure: downloadPaymentDocumentByIdFailure,
    successCallback: function* () {
      const state = store.getState();
      const data = state?.paymentDownloadDocumentById?.responseData;
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
        yield put({ type: "paymentDownloadDocumentById/callApiFailure" });
      }
    },
  });
}

function* GetAllPaymentDocumentByCriteriaSaga({
  payload,
}: {
  payload: any;
}): any {
  const requestOptions = {
    method: "GET",
  };
  yield apiCallHandler({
    apiPath: `/PaymentsDocuments/GetAllDocumentsByCriteria?PaymentId=${payload.paymentId}`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: getAllPaymentsDocumentsByCriteriaSuccess,
    dispatchFailure: getAllPaymentsDocumentsByCriteriaFailure,
  });
}

function* GetPaymentDocumentByCriteriaSaga({ payload }: { payload: any }): any {
  const requestOptions = {
    method: "GET",
  };
  yield apiCallHandler({
    apiPath: `/PaymentsDocuments/DownloadDocumentByCriteria?PaymentId=${payload.paymentId}&DocumentTypeCode=${payload.documentTypeCode}&BankAccountId=${payload.bankAccountId}&Equivalent=${payload.equivalent}&RefReinsurer=${payload.refReinsurer}&CurrencyId=${payload.currencyId}`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: getPaymentsDocumentByCriteriaSuccess,
    dispatchFailure: getPaymentsDocumentByCriteriaFailure,
  });
}

function* GetPaymentDocumentByIdSaga({ payload }: { payload: any }): any {
  const requestOptions = {
    method: "GET",
  };
  yield apiCallHandler({
    apiPath: `/PaymentsDocuments/DownloadDocumentById?Id=${payload.id}`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: getPaymentsDocumentByIdSuccess,
    dispatchFailure: getPaymentsDocumentByIdFailure,
  });
}

function* PaymentsSaga() {
  yield takeEvery(getPaymentByCriteria, GetPaymentByCriteriaSaga);
  yield takeEvery(getPaymentById, GetPaymentByIdSaga);
  yield takeEvery(PaymentCreate, CreatePaymentSaga);
  yield takeEvery(PaymentValidate, ValidatePaymentSaga);
  yield takeEvery(
    downloadPaymentDocumentByCriteria,
    DownloadPaymentDocumentByCriteriaSaga
  );
  yield takeEvery(downloadPaymentDocumentById, DownloadPaymentDocumentByIdSaga);
  yield takeEvery(
    getAllPaymentsDocumentsByCriteria,
    GetAllPaymentDocumentByCriteriaSaga
  );
  yield takeEvery(
    getPaymentsDocumentByCriteria,
    GetPaymentDocumentByCriteriaSaga
  );
  yield takeEvery(getPaymentsDocumentById, GetPaymentDocumentByIdSaga);
}

export default PaymentsSaga;
