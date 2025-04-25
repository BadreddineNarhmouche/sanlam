import {
    DataSliceState,
    createDataSlice,
} from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const deliverySlipSubmitDocumentsSlice = createDataSlice(
    'deliverySlipSubmitDocuments',
    initialState,
);

export const {
    update: submitDocumentsDeliverySlip,
    callApiSuccess: apiCallSubmitDocumentsDeliverySlipSuccess,
    callApiFailure: apiCallSubmitDocumentsDeliverySlipFailure,
    clear: clearSubmitDocumentsDeliverySlip,
    defaultEndCallApiSuccess,
} = deliverySlipSubmitDocumentsSlice.actions;

export default deliverySlipSubmitDocumentsSlice.reducer;
