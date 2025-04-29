import { RotateDirection } from "@react-pdf-viewer/core";
import {
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
