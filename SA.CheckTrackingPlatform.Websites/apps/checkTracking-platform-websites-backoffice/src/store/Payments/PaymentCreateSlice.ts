import { DataSliceState, createDataSlice } from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const PaymentCreateSlice = createDataSlice(
  'paymentCreate',
  initialState,
);

export const {
  getBy: PaymentCreate,
  callApiSuccess: PaymentCreateSuccess,
  callApiFailure: PaymentCreateFailure,
  defaultEndCallApiSuccess,
} = PaymentCreateSlice.actions;

export default PaymentCreateSlice.reducer;
