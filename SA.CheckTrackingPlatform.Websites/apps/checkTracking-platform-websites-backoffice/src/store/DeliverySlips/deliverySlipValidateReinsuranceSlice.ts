import {
    DataSliceState,
    createDataSlice,
} from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const deliverySlipValidateReinsuranceSlice = createDataSlice(
    'deliverySlipValidateReinsurance',
    initialState,
);

export const {
    update: validateReinsuranceDeliverySlip,
    callApiSuccess: apiCallValidateReinsuranceDeliverySlipSuccess,
    callApiFailure: apiCallValidateReinsuranceDeliverySlipFailure,
    defaultEndCallApiSuccess,
} = deliverySlipValidateReinsuranceSlice.actions;

export default deliverySlipValidateReinsuranceSlice.reducer;
