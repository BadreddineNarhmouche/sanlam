import { DataSliceState, createDataSlice } from '@reinsurance/helpers';

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const GetAllCurrenciesSlice = createDataSlice(
  'GetAllCurrencies',
  initialState,
);

export const {
  getAll: GetAllCurrencies,
  callApiSuccess: GetAllCurrenciesSuccess,
  callApiFailure: GetAllCurrenciesFailure,
  defaultEndCallApiSuccess,
} = GetAllCurrenciesSlice.actions;

export default GetAllCurrenciesSlice.reducer;
