import { DataSliceState, createDataSlice } from "@reinsurance/helpers";

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const exportFileExcelRenovelSlice = createDataSlice(
  "exportFileExcelRenovel",
  initialState
);

export const {
  getBy: exportFileExcelRenovel,
  callApiSuccess: exportFileExcelRenovelSuccess,
  callApiFailure: exportFileExcelRenovelFailure,
  defaultEndCallApiSuccess,
} = exportFileExcelRenovelSlice.actions;

export default exportFileExcelRenovelSlice.reducer;
