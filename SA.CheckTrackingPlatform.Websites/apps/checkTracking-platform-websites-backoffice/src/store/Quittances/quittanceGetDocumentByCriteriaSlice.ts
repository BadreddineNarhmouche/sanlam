import { DataSliceState, createDataSlice } from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const quittanceGetDocumentByCriteriaSlice = createDataSlice(
    'quittanceGetDocumentByCriteria',
    initialState,
);

export const {
    getBy: getQuittanceDocumentByCriteria,
    callApiSuccess: getQuittanceDocumentByCriteriaSuccess,
    callApiFailure: getQuittanceDocumentByCriteriaFailure,
    clear: clearGetQuittanceDocumentByCriteria,
    defaultEndCallApiSuccess,
} = quittanceGetDocumentByCriteriaSlice.actions;

export default quittanceGetDocumentByCriteriaSlice.reducer;
