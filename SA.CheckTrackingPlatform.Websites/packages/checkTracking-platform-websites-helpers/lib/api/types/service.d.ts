import { FilterByAllChecks, FilterCriteriaChecks, type FilterCriteriaNotifications, type Notification } from "./domain";
export interface INotificationService {
    getAllNotificationsByCriteria?: (criteria: FilterCriteriaNotifications) => void;
    countAllNotificationsByCriteria?: (criteria: FilterCriteriaNotifications) => void;
    updateNotification?: (notification: Notification) => void;
}
export interface IChecksService {
    getAllChecksByCriteria?: (criteria: FilterCriteriaChecks) => void;
    getAllChecks?: (criteria: FilterByAllChecks) => void;
}
export interface IDetailsChecksService {
    getCheckById?: (Id: string) => void;
}
export interface IStatusService {
    getAllStatus?: () => void;
}
export interface IReasonMoveService {
    AllReasonMoves: (To: any) => void;
}
export interface ITimeLineService {
    CreateTimeLine: (payload: any) => void;
}
