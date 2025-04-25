import {
    FilterCriteriaNotifications,
    Notification,
    PAGINATION,
    apiCallHandler,
} from '@checkTracking/helpers';
import { takeEvery } from 'redux-saga/effects';
import { mapNotificationsList } from './mapper';

import {
    countAllNotificationsByCriteria,
    apiCallCountNotificationsFailure,
    apiCallCountNotificationsSuccess,
} from './notificationCountSlice';
import {
    updateNotification,
    apiCallUpdateNotificationFailure,
    apiCallUpdateNotificationSuccess,
} from './notificationUpdateSlice';
import {
    apiCallNotificationsListFailure,
    apiCallNotificationsListSuccess,
    getAllNotificationsByCriteria,
} from './notificationsListSlice';
import {
    createNotification,
    apiCallCreateNotificationFailure,
    apiCallCreateNotificationSuccess,
} from './notificationCreateSlice';

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* GetAllNotificationsByCriteriaSaga({
    payload,
}: {
    payload: FilterCriteriaNotifications;
}): any {
    const { isSeen, internalUserId, meta } = payload;
    const PageIndex = meta?.pageIndex || 1;
    const pageSize = meta?.pageSize || PAGINATION.PAGE_SIZE;

    yield apiCallHandler({
        apiPath: `/Notifications/GetAllByCriteria?internalUserId=${internalUserId}&isSeen=${isSeen}&pageIndex=${PageIndex}&pageSize=${pageSize}&CalculateTotalCount=true`,
        baseApiPath,
        dispatchSuccess: apiCallNotificationsListSuccess,
        dispatchFailure: apiCallNotificationsListFailure,
        mapper: mapNotificationsList,
    });
}

function* CountAllNotificationsByCriteriaSaga({
    payload,
}: {
    payload: FilterCriteriaNotifications;
}): any {
    const { internalUserId } = payload;
    yield apiCallHandler({
        apiPath: `/Notifications/CountAllByCriteria?internalUserId=${internalUserId}&isSeen=false`,
        baseApiPath,
        dispatchSuccess: apiCallCountNotificationsSuccess,
        dispatchFailure: apiCallCountNotificationsFailure,
    });
}

function* UpdateNotificationSaga({ payload }: { payload: Notification }): any {
    const { internalUserId } = payload;
    const requestOptions = {
        method: 'PUT',
        body: payload,
    };

    yield apiCallHandler({
        apiPath: `/Notifications/Update`,
        baseApiPath,
        requestOptions,
        dispatchSuccess: apiCallUpdateNotificationSuccess,
        dispatchFailure: apiCallUpdateNotificationFailure,
        successCallback: function* () {
            yield apiCallHandler({
                apiPath: `/Notifications/CountAllByCriteria?internalUserId=${internalUserId}&isSeen=false`,
                baseApiPath,
                dispatchSuccess: apiCallCountNotificationsSuccess,
                dispatchFailure: apiCallCountNotificationsFailure,
            });
        },
    });
}

function* CreateNotificationSaga({ payload }: { payload: Notification }): any {
    const { internalUserId } = payload;
    const requestOptions = {
        method: 'PUT',
        body: payload,
    };

    yield apiCallHandler({
        apiPath: `/Notifications/Create`,
        baseApiPath,
        requestOptions,
        dispatchSuccess: apiCallCreateNotificationSuccess,
        dispatchFailure: apiCallCreateNotificationFailure,
        successCallback: function* () {
            yield apiCallHandler({
                apiPath: `/Notifications/CountAllByCriteria?internalUserId=${internalUserId}&isSeen=false`,
                baseApiPath,
                dispatchSuccess: apiCallCountNotificationsSuccess,
                dispatchFailure: apiCallCountNotificationsFailure,
            });
        },
    });
}

function* notificationsSaga() {
    yield takeEvery(
        getAllNotificationsByCriteria,
        GetAllNotificationsByCriteriaSaga,
    );
    yield takeEvery(
        updateNotification,
        UpdateNotificationSaga);
    yield takeEvery(
        createNotification,
        CreateNotificationSaga);
    yield takeEvery(
        countAllNotificationsByCriteria,
        CountAllNotificationsByCriteriaSaga,
    );
}

export default notificationsSaga;
