import { DataSliceState, createDataSlice } from '@reinsurance/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const PaymentsDownloadDocumentByIdSlice = createDataSlice(
    'paymentDownloadDocumentById',
    initialState,
);

export const {
    getBy: downloadPaymentDocumentById,
    callApiSuccess: downloadPaymentDocumentByIdSuccess,
    callApiFailure: downloadPaymentDocumentByIdFailure,
    defaultEndCallApiSuccess,
} = PaymentsDownloadDocumentByIdSlice.actions;

export default PaymentsDownloadDocumentByIdSlice.reducer;
