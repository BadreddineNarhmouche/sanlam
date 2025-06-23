import { DataSliceState, createDataSlice } from "@checkTracking/helpers";

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const TimelineCreateSlice = createDataSlice(
  "TimelineSlice",
  initialState
);

export const {
  update: timelineAnnotationCreate,
  callApiSuccess: TimelineAnnotationCreateSuccess,
  callApiFailure: TimelineAnnotationCreateFailure,
  defaultEndCallApiSuccess,
} = TimelineCreateSlice.actions;

export default TimelineCreateSlice.reducer;
