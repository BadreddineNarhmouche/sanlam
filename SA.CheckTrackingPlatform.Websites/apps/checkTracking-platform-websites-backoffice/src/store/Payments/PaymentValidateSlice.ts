import { DataSliceState, createDataSlice } from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const PaymentValidateSlice = createDataSlice(
  'paymentValidate',
  initialState,
);

export const {
  getBy: PaymentValidate,
  callApiSuccess: PaymentValidateSuccess,
  callApiFailure: PaymentValidateFailure,
  clear: clearPaymentValidate,
  defaultEndCallApiSuccess,
} = PaymentValidateSlice.actions;

export default PaymentValidateSlice.reducer;
