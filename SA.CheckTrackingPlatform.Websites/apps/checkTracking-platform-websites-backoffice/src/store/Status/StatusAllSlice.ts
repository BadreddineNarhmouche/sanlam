import { DataSliceState, createDataSlice } from "@checkTracking/helpers";

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const StatusAllSlice = createDataSlice("AllStatus", initialState);

export const {
  getAll: AllStatus,
  callApiSuccess: apiCallStatusAllSuccess,
  callApiFailure: apiCallStatusAllFailure,
  defaultEndCallApiSuccess,
} = StatusAllSlice.actions;

export default StatusAllSlice.reducer;
