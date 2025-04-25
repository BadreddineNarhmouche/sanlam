import {
    DataSliceState,
    createDataSlice,
    QuittancePayment,
} from '@checkTracking/helpers';

const initialState: DataSliceState<QuittancePayment> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const quittancePaymentSlice = createDataSlice(
    'quittancePayment',
    initialState,
);

export const {
    getBy: getQuittancePaymentByQuittanceId,
    callApiSuccess: getQuittancePaymentByQuittanceIdSuccess,
    callApiFailure: getQuittancePaymentByQuittanceIdFailure,
    clear: clearGetQuittancePaymentByQuittanceId,
    defaultEndCallApiSuccess,
} = quittancePaymentSlice.actions;

export default quittancePaymentSlice.reducer;
