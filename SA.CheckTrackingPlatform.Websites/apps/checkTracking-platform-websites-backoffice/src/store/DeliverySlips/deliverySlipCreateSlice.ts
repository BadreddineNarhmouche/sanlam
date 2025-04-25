import {
    DataSliceState,
    createDataSlice,
} from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const deliverySlipCreateSlice = createDataSlice(
    'deliverySlipCreate',
    initialState,
);

export const {
    update: createDeliverySlip,
    callApiSuccess: apiCallCreateDeliverySlipSuccess,
    callApiFailure: apiCallCreateDeliverySlipFailure,
    defaultEndCallApiSuccess,
} = deliverySlipCreateSlice.actions;

export default deliverySlipCreateSlice.reducer;
