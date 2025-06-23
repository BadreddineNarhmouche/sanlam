import { DataSliceState, createDataSlice } from "@checkTracking/helpers";

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const ReasonMoveAllSlice = createDataSlice(
  "AllReasonMove",
  initialState
);

export const {
  getAll: AllReasonMove,
  callApiSuccess: apiCallReasonMoveAllSuccess,
  callApiFailure: apiCallReasonMoveAllFailure,
  defaultEndCallApiSuccess,
} = ReasonMoveAllSlice.actions;

export default ReasonMoveAllSlice.reducer;
