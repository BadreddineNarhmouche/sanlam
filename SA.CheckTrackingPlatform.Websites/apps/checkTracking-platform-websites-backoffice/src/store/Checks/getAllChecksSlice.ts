import { DataSliceState, createDataSlice } from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
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
