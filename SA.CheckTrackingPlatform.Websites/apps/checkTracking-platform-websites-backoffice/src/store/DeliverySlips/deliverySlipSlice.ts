import {
    DataSliceState,
    createDataSlice,
    DeliverySlip,
} from '@checkTracking/helpers';

const initialState: DataSliceState<DeliverySlip> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const deliverySlipSlice = createDataSlice(
    'deliverySlip',
    initialState,
);

export const {
    getBy: getDeliverySlipById,
    callApiSuccess: apiCallDeliverySlipSuccess,
    callApiFailure: apiCallDeliverySlipFailure,
    clear: clearGetDeliverySlipById,
    defaultEndCallApiSuccess,
} = deliverySlipSlice.actions;

export default deliverySlipSlice.reducer;
