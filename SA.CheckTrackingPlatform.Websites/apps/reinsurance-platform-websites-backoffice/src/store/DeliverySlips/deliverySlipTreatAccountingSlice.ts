import {
    DataSliceState,
    createDataSlice,
} from '@reinsurance/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const deliverySlipTreatAccountingSlice = createDataSlice(
    'deliverySlipTreatAccounting',
    initialState,
);

export const {
    update: treatAccountingDeliverySlip,
    callApiSuccess: apiCallTreatAccountingDeliverySlipSuccess,
    callApiFailure: apiCallTreatAccountingDeliverySlipFailure,
    defaultEndCallApiSuccess,
} = deliverySlipTreatAccountingSlice.actions;

export default deliverySlipTreatAccountingSlice.reducer;
