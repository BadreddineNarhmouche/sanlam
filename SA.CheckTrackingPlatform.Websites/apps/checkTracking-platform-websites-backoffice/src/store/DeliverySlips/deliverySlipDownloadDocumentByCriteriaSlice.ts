import { DataSliceState, createDataSlice } from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
  responseData: [],
  isLoading: false,
  error: null,
};

export const deliverySlipDownloadDocumentByCriteriaSlice = createDataSlice(
  'deliverySlipDownloadDocumentByCriteria',
  initialState,
);

export const {
  getBy: downloadDeliverySlipDocumentByCriteria,
  callApiSuccess: downloadDeliverySlipDocumentByCriteriaSuccess,
  callApiFailure: downloadDeliverySlipDocumentByCriteriaFailure,
  defaultEndCallApiSuccess,
} = deliverySlipDownloadDocumentByCriteriaSlice.actions;

export default deliverySlipDownloadDocumentByCriteriaSlice.reducer;
