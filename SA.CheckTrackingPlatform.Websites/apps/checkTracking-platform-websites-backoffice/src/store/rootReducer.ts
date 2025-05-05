import { combineReducers } from "@reduxjs/toolkit";

//notifications
import notificationsListReducer from "./Notifications/notificationsListSlice";
import notificationsUpdateReducer from "./Notifications/notificationUpdateSlice";
import notificationsCreateReducer from "./Notifications/notificationCreateSlice";
import notificationsCountReducer from "./Notifications/notificationCountSlice";

//internalRoles
import internalRolesReducer from "./InternalRoles/internalRolesSlice";

export const rootReducer = combineReducers({
  notifications: notificationsListReducer,
  notificationsUpdate: notificationsUpdateReducer,
  notificationsCount: notificationsCountReducer,
  notificationsCreate: notificationsCreateReducer,
  internalRoles: internalRolesReducer,
});
