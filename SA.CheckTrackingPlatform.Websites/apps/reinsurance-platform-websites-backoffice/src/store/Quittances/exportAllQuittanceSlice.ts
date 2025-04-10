import { DataSliceState, createDataSlice } from '@reinsurance/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const exportAllQuittanceSlice = createDataSlice(
    'exportAllQuittance',
    initialState,
);

export const {
    getBy: exportAllQuittance,
    callApiSuccess: exportAllQuittanceSuccess,
    callApiFailure: exportAllQuittanceFailure,
    defaultEndCallApiSuccess,
} = exportAllQuittanceSlice.actions;

export default exportAllQuittanceSlice.reducer;
