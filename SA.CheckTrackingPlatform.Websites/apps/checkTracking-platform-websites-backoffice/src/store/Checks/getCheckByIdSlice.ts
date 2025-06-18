import { DataSliceState, createDataSlice } from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const getCheckByIdSlice = createDataSlice('getCheckById', initialState);

export const {
    getBy: getCheckById,
    callApiSuccess: apiCallGetCheckSuccess,
    callApiFailure: apiCallGetCheckFailure,
    defaultEndCallApiSuccess,
} = getCheckByIdSlice.actions;

export default getCheckByIdSlice.reducer;
