import {
    DataSliceState,
    createDataSlice,
} from '@reinsurance/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const quittanceValidateRecoverySlice = createDataSlice(
    'quittanceValidateRecovery',
    initialState,
);

export const {
    update: validateRecoveryQuittance,
    callApiSuccess: apiCallValidateRecoveryQuittanceSuccess,
    callApiFailure: apiCallValidateRecoveryQuittanceFailure,
    defaultEndCallApiSuccess,
} = quittanceValidateRecoverySlice.actions;

export default quittanceValidateRecoverySlice.reducer;
