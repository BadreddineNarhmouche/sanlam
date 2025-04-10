import {
    DataSliceState,
    createDataSlice,
} from '@reinsurance/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const quittanceSubmitDocumentsSlice = createDataSlice(
    'quittanceSubmitDocuments',
    initialState,
);

export const {
    update: submitDocumentsQuittance,
    callApiSuccess: apiCallSubmitDocumentsQuittanceSuccess,
    callApiFailure: apiCallSubmitDocumentsQuittanceFailure,
    clear: clearSubmitDocumentsQuittance,
    defaultEndCallApiSuccess,
} = quittanceSubmitDocumentsSlice.actions;

export default quittanceSubmitDocumentsSlice.reducer;
