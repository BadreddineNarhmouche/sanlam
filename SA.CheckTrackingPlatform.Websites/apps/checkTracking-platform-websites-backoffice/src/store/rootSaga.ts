import { all } from "redux-saga/effects";
import notificationsSaga from "./Notifications/notificationsSaga";
import internalRolesSaga from "./InternalRoles/internalRolesSaga";

export const rootSaga = function* sagas() {
  yield all([notificationsSaga(), internalRolesSaga()]);
};
