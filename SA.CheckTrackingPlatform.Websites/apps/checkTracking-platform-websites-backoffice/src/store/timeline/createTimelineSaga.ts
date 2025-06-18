import { apiCallHandler } from "@checkTracking/helpers";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  timelineAnnotationCreate,
  TimelineAnnotationCreateSuccess,
  TimelineAnnotationCreateFailure,
} from "./TimelineCreateSlice";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* createTimelineSaga(
  action: ReturnType<typeof timelineAnnotationCreate>
) {
  try {
    const {
      CheckIds,
      Comment,
      ReasonMoveId,
      Status,
      Date: timelineDate,
      InternalUserElectronicAddress,
    } = action.payload;

    const formData = new FormData();
    CheckIds.forEach((id: number) =>
      formData.append("CheckIds", id.toString())
    );
    formData.append("Status", Status);
    formData.append("Date", timelineDate.toISOString());
    formData.append(
      "InternalUserElectronicAddress",
      InternalUserElectronicAddress
    );

    if (Comment) {
      formData.append("Comment", Comment);
    }
    if (ReasonMoveId !== undefined && ReasonMoveId !== null) {
      formData.append("ReasonMoveId", ReasonMoveId.toString());
    }

    yield call(apiCallHandler, {
      apiPath: `/Timelines/CreateTimeLine`,
      baseApiPath,
      requestOptions: {
        method: "POST",
        body: formData,
      },
      dispatchSuccess: TimelineAnnotationCreateSuccess,
      dispatchFailure: TimelineAnnotationCreateFailure,
    });
  } catch (error: any) {
    yield put(TimelineAnnotationCreateFailure(error));
  }
}

export function* watchCreateTimeline() {
  yield takeEvery(timelineAnnotationCreate.type, createTimelineSaga);
}
