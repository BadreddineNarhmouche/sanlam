import {
  FilterCriteriaQuittances,
  TreatSubscriptionQuittanceItem,
  ValidateSubscriptionQuittanceItem,
  TreatRecoveryQuittanceItem,
  ValidateRecoveryQuittanceItem,
  PAGINATION,
  apiCallHandler,
  GeneralHelper,
} from "@checkTracking/helpers";
import { takeEvery, put } from "redux-saga/effects";
import {
  mapSubscriptionPoliciesList,
  mapRecoveryQuittancesList,
  mapReinsurancePoliciesList,
  mapAccountingPoliciesList,
  // mapReinsurerList,
} from "./mapper";
import store from "../store";

import {
  apiCallSubscriptionQuittancesListSuccess,
  apiCallSubscriptionQuittancesListFailure,
  getAllSubscriptionQuittancesByCriteria,
} from "./quittancesSubscriptionListSlice";

import {
  getAllOtherQuittancesByCriteria,
  apiCallOtherQuittancesListSuccess,
  apiCallOtherQuittancesListFailure,
} from "./quittancesOtherListSlice";

import {
  apiCallRecoveryQuittancesListSuccess,
  apiCallRecoveryQuittancesListFailure,
  getAllRecoveryQuittancesByCriteria,
} from "./quittancesRecoveryListSlice";

import {
  apiCallReinsuranceQuittancesListSuccess,
  apiCallReinsuranceQuittancesListFailure,
  getAllReinsuranceQuittancesByCriteria,
} from "./quittancesReinsuranceListSlice";

import {
  apiCallAccountingQuittancesListSuccess,
  apiCallAccountingQuittancesListFailure,
  getAllAccountingQuittancesByCriteria,
} from "./quittancesAccountingListSlice";

import {
  apiCallQuittanceSuccess,
  apiCallQuittanceFailure,
  getQuittanceById,
} from "./quittanceSlice";

import {
  treatSubscriptionQuittance,
  apiCallTreatSubscriptionQuittanceFailure,
  apiCallTreatSubscriptionQuittanceSuccess,
} from "./quittanceTreatSubscriptionSlice";

import {
  validateSubscriptionQuittance,
  apiCallValidateSubscriptionQuittanceFailure,
  apiCallValidateSubscriptionQuittanceSuccess,
} from "./quittanceValidateSubscriptionSlice";

import {
  treatRecoveryQuittance,
  apiCallTreatRecoveryQuittanceFailure,
  apiCallTreatRecoveryQuittanceSuccess,
} from "./quittanceTreatRecoverySlice";

import {
  validateRecoveryQuittance,
  apiCallValidateRecoveryQuittanceFailure,
  apiCallValidateRecoveryQuittanceSuccess,
} from "./quittanceValidateRecoverySlice";

import {
  getQuittanceDocumentById,
  getQuittanceDocumentByIdFailure,
  getQuittanceDocumentByIdSuccess,
} from "./quittanceGetDocumentByIdSlice";

import {
  downloadQuittanceDocumentById,
  downloadQuittanceDocumentByIdFailure,
  downloadQuittanceDocumentByIdSuccess,
} from "./quittanceDownloadDocumentByIdSlice";

import {
  getQuittanceDocumentByCriteria,
  getQuittanceDocumentByCriteriaFailure,
  getQuittanceDocumentByCriteriaSuccess,
} from "./quittanceGetDocumentByCriteriaSlice";

import {
  getQuittancePaymentByQuittanceId,
  getQuittancePaymentByQuittanceIdFailure,
  getQuittancePaymentByQuittanceIdSuccess,
} from "./quittanceGetPaymentByIdSlice";

import {
  downloadQuittanceDocumentByCriteria,
  downloadQuittanceDocumentByCriteriaFailure,
  downloadQuittanceDocumentByCriteriaSuccess,
} from "./quittanceDownloadDocumentByCriteriaSlice";

import {
  getAllQuittanceDocumentsByCriteria,
  getAllQuittanceDocumentsByCriteriaFailure,
  getAllQuittanceDocumentsByCriteriaSuccess,
} from "./quittanceGetAllDocumentsByCriteriaSlice";

import {
  submitDocumentsQuittance,
  apiCallSubmitDocumentsQuittanceFailure,
  apiCallSubmitDocumentsQuittanceSuccess,
} from "./quittanceSubmitDocumentsSlice";

