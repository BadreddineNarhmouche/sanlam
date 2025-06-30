import { DataSliceState, createDataSlice } from "@checkTracking/helpers";

/* const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};*/

const initialState: DataSliceState<any> = {
  responseData: null,
  isLoading: false,
  error: null,
};

export const TimelineCreateSlice = createDataSlice(
  "CreateTimeline",
  initialState
);

export const {
  update: CreateTimeline,
  callApiSuccess: TimelineCreatedSuccess,
  callApiFailure: TimelineCreatedFailure,
  defaultEndCallApiSuccess,
} = TimelineCreateSlice.actions;

export default TimelineCreateSlice.reducer;
