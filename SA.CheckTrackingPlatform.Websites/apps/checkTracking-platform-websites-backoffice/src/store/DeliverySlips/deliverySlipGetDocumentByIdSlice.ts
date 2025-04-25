import { DataSliceState, createDataSlice } from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const deliverySlipGetDocumentByIdSlice = createDataSlice(
    'deliverySlipGetDocumentById',
    initialState,
);

export const {
    getBy: getDeliverySlipDocumentById,
    callApiSuccess: getDeliverySlipDocumentByIdSuccess,
    callApiFailure: getDeliverySlipDocumentByIdFailure,
    clear: clearGetDeliverySlipDocumentById,
    defaultEndCallApiSuccess,
} = deliverySlipGetDocumentByIdSlice.actions;

export default deliverySlipGetDocumentByIdSlice.reducer;
