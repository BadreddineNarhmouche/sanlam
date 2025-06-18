import { apiCallHandler } from "@checkTracking/helpers";
import { takeEvery, call, put } from "redux-saga/effects";
import { PAGINATION } from "@checkTracking/helpers";
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
      Date: DateQuittanceAnnotation,
    } = action.payload;

    const formData = new FormData();
    CheckIds.forEach((id: number) =>
      formData.append("CheckIds", id.toString())
    );
    formData.append("Status", Status);
    if (Comment) {
      formData.append("Comment", Comment);
    }
    if (ReasonMoveId !== undefined && ReasonMoveId !== null) {
      formData.append("ReasonMoveId", ReasonMoveId.toString());
    }

    formData.append("Date", DateQuittanceAnnotation.toISOString());

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    yield call(apiCallHandler, {
      apiPath: `/Timelines/CreateTimeLine`,
      baseApiPath,
      requestOptions,
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
