import { DataSliceState, createDataSlice } from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const quittanceGetDocumentByIdSlice = createDataSlice(
    'quittanceGetDocumentById',
    initialState,
);

export const {
    getBy: getQuittanceDocumentById,
    callApiSuccess: getQuittanceDocumentByIdSuccess,
    callApiFailure: getQuittanceDocumentByIdFailure,
    clear: clearGetQuittanceDocumentById,
    defaultEndCallApiSuccess,
} = quittanceGetDocumentByIdSlice.actions;

export default quittanceGetDocumentByIdSlice.reducer;