import {
  quittanceAnnotationByAll,
  QuittanceAnnotationByAllSuccess,
  QuittanceAnnotationByAllFailure,
} from "./quittanceAnnotationByAllSlice";

import {
  quittanceStatusCIOL,
  QuittanceStatusCIOLSuccess,
  QuittanceStatusCIOLFailure,
} from "./quittanceStatusCIOLSlice";

import {
  quittanceAnnotationCreate,
  QuittanceAnnotationCreateSuccess,
  QuittanceAnnotationCreateFailure,
} from "./quittanceAnnotationCreateSlice";

import {
  reinsurerAll,
  reinsurerSuccess,
  reinsurerFailure,
} from "./reinsurerSlice";

import {
  exportAllQuittance,
  exportAllQuittanceSuccess,
  exportAllQuittanceFailure,
} from "./exportAllQuittanceSlice";

import {
  quittanceStatusByAll,
  quittanceStatusByAllSuccess,
  quittanceStatusByAllFailure,
} from "./quittanceStatusByAllSlice";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* GetAllSubscriptionQuittancesByCriteriaSaga({
  payload,
}: {
  payload: FilterCriteriaQuittances;
}): any {
  const pageIndex = payload.meta?.pageIndex || 1;
  const pageSize = payload.meta?.pageSize || PAGINATION.PAGE_SIZE;

  yield apiCallHandler({
    apiPath: `/Quittances/GetAllByCriteria?ExternalPolicyReference=${payload.policyReference}&WorkFlowStepCode=${payload.workFlowStepCode}&ExternalQuittanceReference=${payload.reference}&ExternalCiolStatusCode=${payload.quittanceStatusId}&ExternalPartnerUserCode=${payload.externalPartnerUserCode}&ExternalReinsuranceReference=${payload.externalReinsuranceReference}&PrimeNetMin=${payload.primeNetMin}&PrimeNetMax=${payload.primeNetMax}&pageIndex=${pageIndex}&pageSize=${pageSize}&CalculateTotalCount=true`,
    baseApiPath,
    dispatchSuccess: apiCallSubscriptionQuittancesListSuccess,
    dispatchFailure: apiCallSubscriptionQuittancesListFailure,
    mapper: mapSubscriptionPoliciesList,
  });
}

function* GetAllOtherQuittancesByCriteriaSaga({
  payload,
}: {
  payload: FilterCriteriaQuittances;
}): any {
  const pageIndex = payload.meta?.pageIndex || 1;
  const pageSize = payload.meta?.pageSize || PAGINATION.PAGE_SIZE;

  yield apiCallHandler({
    apiPath: `/Quittances/GetAllByCriteria?ExternalPolicyReference=${payload.policyReference}&WorkFlowStepCode=${payload.workFlowStepCode}&ExternalQuittanceReference=${payload.reference}&PublicQuittanceStatusCode=${payload.quittanceStatusId}&ExternalPartnerUserCode=${payload.externalPartnerUserCode}&ExternalReinsuranceReference=${payload.externalReinsuranceReference}&PrimeNetMin=${payload.primeNetMin}&PrimeNetMax=${payload.primeNetMax}&pageIndex=${pageIndex}&pageSize=${pageSize}&CalculateTotalCount=true`,
    baseApiPath,
    dispatchSuccess: apiCallOtherQuittancesListSuccess,
    dispatchFailure: apiCallOtherQuittancesListFailure,
    mapper: mapSubscriptionPoliciesList,
  });
}

function* GetAllRecoveryQuittancesByCriteriaSaga({
  payload,
}: {
  payload: FilterCriteriaQuittances;
}): any {
  const pageIndex = payload.meta?.pageIndex || 1;
  const pageSize = payload.meta?.pageSize || PAGINATION.PAGE_SIZE;

  yield apiCallHandler({
    apiPath: `/Quittances/GetAllByCriteria?ExternalPolicyReference=${payload.policyReference}&WorkFlowStepCode=${payload.workFlowStepCode}&ExternalQuittanceReference=${payload.reference}&ExternalClientName=${payload.externalClientName}&ExternalCiolStatusCode=${payload.quittanceStatusId}&ExternalPartnerUserCode=${payload.externalPartnerUserCode}&DateCreation=${payload.dateCreation}&ExternalReinsuranceReference=${payload.externalReinsuranceReference}&pageIndex=${pageIndex}&pageSize=${pageSize}&CalculateTotalCount=true`,
    baseApiPath,
    dispatchSuccess: apiCallRecoveryQuittancesListSuccess,
    dispatchFailure: apiCallRecoveryQuittancesListFailure,
    mapper: mapRecoveryQuittancesList,
  });
}

