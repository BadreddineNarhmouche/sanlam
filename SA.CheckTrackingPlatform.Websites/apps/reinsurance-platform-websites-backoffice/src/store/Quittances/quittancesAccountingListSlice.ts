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

export const quittancesAccountingListSlice = createDataSlice(
    'quittancesAccountingList',
    initialState,
);

export const {
    getAllByCriteria: getAllAccountingQuittancesByCriteria,
    callApiSuccess: apiCallAccountingQuittancesListSuccess,
    callApiFailure: apiCallAccountingQuittancesListFailure,
    defaultEndCallApiSuccess,
} = quittancesAccountingListSlice.actions;

export default quittancesAccountingListSlice.reducer;
