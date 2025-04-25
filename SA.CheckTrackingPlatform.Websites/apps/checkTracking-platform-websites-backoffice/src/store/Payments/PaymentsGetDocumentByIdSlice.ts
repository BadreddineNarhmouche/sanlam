import { DataSliceState, createDataSlice } from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const PaymentsGetDocumentByIdSlice = createDataSlice(
    'PaymentsGetDocumentById',
    initialState,
);

export const {
    getBy: getPaymentsDocumentById,
    callApiSuccess: getPaymentsDocumentByIdSuccess,
    callApiFailure: getPaymentsDocumentByIdFailure,
    clear: clearGetPaymentsDocumentById,
    defaultEndCallApiSuccess,
} = PaymentsGetDocumentByIdSlice.actions;

export default PaymentsGetDocumentByIdSlice.reducer;
