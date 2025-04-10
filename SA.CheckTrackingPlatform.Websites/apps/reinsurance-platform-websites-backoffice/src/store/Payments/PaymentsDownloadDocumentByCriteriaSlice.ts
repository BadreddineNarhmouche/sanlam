import { DataSliceState, createDataSlice } from '@reinsurance/helpers';

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const PaymentsDownloadDocumentByCriteriaSlice = createDataSlice(
  'paymentDownloadDocumentByCriteria',
  initialState,
);

export const {
  getBy: downloadPaymentDocumentByCriteria,
  callApiSuccess: downloadPaymentDocumentByCriteriaSuccess,
  callApiFailure: downloadPaymentDocumentByCriteriaFailure,
  defaultEndCallApiSuccess,
} = PaymentsDownloadDocumentByCriteriaSlice.actions;

export default PaymentsDownloadDocumentByCriteriaSlice.reducer;
