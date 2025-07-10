import { combineReducers } from "@reduxjs/toolkit";

//notifications
import notificationsListReducer from "./Notifications/notificationsListSlice";
import notificationsUpdateReducer from "./Notifications/notificationUpdateSlice";
import notificationsCreateReducer from "./Notifications/notificationCreateSlice";
import notificationsCountReducer from "./Notifications/notificationCountSlice";

//internalRoles
import internalRolesReducer from "./InternalRoles/internalRolesSlice";

//Checks
import getAllChecksByCriteriaReducer from "./Checks/getAllChecksByCriteriaSlice";
import getAllChecksReducer from "./Checks/getAllChecksSlice";
import GetCheckByIdReducer from "./Checks/getCheckByIdSlice";

//Status
import AllStatusReducer from "./Status/StatusAllSlice";

// Timelines
import TimelineCreateReducer from "./timeline/TimelineCreateSlice";

//ReasonMove
import AllReasonMoveReducer from "./ReasonMove/ReasonMoveAllSlice";

// KPIs

import CheckTrackingKPIReducer from "./KPIs/CheckTrackingKPISlice";

// Documents

import ExportDocumentKpiExcelSliceReducer from "./KPIs/ExportDocumentKpiExcelSlice";

export const rootReducer = combineReducers({
  notifications: notificationsListReducer,
  notificationsUpdate: notificationsUpdateReducer,
  notificationsCount: notificationsCountReducer,
  notificationsCreate: notificationsCreateReducer,
  internalRoles: internalRolesReducer,
  getAllChecksByCriteria: getAllChecksByCriteriaReducer,
  getAllChecks: getAllChecksReducer,
  AllStatus: AllStatusReducer,
  getCheckById: GetCheckByIdReducer,
  TimelineUpdate: TimelineCreateReducer,
  AllReasonMove: AllReasonMoveReducer,
  CheckTrackingKPI: CheckTrackingKPIReducer,
  ExportDocumentKpiExcel: ExportDocumentKpiExcelSliceReducer,
});
