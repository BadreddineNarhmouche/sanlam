import {
    DataSliceState,
    createDataSlice,
} from '@reinsurance/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const deliverySlipValidateAccountingSlice = createDataSlice(
    'deliverySlipValidateAccounting',
    initialState,
);

export const {
    update: validateAccountingDeliverySlip,
    callApiSuccess: apiCallValidateAccountingDeliverySlipSuccess,
    callApiFailure: apiCallValidateAccountingDeliverySlipFailure,
    defaultEndCallApiSuccess,
} = deliverySlipValidateAccountingSlice.actions;

export default deliverySlipValidateAccountingSlice.reducer;
