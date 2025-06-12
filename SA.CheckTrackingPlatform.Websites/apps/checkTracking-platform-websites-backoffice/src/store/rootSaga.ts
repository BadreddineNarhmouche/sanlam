import { all } from "redux-saga/effects";
import notificationsSaga from "./Notifications/notificationsSaga";
import internalRolesSaga from "./InternalRoles/internalRolesSaga";
import ChecksSaga from "./Checks/ChecksSaga";
import StatusSaga from "./Status/StatusSaga";
import DetailsChSaga from "./DetailsCh/DetailsChSaga";
import { watchCreateTimeline } from "./timeline/watchCreateTimeline";

export const rootSaga = function* sagas() {
  yield all([
    notificationsSaga(),
    internalRolesSaga(),
    ChecksSaga(),
    StatusSaga(),
    DetailsChSaga(),
    watchCreateTimeline(),
  ]);
};
