import { DataSliceState, createDataSlice } from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const RecoveriesKPISlice = createDataSlice(
  'CountRecoveries',
  initialState,
);

export const {
  getAll: GetCountRecoveries,
  callApiSuccess: GetCountRecoveriesSuccess,
  callApiFailure: GetCountRecoveriesFailure,
  defaultEndCallApiSuccess,
} = RecoveriesKPISlice.actions;

export default RecoveriesKPISlice.reducer;
