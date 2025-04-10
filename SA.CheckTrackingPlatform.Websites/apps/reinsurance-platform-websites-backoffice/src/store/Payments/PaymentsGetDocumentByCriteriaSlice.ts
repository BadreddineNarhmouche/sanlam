import { DataSliceState, createDataSlice } from '@reinsurance/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const PaymentsGetDocumentByCriteriaSlice = createDataSlice(
    'PaymentsGetDocumentByCriteria',
    initialState,
);

export const {
    getBy: getPaymentsDocumentByCriteria,
    callApiSuccess: getPaymentsDocumentByCriteriaSuccess,
    callApiFailure: getPaymentsDocumentByCriteriaFailure,
    clear: clearGetPaymentsDocumentByCriteria,
    defaultEndCallApiSuccess,
} = PaymentsGetDocumentByCriteriaSlice.actions;

export default PaymentsGetDocumentByCriteriaSlice.reducer;