function* GetAllAccountingQuittancesByCriteriaSaga({
  payload,
}: {
  payload: FilterCriteriaQuittances;
}): any {
  const pageIndex = payload.meta?.pageIndex || 1;
  const pageSize = payload.meta?.pageSize || PAGINATION.PAGE_SIZE;

  yield apiCallHandler({
    apiPath: `/Quittances/GetAllByCriteria?ExternalPolicyReference=${payload.policyReference}&WorkFlowStepCode=${payload.workFlowStepCode}&ExternalQuittanceReference=${payload.reference}&ExternalCiolStatusCode=${payload.quittanceStatusId}&ExternalClientName=${payload.externalClientName}&ExternalReinsuranceReference=${payload.externalReinsuranceReference}&pageIndex=${pageIndex}&pageSize=${pageSize}&CalculateTotalCount=true`,
    baseApiPath,
    dispatchSuccess: apiCallAccountingQuittancesListSuccess,
    dispatchFailure: apiCallAccountingQuittancesListFailure,
    mapper: mapAccountingPoliciesList,
  });
}

function* GetAllReinsuranceQuittancesByCriteriaSaga({
  payload,
}: {
  payload: FilterCriteriaQuittances;
}): any {
  const pageIndex = payload.meta?.pageIndex || 1;
  const pageSize = payload.meta?.pageSize || PAGINATION.PAGE_SIZE;

  yield apiCallHandler({
    apiPath: `/Quittances/GetAllByCriteria?ExternalPolicyReference=${payload.policyReference}&WorkFlowStepCode=${payload.workFlowStepCode}&ExternalQuittanceReference=${payload.reference}&ExternalCiolStatusCode=${payload.quittanceStatusId}&ExternalClientName=${payload.externalClientName}&ExternalReinsuranceReference=${payload.externalReinsuranceReference}&pageIndex=${pageIndex}&pageSize=${pageSize}&CalculateTotalCount=true`,
    baseApiPath,
    dispatchSuccess: apiCallReinsuranceQuittancesListSuccess,
    dispatchFailure: apiCallReinsuranceQuittancesListFailure,
    mapper: mapReinsurancePoliciesList,
  });
}

