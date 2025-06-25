import { DataSliceState, createDataSlice } from "@checkTracking/helpers";

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const CheckTrackingKPISlice = createDataSlice(
  "CheckTrackingKPIs",
  initialState
);

export const {
  getAll: GetCheckTrackingKPIs,
  callApiSuccess: GetCheckTrackingKPIsSuccess,
  callApiFailure: GetCheckTrackingKPIsFailure,
  defaultEndCallApiSuccess,
} = CheckTrackingKPISlice.actions;

export default CheckTrackingKPISlice.reducer;
