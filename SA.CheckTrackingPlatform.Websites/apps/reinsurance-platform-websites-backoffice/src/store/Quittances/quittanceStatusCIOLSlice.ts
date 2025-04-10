import { DataSliceState, createDataSlice } from '@reinsurance/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const quittanceStatusCIOLSlice = createDataSlice(
    'quittanceStatusCIOL',
    initialState,
);

export const {
    getAll: quittanceStatusCIOL,
    callApiSuccess: QuittanceStatusCIOLSuccess,
    callApiFailure: QuittanceStatusCIOLFailure,
    defaultEndCallApiSuccess,
} = quittanceStatusCIOLSlice.actions;

export default quittanceStatusCIOLSlice.reducer;
