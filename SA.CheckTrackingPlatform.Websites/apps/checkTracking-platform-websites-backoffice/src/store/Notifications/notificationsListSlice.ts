import {
  DataSliceState,
  createDataSlice,
  Notification,
} from '@checkTracking/helpers';

const initialState: DataSliceState<Notification> = {
  responseData: [],
  meta: {
    itemsCount: 0,
    pageCount: 0,
    pageIndex: 1,
    pageSize: 0,
    totalCount: 0,
    unseenCount: 0,
  },
  isLoading: false,
  error: null,
};

export const notificationsListSlice = createDataSlice(
  'notificationsList',
  initialState,
);

export const {
  getAllByCriteria: getAllNotificationsByCriteria,
  callApiSuccess: apiCallNotificationsListSuccess,
  callApiFailure: apiCallNotificationsListFailure,
  defaultEndCallApiSuccess,
} = notificationsListSlice.actions;

export default notificationsListSlice.reducer;
