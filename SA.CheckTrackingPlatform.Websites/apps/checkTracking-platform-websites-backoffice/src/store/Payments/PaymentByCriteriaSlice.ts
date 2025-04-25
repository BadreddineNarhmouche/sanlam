import { DataSliceState, createDataSlice } from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const PaymentByCriteriaSlice = createDataSlice(
  'paymentByCriteria',
  initialState,
);

export const {
  getBy: getPaymentByCriteria,
  callApiSuccess: getPaymentByCriteriaSuccess,
  callApiFailure: getPaymentByCriteriaFailure,
  defaultEndCallApiSuccess,
} = PaymentByCriteriaSlice.actions;

export default PaymentByCriteriaSlice.reducer;
