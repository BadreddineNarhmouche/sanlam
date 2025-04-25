import { DataSliceState, createDataSlice } from "@checkTracking/helpers";

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const WorkflowRollBackSlice = createDataSlice(
  "WorkflowRollBack",
  initialState
);

export const {
  update: WorkflowRollBack,
  callApiSuccess: PUTWorkflowRollBackSuccess,
  callApiFailure: PUTWorkflowRollBackFailure,
  clear: clearPUTWorkflowRollBack,
  defaultEndCallApiSuccess,
} = WorkflowRollBackSlice.actions;

export default WorkflowRollBackSlice.reducer;
