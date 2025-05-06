import { FilterCriteriaChecks, type FilterCriteriaNotifications, type Notification } from "./domain";
export interface INotificationService {
    getAllNotificationsByCriteria?: (criteria: FilterCriteriaNotifications) => void;
    countAllNotificationsByCriteria?: (criteria: FilterCriteriaNotifications) => void;
    updateNotification?: (notification: Notification) => void;
}
export interface IChecksService {
    getAllChecksByCriteria?: (criteria: FilterCriteriaChecks) => void;
}
