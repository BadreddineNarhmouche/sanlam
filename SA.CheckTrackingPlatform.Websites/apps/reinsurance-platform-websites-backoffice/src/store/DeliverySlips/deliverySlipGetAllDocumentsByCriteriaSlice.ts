import { DataSliceState, createDataSlice } from '@reinsurance/helpers';

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const deliverySlipGetAllDocumentsByCriteriaSlice = createDataSlice(
  'deliverySlipGetAllDocumentsByCriteria',
  initialState,
);

export const {
  getBy: getAllDeliverySlipDocumentsByCriteria,
  callApiSuccess: getAllDeliverySlipDocumentsByCriteriaSuccess,
  callApiFailure: getAllDeliverySlipDocumentsByCriteriaFailure,
  defaultEndCallApiSuccess,
} = deliverySlipGetAllDocumentsByCriteriaSlice.actions;

export default deliverySlipGetAllDocumentsByCriteriaSlice.reducer;
