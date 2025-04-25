import { DataSliceState, createDataSlice } from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const deliverySlipGetDocumentByCriteriaSlice = createDataSlice(
    'deliverySlipGetDocumentByCriteria',
    initialState,
);

export const {
    getBy: getDeliverySlipDocumentByCriteria,
    callApiSuccess: getDeliverySlipDocumentByCriteriaSuccess,
    callApiFailure: getDeliverySlipDocumentByCriteriaFailure,
    clear: clearGetDeliverySlipDocumentByCriteria,
    defaultEndCallApiSuccess,
} = deliverySlipGetDocumentByCriteriaSlice.actions;

export default deliverySlipGetDocumentByCriteriaSlice.reducer;
