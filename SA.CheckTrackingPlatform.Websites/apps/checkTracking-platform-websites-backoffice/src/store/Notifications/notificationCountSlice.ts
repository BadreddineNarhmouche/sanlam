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

export const notificationCountSlice = createDataSlice(
    'notificationsCount',
    initialState,
);

export const {
    getAllByCriteria: countAllNotificationsByCriteria,
    callApiSuccess: apiCallCountNotificationsSuccess,
    callApiFailure: apiCallCountNotificationsFailure,
    defaultEndCallApiSuccess,
} = notificationCountSlice.actions;

export default notificationCountSlice.reducer;
