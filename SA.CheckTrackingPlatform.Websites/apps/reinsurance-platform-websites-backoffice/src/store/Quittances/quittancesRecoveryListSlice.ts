import {
    DataSliceState,
    createDataSlice,
    Quittance,
} from '@reinsurance/helpers';

const initialState: DataSliceState<Quittance> = {
    responseData: [],
    meta: {
        itemsCount: 0,
        pageCount: 0,
        pageIndex: 1,
        pageSize: 0,
        totalCount: 0,
    },
    isLoading: false,
    error: null,
};

export const quittancesRecoveryListSlice = createDataSlice(
    'quittancesRecoveryList',
    initialState,
);

export const {
    getAllByCriteria: getAllRecoveryQuittancesByCriteria,
    callApiSuccess: apiCallRecoveryQuittancesListSuccess,
    callApiFailure: apiCallRecoveryQuittancesListFailure,
    defaultEndCallApiSuccess,
} = quittancesRecoveryListSlice.actions;

export default quittancesRecoveryListSlice.reducer;
