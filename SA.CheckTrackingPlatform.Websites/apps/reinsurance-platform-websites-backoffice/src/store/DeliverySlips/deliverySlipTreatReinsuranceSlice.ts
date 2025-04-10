import {
    DataSliceState,
    createDataSlice,
} from '@reinsurance/helpers';

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
