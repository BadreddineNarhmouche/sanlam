import {
    DataSliceState,
    createDataSlice,
} from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const deliverySlipTreatReinsuranceSlice = createDataSlice(
    'deliverySlipTreatReinsurance',
    initialState,
);

export const {
    update: treatReinsuranceDeliverySlip,
    callApiSuccess: apiCallTreatReinsuranceDeliverySlipSuccess,
    callApiFailure: apiCallTreatReinsuranceDeliverySlipFailure,
    defaultEndCallApiSuccess,
} = deliverySlipTreatReinsuranceSlice.actions;

export default deliverySlipTreatReinsuranceSlice.reducer;
