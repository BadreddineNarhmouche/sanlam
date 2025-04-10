import { DataSliceState, createDataSlice } from '@reinsurance/helpers';

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const PaymentsGetAllDocumentsByCriteriaSlice = createDataSlice(
  'PaymentsGetAllDocumentsByCriteria',
  initialState,
);

export const {
  getBy: getAllPaymentsDocumentsByCriteria,
  callApiSuccess: getAllPaymentsDocumentsByCriteriaSuccess,
  callApiFailure: getAllPaymentsDocumentsByCriteriaFailure,
  defaultEndCallApiSuccess,
} = PaymentsGetAllDocumentsByCriteriaSlice.actions;

export default PaymentsGetAllDocumentsByCriteriaSlice.reducer;
