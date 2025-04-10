import { DataSliceState, createDataSlice } from '@reinsurance/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const quittanceStatusByAllSlice = createDataSlice(
    'quittanceStatusByAll',
    initialState,
);

export const {
    getAll: quittanceStatusByAll,
    callApiSuccess: quittanceStatusByAllSuccess,
    callApiFailure: quittanceStatusByAllFailure,
    defaultEndCallApiSuccess,
} = quittanceStatusByAllSlice.actions;

export default quittanceStatusByAllSlice.reducer;
