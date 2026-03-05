import { apiCallHandler, GeneralHelper, UserService } from "@checkTracking/helpers";
import { call, takeEvery } from "redux-saga/effects";
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
import {
  devMockChecks,
  devMockTimelineResponse,
  isDevelopmentOffline,
} from "../devMocks";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* CreateTimelineFunction({ payload }: { payload: any }): any {
  const internalUser = yield call(UserService.getCurrentInternalUser);
  const bodyFormData: any = new FormData();
  GeneralHelper.appendObjectToFormData(
    {
      ...payload,
      InternalUserElectronicAddress:
        payload?.InternalUserElectronicAddress || internalUser?.electronicAddress || "",
    },
    bodyFormData
  );

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
    offlineMode: isDevelopmentOffline,
    offlineCall: () => devMockTimelineResponse,

    successCallback: function* () {
      yield apiCallHandler({
        apiPath: `/Checkes/GetAllChecks?status=${payload.StatusNow}`,
        baseApiPath,
        dispatchSuccess: apiCallGetAllChecksSuccess,
        dispatchFailure: apiCallGetAllChecksFailure,
        mapper: mapAllChecksList,
        offlineMode: isDevelopmentOffline,
        offlineCall: () => devMockChecks,
      });
    },
  });
}

export function* watchCreateTimeline() {
  yield takeEvery(CreateTimeline, CreateTimelineFunction);
}
