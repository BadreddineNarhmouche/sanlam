import { all } from "redux-saga/effects";
import notificationsSaga from "./Notifications/notificationsSaga";
import internalRolesSaga from "./InternalRoles/internalRolesSaga";
import ChecksSaga from "./Checks/ChecksSaga";

export const rootSaga = function* sagas() {
  yield all([notificationsSaga(), internalRolesSaga(), ChecksSaga()]);
};