function* getQuittanceByIdSaga({ payload }: { payload: string }): any {
  let apiPath = isNumber(payload)
    ? `/Quittances/GetById?Id=${payload}`
    : `/Quittances/GetById?Id=1&PolicyReference=${payload}`;
  yield apiCallHandler({
    apiPath: apiPath,
    baseApiPath,
    dispatchSuccess: apiCallQuittanceSuccess,
    dispatchFailure: apiCallQuittanceFailure,
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

function* TreatSubscriptionQuittanceSaga({
  payload,
}: {
  payload: TreatSubscriptionQuittanceItem;
}): any {
  const bodyFormData: any = new FormData();
  GeneralHelper.appendObjectToFormData(payload, bodyFormData);

  const requestOptions = {
    method: "POST",
    body: bodyFormData,
    contentType: "multipart/form-data",
  };

  yield apiCallHandler({
    apiPath: `/Quittances/TreatSubscription`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: apiCallTreatSubscriptionQuittanceSuccess,
    dispatchFailure: apiCallTreatSubscriptionQuittanceFailure,
    successCallback: function* () {
      yield apiCallHandler({
        apiPath: `/Quittances/GetById?Id=${payload.quittanceId}`,
        baseApiPath,
        dispatchSuccess: apiCallQuittanceSuccess,
        dispatchFailure: apiCallQuittanceFailure,
      });
    },
  });
}

function* ValidateSubscriptionQuittanceSaga({
  payload,
}: {
  payload: ValidateSubscriptionQuittanceItem;
}): any {
  const bodyFormData: any = new FormData();

  GeneralHelper.appendObjectToFormData(payload, bodyFormData);

  const requestOptions = {
    method: "POST",
    body: bodyFormData,
    contentType: "multipart/form-data",
  };

  yield apiCallHandler({
    apiPath: `/Quittances/ValidateSubscription`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: apiCallValidateSubscriptionQuittanceSuccess,
    dispatchFailure: apiCallValidateSubscriptionQuittanceFailure,
    successCallback: function* () {
      yield apiCallHandler({
        apiPath: `/Quittances/GetById?Id=${payload.quittanceId}`,
        baseApiPath,
        dispatchSuccess: apiCallQuittanceSuccess,
        dispatchFailure: apiCallQuittanceFailure,
      });
    },
  });
}

function* TreatRecoveryQuittanceSaga({
  payload,
}: {
  payload: TreatRecoveryQuittanceItem;
}): any {
  const bodyFormData: any = new FormData();
  GeneralHelper.appendObjectToFormData(payload, bodyFormData);

  const requestOptions = {
    method: "POST",
    body: bodyFormData,
    contentType: "multipart/form-data",
  };

  yield apiCallHandler({
    apiPath: `/Quittances/TreatRecovery`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: apiCallTreatRecoveryQuittanceSuccess,
    dispatchFailure: apiCallTreatRecoveryQuittanceFailure,
    successCallback: function* () {
      yield apiCallHandler({
        apiPath: `/Quittances/GetById?Id=${payload.quittanceId}`,
        baseApiPath,
        dispatchSuccess: apiCallQuittanceSuccess,
        dispatchFailure: apiCallQuittanceFailure,
      });
    },
  });
}

function* ValidateRecoveryQuittanceSaga({
  payload,
}: {
  payload: ValidateRecoveryQuittanceItem;
}): any {
  const bodyFormData: any = new FormData();

  GeneralHelper.appendObjectToFormData(payload, bodyFormData);

  const requestOptions = {
    method: "POST",
    body: bodyFormData,
    contentType: "multipart/form-data",
  };

  yield apiCallHandler({
    apiPath: `/Quittances/ValidateRecovery`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: apiCallValidateRecoveryQuittanceSuccess,
    dispatchFailure: apiCallValidateRecoveryQuittanceFailure,
    successCallback: function* () {
      yield apiCallHandler({
        apiPath: `/Quittances/GetById?Id=${payload.quittanceId}`,
        baseApiPath,
        dispatchSuccess: apiCallQuittanceSuccess,
        dispatchFailure: apiCallQuittanceFailure,
      });
    },
  });
}

function* GetQuittanceDocumentByIdSaga({ payload }: { payload: any }): any {
  const requestOptions = {
    method: "GET",
  };
  yield apiCallHandler({
    apiPath: `/QuittanceDocuments/DownloadDocumentById?Id=${payload.id}`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: getQuittanceDocumentByIdSuccess,
    dispatchFailure: getQuittanceDocumentByIdFailure,
  });
}

function* DownloadQuittanceDocumentByIdSaga({
  payload,
}: {
  payload: any;
}): any {
  const requestOptions = {
    method: "GET",
  };
  yield apiCallHandler({
    apiPath: `/QuittanceDocuments/DownloadDocumentById?Id=${payload.id}`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: downloadQuittanceDocumentByIdSuccess,
    dispatchFailure: downloadQuittanceDocumentByIdFailure,
    successCallback: function* () {
      const state = store.getState();
      const data = state?.quittanceDownloadDocumentById?.responseData;
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
        yield put({ type: "quittanceDownloadDocumentById/callApiFailure" });
      }
    },
  });
}

function* GetQuittanceDocumentByCriteriaSaga({
  payload,
}: {
  payload: any;
}): any {
  const requestOptions = {
    method: "GET",
  };
  yield apiCallHandler({
    apiPath: `/QuittanceDocuments/DownloadDocumentByCriteria?QuittanceId=${payload.quittanceId}&DocumentTypeCode=${payload.documentTypeCode}`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: getQuittanceDocumentByCriteriaSuccess,
    dispatchFailure: getQuittanceDocumentByCriteriaFailure,
  });
}

function* GetQuittancePaymentByQuittanceIdSaga({
  payload,
}: {
  payload: any;
}): any {
  const requestOptions = {
    method: "GET",
  };
  yield apiCallHandler({
    apiPath: `/QuittancePayments/GetByQuittanceId?QuittanceId=${payload}`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: getQuittancePaymentByQuittanceIdSuccess,
    dispatchFailure: getQuittancePaymentByQuittanceIdFailure,
  });
}

function* DownloadQuittanceDocumentByCriteriaSaga({
  payload,
}: {
  payload: any;
}): any {
  const requestOptions = {
    method: "GET",
  };
  yield apiCallHandler({
    apiPath: `/QuittanceDocuments/DownloadDocumentByCriteria?QuittanceId=${payload.quittanceId}&DocumentTypeCode=${payload.documentTypeCode}`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: downloadQuittanceDocumentByCriteriaSuccess,
    dispatchFailure: downloadQuittanceDocumentByCriteriaFailure,
    successCallback: function* () {
      const state = store.getState();
      const data = state?.quittanceDownloadDocumentByCriteria?.responseData;
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
          type: "quittanceDownloadDocumentByCriteria/callApiFailure",
        });
      }
    },
  });
}

