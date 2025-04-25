import { DataSliceState, createDataSlice } from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const ReinsurancesKPISlice = createDataSlice(
  'CountReinsurances',
  initialState,
);

export const {
  getAll: GetCountReinsurances,
  callApiSuccess: GetCountReinsurancesSuccess,
  callApiFailure: GetCountReinsurancesFailure,
  defaultEndCallApiSuccess,
} = ReinsurancesKPISlice.actions;

export default ReinsurancesKPISlice.reducer;
