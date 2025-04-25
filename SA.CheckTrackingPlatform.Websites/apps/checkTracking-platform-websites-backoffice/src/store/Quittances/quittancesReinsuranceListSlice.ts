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

export const quittancesReinsuranceListSlice = createDataSlice(
    'quittancesReinsuranceList',
    initialState,
);

export const {
    getAllByCriteria: getAllReinsuranceQuittancesByCriteria,
    callApiSuccess: apiCallReinsuranceQuittancesListSuccess,
    callApiFailure: apiCallReinsuranceQuittancesListFailure,
    clear: clearGetAllReinsuranceQuittancesByCriteria,
    defaultEndCallApiSuccess,
} = quittancesReinsuranceListSlice.actions;

export default quittancesReinsuranceListSlice.reducer;
