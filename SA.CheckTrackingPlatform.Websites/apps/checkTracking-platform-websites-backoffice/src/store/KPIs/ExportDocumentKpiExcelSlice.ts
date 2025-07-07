import { DataSliceState, createDataSlice } from "@checkTracking/helpers";

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const ExportDocumentKpiExcelSlice = createDataSlice(
  "exportDocumentKpiExcelSlice",
  initialState
);

export const {
  getBy: exportDocumentKpiExcelSlice,
  callApiSuccess: exportDocumentKpiExcelSliceSuccess,
  callApiFailure: exportDocumentKpiExcelSliceFailure,
  defaultEndCallApiSuccess,
} = ExportDocumentKpiExcelSlice.actions;

export default ExportDocumentKpiExcelSlice.reducer;
