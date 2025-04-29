import {
  DataSliceState,
  createDataSlice,
  Notification,
} from '@checkTracking/helpers';

const initialState: DataSliceState<Notification> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const notificationUpdateSlice = createDataSlice(
  'notificationUpdate',
  initialState,
);

export const {
  update: updateNotification,
  callApiSuccess: apiCallUpdateNotificationSuccess,
  callApiFailure: apiCallUpdateNotificationFailure,
  defaultEndCallApiSuccess,
} = notificationUpdateSlice.actions;

export default notificationUpdateSlice.reducer;
