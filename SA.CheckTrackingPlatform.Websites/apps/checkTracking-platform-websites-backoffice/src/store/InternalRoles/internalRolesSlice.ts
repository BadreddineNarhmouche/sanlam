import { DataSliceState, createDataSlice } from '@checkTracking/helpers';
import { ROLE } from '@checkTracking/shared';

const initialState: DataSliceState<ROLE | null> = {
    responseData: null,
    isLoading: false,
    error: null,
};

export const internalRolesSlice = createDataSlice('internalRoles', initialState);

export const {
    getBy: getInternalRolesByInternalUserElectronicAddress,
    callApiSuccess: apiCallRoleSuccess,
    callApiFailure: apiCallRoleFailure,
    defaultEndCallApiSuccess,
} = internalRolesSlice.actions;

export default internalRolesSlice.reducer;
