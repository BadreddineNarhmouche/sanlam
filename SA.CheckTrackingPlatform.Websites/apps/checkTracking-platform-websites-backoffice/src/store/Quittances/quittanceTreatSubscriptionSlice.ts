import {
    DataSliceState,
    createDataSlice,
} from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const quittanceTreatSubscriptionSlice = createDataSlice(
    'quittanceTreatSubscription',
    initialState,
);

export const {
    update: treatSubscriptionQuittance,
    callApiSuccess: apiCallTreatSubscriptionQuittanceSuccess,
    callApiFailure: apiCallTreatSubscriptionQuittanceFailure,
    defaultEndCallApiSuccess,
} = quittanceTreatSubscriptionSlice.actions;

export default quittanceTreatSubscriptionSlice.reducer;
