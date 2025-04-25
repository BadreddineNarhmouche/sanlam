import { DataSliceState, createDataSlice } from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const PaymentByIdSlice = createDataSlice(
  'paymentById',
  initialState,
);

export const {
  getBy: getPaymentById,
  callApiSuccess: getPaymentByIdSuccess,
  callApiFailure: getPaymentByIdFailure,
  defaultEndCallApiSuccess,
} = PaymentByIdSlice.actions;

export default PaymentByIdSlice.reducer;
