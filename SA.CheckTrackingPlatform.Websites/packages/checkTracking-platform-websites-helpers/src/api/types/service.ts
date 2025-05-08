import { RotateDirection } from "@react-pdf-viewer/core";
import {
  FilterCriteriaChecks,
  type FilterCriteriaNotifications,
  type Notification,
} from "./domain";

export interface INotificationService {
  getAllNotificationsByCriteria?: (
    criteria: FilterCriteriaNotifications
  ) => void;
  countAllNotificationsByCriteria?: (
    criteria: FilterCriteriaNotifications
  ) => void;
  updateNotification?: (notification: Notification) => void;
}

export interface IChecksService {
  getAllChecksByCriteria?: (criteria: FilterCriteriaChecks) => void;
}

export interface IDetailsChecksService {
  getCheckById?: (criteria: FilterCriteriaChecks) => void;
}

export interface IStatusService {
  getAllStatus?: () => void;
}
