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

export const quittancesSubscriptionListSlice = createDataSlice(
    'quittancesSubscriptionList',
    initialState,
);

export const {
    getAllByCriteria: getAllSubscriptionQuittancesByCriteria,
    callApiSuccess: apiCallSubscriptionQuittancesListSuccess,
    callApiFailure: apiCallSubscriptionQuittancesListFailure,
    defaultEndCallApiSuccess,
} = quittancesSubscriptionListSlice.actions;

export default quittancesSubscriptionListSlice.reducer;
