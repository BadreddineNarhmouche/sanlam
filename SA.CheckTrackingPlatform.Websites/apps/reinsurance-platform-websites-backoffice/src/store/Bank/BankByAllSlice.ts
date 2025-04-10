import { DataSliceState, createDataSlice } from '@reinsurance/helpers';

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const BankByAllSlice = createDataSlice(
  'bankByAll',
  initialState,
);

export const {
  getAll: getBankByAll,
  callApiSuccess: getBankByAllSuccess,
  callApiFailure: getBankByAllFailure,
  defaultEndCallApiSuccess,
} = BankByAllSlice.actions;

export default BankByAllSlice.reducer;
