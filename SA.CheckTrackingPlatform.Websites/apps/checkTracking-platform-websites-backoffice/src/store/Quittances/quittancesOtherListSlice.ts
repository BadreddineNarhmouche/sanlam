import {
    DataSliceState,
    createDataSlice,
    Quittance,
} from '@checkTracking/helpers';

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

export const quittancesOtherListSlice = createDataSlice(
    'quittancesOtherList',
    initialState,
);

export const {
    getAllByCriteria: getAllOtherQuittancesByCriteria,
    callApiSuccess: apiCallOtherQuittancesListSuccess,
    callApiFailure: apiCallOtherQuittancesListFailure,
    defaultEndCallApiSuccess,
} = quittancesOtherListSlice.actions;

export default quittancesOtherListSlice.reducer;
