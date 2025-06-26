import { apiCallHandler, GeneralHelper } from "@checkTracking/helpers";
import { takeEvery } from "redux-saga/effects";
import {
  CreateTimeline,
  TimelineCreatedSuccess,
  TimelineCreatedFailure,
} from "./TimelineCreateSlice";
import {
  apiCallGetAllChecksFailure,
  apiCallGetAllChecksSuccess,
} from "../DetailsCh/getByIdChecksSlice";
import { mapAllChecksList } from "../Checks/mapper";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* CreateTimelineFunction({ payload }: { payload: any }) {
  const bodyFormData: any = new FormData();
  GeneralHelper.appendObjectToFormData(payload, bodyFormData);

  const requestOptions = {
    method: "POST",
    body: bodyFormData,
    contentType: "multipart/form-data",
  };

  yield apiCallHandler({
    apiPath: `/Timelines/CreateTimeLine`,
    baseApiPath,
    requestOptions,
    dispatchSuccess: TimelineCreatedSuccess,
    dispatchFailure: TimelineCreatedFailure,

    successCallback: function* () {
      yield apiCallHandler({
        apiPath: `/Checkes/GetAllChecks?status=${payload.StatusNow}`,
        baseApiPath,
        dispatchSuccess: apiCallGetAllChecksSuccess,
        dispatchFailure: apiCallGetAllChecksFailure,
        mapper: mapAllChecksList,
      });
    },
  });
}

export function* watchCreateTimeline() {
  yield takeEvery(CreateTimeline, CreateTimelineFunction);
}
