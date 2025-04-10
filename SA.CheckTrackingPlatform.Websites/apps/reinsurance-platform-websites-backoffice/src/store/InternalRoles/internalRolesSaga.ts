import { apiCallHandler } from '@reinsurance/helpers';
import { takeEvery } from 'redux-saga/effects';
import {
    apiCallRoleFailure,
    apiCallRoleSuccess,
    getInternalRolesByInternalUserElectronicAddress,
} from './internalRolesSlice';

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* GetInternalRolesByInternalUserElectronicAddress({ payload }: { payload: any }): any {
    yield apiCallHandler({
        apiPath: `/InternalUserInternalRoles/GetAllByInternalUserElectronicAddress`,
        baseApiPath,
        dispatchSuccess: apiCallRoleSuccess,
        dispatchFailure: apiCallRoleFailure,
    });
}

function* internalRolesSaga() {
    yield takeEvery(getInternalRolesByInternalUserElectronicAddress, GetInternalRolesByInternalUserElectronicAddress);
}

export default internalRolesSaga;
