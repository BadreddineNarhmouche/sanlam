import {
    DataSliceState,
    createDataSlice,
} from '@reinsurance/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const quittanceTreatRecoverySlice = createDataSlice(
    'quittanceTreatRecovery',
    initialState,
);

export const {
    update: treatRecoveryQuittance,
    callApiSuccess: apiCallTreatRecoveryQuittanceSuccess,
    callApiFailure: apiCallTreatRecoveryQuittanceFailure,
    clear: clearTreatRecoveryQuittance,
    defaultEndCallApiSuccess,
} = quittanceTreatRecoverySlice.actions;

export default quittanceTreatRecoverySlice.reducer;
