import {
  DataSliceState,
  createDataSlice,
  Notification,
} from '@reinsurance/helpers';

const initialState: DataSliceState<Notification> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const notificationCreateSlice = createDataSlice(
  'notificationCreate',
  initialState,
);

export const {
  create: createNotification,
  callApiSuccess: apiCallCreateNotificationSuccess,
  callApiFailure: apiCallCreateNotificationFailure,
  defaultEndCallApiSuccess,
} = notificationCreateSlice.actions;

export default notificationCreateSlice.reducer;
