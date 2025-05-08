import { DataSliceState, createDataSlice } from '@checkTracking/helpers';
import { ROLE } from '@checkTracking/shared';

const initialState: DataSliceState<ROLE | null> = {
    responseData: null,
    isLoading: false,
    error: null,
};

export const getAllDetailsCheckSlice= createDataSlice('getAllDetailsCheck', initialState);

export const {
    getBy: getAllDetailsCheck,
    callApiSuccess: apiCallGetAllDetailsCheckSliceSuccess,
    callApiFailure: apiCallGetAllDetailsCheckSliceSFailure,
    defaultEndCallApiSuccess,
} = getAllDetailsCheckSlice.actions;

export default getAllDetailsCheckSlice.reducer;
