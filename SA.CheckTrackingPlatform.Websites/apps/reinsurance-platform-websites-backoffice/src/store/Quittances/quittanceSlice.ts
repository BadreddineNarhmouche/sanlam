import {
    DataSliceState,
    createDataSlice,
    Quittance,
} from '@reinsurance/helpers';

const initialState: DataSliceState<Quittance> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const quittanceSlice = createDataSlice(
    'quittance',
    initialState,
);

export const {
    getBy: getQuittanceById,
    callApiSuccess: apiCallQuittanceSuccess,
    callApiFailure: apiCallQuittanceFailure,
    clear: clearGetQuittanceById,
    defaultEndCallApiSuccess,
} = quittanceSlice.actions;

export default quittanceSlice.reducer;
