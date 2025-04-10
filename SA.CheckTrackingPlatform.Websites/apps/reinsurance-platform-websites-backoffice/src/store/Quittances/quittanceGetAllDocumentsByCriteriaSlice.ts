import { DataSliceState, createDataSlice } from '@reinsurance/helpers';

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const quittanceGetAllDocumentsByCriteriaSlice = createDataSlice(
  'quittanceGetAllDocumentsByCriteria',
  initialState,
);

export const {
  getBy: getAllQuittanceDocumentsByCriteria,
  callApiSuccess: getAllQuittanceDocumentsByCriteriaSuccess,
  callApiFailure: getAllQuittanceDocumentsByCriteriaFailure,
  defaultEndCallApiSuccess,
} = quittanceGetAllDocumentsByCriteriaSlice.actions;

export default quittanceGetAllDocumentsByCriteriaSlice.reducer;
