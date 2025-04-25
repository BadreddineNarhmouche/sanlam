import { apiCallHandler, GeneralHelper } from "@checkTracking/helpers";
import { takeEvery } from "redux-saga/effects";
import { WORKFLOW_TYPE_CODES } from "@checkTracking/shared/src/constants/global";

import {
  PUTWorkflowRollBackSuccess,
  PUTWorkflowRollBackFailure,
  WorkflowRollBack,
} from "./WorkflowRollBackSlice";

import {
  apiCallDeliverySlipSuccess,
  apiCallDeliverySlipFailure,
} from "../DeliverySlips/deliverySlipSlice";

import {
  apiCallQuittanceSuccess,
  apiCallQuittanceFailure,
} from "../Quittances/quittanceSlice";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* PUTWorkflowRollBack({ payload }: { payload: any }): any {
  const bodyFormData: any = new FormData();
  GeneralHelper.appendObjectToFormData(payload, bodyFormData);
  const requestOptions = {
    method: "POST",
    body: bodyFormData,
    contentType: "multipart/form-data",
  };

  yield apiCallHandler({
    apiPath: `/Quittances/RollBackWorkflow`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: PUTWorkflowRollBackSuccess,
    dispatchFailure: PUTWorkflowRollBackFailure,
    successCallback: function* () {
      if (payload?.WorkflowTypeCode === WORKFLOW_TYPE_CODES.QUITTANCE) {
        yield apiCallHandler({
          apiPath: `/Quittances/GetById?Id=${payload?.DemandId}`,
          baseApiPath,
          dispatchSuccess: apiCallQuittanceSuccess,
          dispatchFailure: apiCallQuittanceFailure,
        });
      } else {
        yield apiCallHandler({
          apiPath: `/DeliverySlips/GetById?Id=${payload?.DemandId}`,
          baseApiPath,
          dispatchSuccess: apiCallDeliverySlipSuccess,
          dispatchFailure: apiCallDeliverySlipFailure,
        });
      }
    },
  });
}

function* WorkflowSaga() {
  yield takeEvery(WorkflowRollBack, PUTWorkflowRollBack);
}

export default WorkflowSaga;
