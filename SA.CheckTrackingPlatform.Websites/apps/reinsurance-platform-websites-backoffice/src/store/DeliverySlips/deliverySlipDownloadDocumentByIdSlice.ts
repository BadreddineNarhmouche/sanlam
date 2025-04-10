import { DataSliceState, createDataSlice } from '@reinsurance/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const deliverySlipDownloadDocumentByIdSlice = createDataSlice(
    'deliverySlipDownloadDocumentById',
    initialState,
);

export const {
    getBy: downloadDeliverySlipDocumentById,
    callApiSuccess: downloadDeliverySlipDocumentByIdSuccess,
    callApiFailure: downloadDeliverySlipDocumentByIdFailure,
    defaultEndCallApiSuccess,
} = deliverySlipDownloadDocumentByIdSlice.actions;

export default deliverySlipDownloadDocumentByIdSlice.reducer;
