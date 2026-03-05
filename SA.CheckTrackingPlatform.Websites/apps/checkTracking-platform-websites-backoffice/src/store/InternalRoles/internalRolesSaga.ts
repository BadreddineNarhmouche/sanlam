import { apiCallHandler, UserService } from '@checkTracking/helpers';
import { call, takeEvery } from 'redux-saga/effects';
import {
    apiCallRoleFailure,
    apiCallRoleSuccess,
    getInternalRolesByInternalUserElectronicAddress,
} from './internalRolesSlice';
import {
    devMockInternalRoles,
    isDevelopmentOffline,
} from '../devMocks';

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* GetInternalRolesByInternalUserElectronicAddress({ payload }: { payload: any }): any {
    const internalUser = yield call(UserService.getCurrentInternalUser);
    const internalUserElectronicAddress =
        payload?.internalUserElectronicAddress || internalUser?.electronicAddress || '';

    yield apiCallHandler({
        apiPath: `/InternalUserInternalRoles/GetAllByInternalUserElectronicAddress?InternalUserElectronicAddress=${encodeURIComponent(internalUserElectronicAddress)}`,
        baseApiPath,
        dispatchSuccess: apiCallRoleSuccess,
        dispatchFailure: apiCallRoleFailure,
        offlineMode: isDevelopmentOffline,
        offlineCall: () => devMockInternalRoles,
    });
}

function* internalRolesSaga() {
    yield takeEvery(getInternalRolesByInternalUserElectronicAddress, GetInternalRolesByInternalUserElectronicAddress);
}

export default internalRolesSaga;
