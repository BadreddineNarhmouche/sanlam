import { DataSliceState, createDataSlice } from "@checkTracking/helpers";

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const ReceivedOfficeSendClient = createDataSlice(
  "ReceivedOfficeSendClientAll",
  initialState
);

export const {
  getAll: ReceivedOfficeSendClientAll,
  callApiSuccess: apiCallReceivedOfficeSendClientAllSuccess,
  callApiFailure: apiCallReceivedOfficeSendClientAllFailure,
} = ReceivedOfficeSendClient.actions;

export default ReceivedOfficeSendClient.reducer;
