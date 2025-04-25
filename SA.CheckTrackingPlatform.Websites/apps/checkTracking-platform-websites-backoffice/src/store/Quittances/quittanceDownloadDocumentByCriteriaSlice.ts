import { DataSliceState, createDataSlice } from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const quittanceDownloadDocumentByCriteriaSlice = createDataSlice(
  'quittanceDownloadDocumentByCriteria',
  initialState,
);

export const {
  getBy: downloadQuittanceDocumentByCriteria,
  callApiSuccess: downloadQuittanceDocumentByCriteriaSuccess,
  callApiFailure: downloadQuittanceDocumentByCriteriaFailure,
  defaultEndCallApiSuccess,
} = quittanceDownloadDocumentByCriteriaSlice.actions;

export default quittanceDownloadDocumentByCriteriaSlice.reducer;
