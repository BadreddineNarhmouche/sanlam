import { DataSliceState, createDataSlice } from '@checkTracking/helpers';
import { ROLE } from '@checkTracking/shared';

const initialState: DataSliceState<ROLE | null> = {
    responseData: null,
    isLoading: false,
    error: null,
};

export const getAllChecksSlice = createDataSlice('getAllChecks', initialState);

export const {
    getBy: getAllChecks,
    callApiSuccess: apiCallGetAllChecksSuccess,
    callApiFailure: apiCallGetAllChecksFailure,
    defaultEndCallApiSuccess,
} = getAllChecksSlice.actions;

export default getAllChecksSlice.reducer;
