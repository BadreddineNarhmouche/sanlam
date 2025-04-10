import {
    DataSliceState,
    createDataSlice,
} from '@reinsurance/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const quittanceValidateSubscriptionSlice = createDataSlice(
    'quittanceValidateSubscription',
    initialState,
);

export const {
    update: validateSubscriptionQuittance,
    callApiSuccess: apiCallValidateSubscriptionQuittanceSuccess,
    callApiFailure: apiCallValidateSubscriptionQuittanceFailure,
    defaultEndCallApiSuccess,
} = quittanceValidateSubscriptionSlice.actions;

export default quittanceValidateSubscriptionSlice.reducer;