function* GetAllQuittanceDocumentByCriteriaSaga({
  payload,
}: {
  payload: any;
}): any {
  const requestOptions = {
    method: "GET",
  };
  let url = "";
  if (typeof payload.quittanceId != "string") {
    payload.quittanceId.forEach((element: any, index: number) => {
      if (index > 0) {
        url += "&";
      }
      url += `QuittanceId=${element}`;
    });
  } else {
    url += `QuittanceId=${payload.quittanceId}`;
  }

  yield apiCallHandler({
    apiPath: `/QuittanceDocuments/GetAllDocumentsByCriteria?${url}`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: getAllQuittanceDocumentsByCriteriaSuccess,
    dispatchFailure: getAllQuittanceDocumentsByCriteriaFailure,
  });
}

function* SubmitQuittanceDocumentsSaga({
  payload,
}: {
  payload: { quittanceId: string; documents: any };
}): any {
  const bodyFormData: any = new FormData();
  GeneralHelper.appendObjectToFormData(payload, bodyFormData);

  const requestOptions = {
    method: "POST",
    body: bodyFormData,
    contentType: "multipart/form-data",
  };

  yield apiCallHandler({
    apiPath: `/QuittanceDocuments/Submit`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: apiCallSubmitDocumentsQuittanceSuccess,
    dispatchFailure: apiCallSubmitDocumentsQuittanceFailure,
    successCallback: function* () {
      yield apiCallHandler({
        apiPath: `/QuittanceDocuments/GetAllDocumentsByCriteria?QuittanceId=${payload.quittanceId}`,
        baseApiPath,
        dispatchSuccess: getAllQuittanceDocumentsByCriteriaSuccess,
        dispatchFailure: getAllQuittanceDocumentsByCriteriaFailure,
      });
    },
  });
}

function* getQuittanceAnnotationByAllSaga({ payload }: { payload: any }): any {
  let apiPath = "/QuittanceAnnotations/GetAll";
  yield apiCallHandler({
    apiPath: apiPath,
    baseApiPath,
    dispatchSuccess: QuittanceAnnotationByAllSuccess,
    dispatchFailure: QuittanceAnnotationByAllFailure,
  });
}

function* getQuittanceStatusCIOLSaga({ payload }: { payload: any }): any {
  let apiPath = "/StatusCIOL/GetAll";
  yield apiCallHandler({
    apiPath: apiPath,
    baseApiPath,
    dispatchSuccess: QuittanceStatusCIOLSuccess,
    dispatchFailure: QuittanceStatusCIOLFailure,
  });
}

function* CreateQuittanceAnnotationHistorySaga({
  payload,
}: {
  payload: {
    QuittanceId: number;
    QuittanceAnnotationHistoryId: number;
    DateQuittanceAnnotation: Date;
  };
}): any {
  const bodyFormData: any = new FormData();
  GeneralHelper.appendObjectToFormData(payload, bodyFormData);

  const requestOptions = {
    method: "POST",
    body: bodyFormData,
    contentType: "multipart/form-data",
  };

  yield apiCallHandler({
    apiPath: `/QuittanceAnnotations/CreateHistoryAnnotation`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: QuittanceAnnotationCreateSuccess,
    dispatchFailure: QuittanceAnnotationCreateFailure,
    successCallback: function* () {
      yield apiCallHandler({
        apiPath: `/Quittances/GetAllByCriteria?WorkFlowStepCode=Recoveries&pageIndex=1&pageSize=10&CalculateTotalCount=true`,
        baseApiPath,
        dispatchSuccess: apiCallRecoveryQuittancesListSuccess,
        dispatchFailure: apiCallRecoveryQuittancesListFailure,
        mapper: mapRecoveryQuittancesList,
      });
    },
  });
}

