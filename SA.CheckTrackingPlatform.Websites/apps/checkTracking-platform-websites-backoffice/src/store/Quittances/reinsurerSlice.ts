import { DataSliceState, createDataSlice } from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const reinsurerSlice = createDataSlice(
  'reinsurerByAll',
  initialState,
);

export const {
  getAll: reinsurerAll,
  callApiSuccess: reinsurerSuccess,
  callApiFailure: reinsurerFailure,
  defaultEndCallApiSuccess,
} = reinsurerSlice.actions;

export default reinsurerSlice.reducer;
