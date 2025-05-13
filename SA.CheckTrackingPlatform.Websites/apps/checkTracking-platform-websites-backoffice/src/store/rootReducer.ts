import { combineReducers } from "@reduxjs/toolkit";

import notificationsListReducer from "./Notifications/notificationsListSlice";
import notificationsUpdateReducer from "./Notifications/notificationUpdateSlice";
import notificationsCreateReducer from "./Notifications/notificationCreateSlice";
import notificationsCountReducer from "./Notifications/notificationCountSlice";

import internalRolesReducer from "./InternalRoles/internalRolesSlice";

import getAllChecksReducer from "./Checks/getAllChecksSlice";

import AllStatusReducer from "./Status/StatusAllSlice";

import getcheksbyIdReducer from "./DetailsCh/getByIdChecksSlice";

export const rootReducer = combineReducers({
  notifications: notificationsListReducer,
  notificationsUpdate: notificationsUpdateReducer,
  notificationsCount: notificationsCountReducer,
  notificationsCreate: notificationsCreateReducer,
  internalRoles: internalRolesReducer,
  getAllChecks: getAllChecksReducer,
  AllStatus: AllStatusReducer,
  getCheckById: getcheksbyIdReducer,
});