function* GetAllReinsurerSaga({ payload }: { payload: any }): any {
  let apiPath = "/Reinsurer/GetAll";
  yield apiCallHandler({
    apiPath: apiPath,
    baseApiPath,
    dispatchSuccess: reinsurerSuccess,
    dispatchFailure: reinsurerFailure,
  });
}

function* ExportAllQuittanceSaga({ payload }: { payload: any }): any {
  const requestOptions = {
    method: "GET",
  };
  yield apiCallHandler({
    apiPath: `/Quittances/ExportAllQuittance?FromCreationDate=${payload.fromCreationDate}&ToCreationDate=${payload.toCreationDate}`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: exportAllQuittanceSuccess,
    dispatchFailure: exportAllQuittanceFailure,
    successCallback: function* () {
      const state = store.getState();
      const data = state?.exportAllQuittance?.responseData;
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
          type: "exportAllQuittance/callApiFailure",
        });
      }
    },
  });
}

function* getQuittanceStatusByAllSaga({ payload }: { payload: any }): any {
  let apiPath = `/QuittanceStatuses/GetAll?isHide=${payload.isHide}`;
  yield apiCallHandler({
    apiPath: apiPath,
    baseApiPath,
    dispatchSuccess: quittanceStatusByAllSuccess,
    dispatchFailure: quittanceStatusByAllFailure,
  });
}

function* quittancesSaga() {
  yield takeEvery(
    getAllSubscriptionQuittancesByCriteria,
    GetAllSubscriptionQuittancesByCriteriaSaga
  );
  yield takeEvery(
    getAllOtherQuittancesByCriteria,
    GetAllOtherQuittancesByCriteriaSaga
  );
  yield takeEvery(
    getAllRecoveryQuittancesByCriteria,
    GetAllRecoveryQuittancesByCriteriaSaga
  );
  yield takeEvery(
    getAllReinsuranceQuittancesByCriteria,
    GetAllReinsuranceQuittancesByCriteriaSaga
  );
  yield takeEvery(
    getAllAccountingQuittancesByCriteria,
    GetAllAccountingQuittancesByCriteriaSaga
  );
  yield takeEvery(getQuittanceById, getQuittanceByIdSaga);
  yield takeEvery(treatSubscriptionQuittance, TreatSubscriptionQuittanceSaga);
  yield takeEvery(
    validateSubscriptionQuittance,
    ValidateSubscriptionQuittanceSaga
  );
  yield takeEvery(treatRecoveryQuittance, TreatRecoveryQuittanceSaga);
  yield takeEvery(validateRecoveryQuittance, ValidateRecoveryQuittanceSaga);
  yield takeEvery(getQuittanceDocumentById, GetQuittanceDocumentByIdSaga);
  yield takeEvery(
    downloadQuittanceDocumentById,
    DownloadQuittanceDocumentByIdSaga
  );
  yield takeEvery(
    getQuittanceDocumentByCriteria,
    GetQuittanceDocumentByCriteriaSaga
  );
  yield takeEvery(
    downloadQuittanceDocumentByCriteria,
    DownloadQuittanceDocumentByCriteriaSaga
  );
  yield takeEvery(
    getQuittancePaymentByQuittanceId,
    GetQuittancePaymentByQuittanceIdSaga
  );
  yield takeEvery(
    getAllQuittanceDocumentsByCriteria,
    GetAllQuittanceDocumentByCriteriaSaga
  );
  yield takeEvery(submitDocumentsQuittance, SubmitQuittanceDocumentsSaga);
  yield takeEvery(quittanceAnnotationByAll, getQuittanceAnnotationByAllSaga);
  yield takeEvery(quittanceStatusCIOL, getQuittanceStatusCIOLSaga);
  yield takeEvery(
    quittanceAnnotationCreate,
    CreateQuittanceAnnotationHistorySaga
  );

  yield takeEvery(reinsurerAll, GetAllReinsurerSaga);
  yield takeEvery(exportAllQuittance, ExportAllQuittanceSaga);
  yield takeEvery(quittanceStatusByAll, getQuittanceStatusByAllSaga);
}

export default quittancesSaga;
