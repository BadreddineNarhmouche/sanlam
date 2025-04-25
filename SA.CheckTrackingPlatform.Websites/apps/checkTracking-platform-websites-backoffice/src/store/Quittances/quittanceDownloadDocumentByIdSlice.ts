import { DataSliceState, createDataSlice } from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const quittanceDownloadDocumentByIdSlice = createDataSlice(
    'quittanceDownloadDocumentById',
    initialState,
);

export const {
    getBy: downloadQuittanceDocumentById,
    callApiSuccess: downloadQuittanceDocumentByIdSuccess,
    callApiFailure: downloadQuittanceDocumentByIdFailure,
    defaultEndCallApiSuccess,
} = quittanceDownloadDocumentByIdSlice.actions;

export default quittanceDownloadDocumentByIdSlice.reducer;
