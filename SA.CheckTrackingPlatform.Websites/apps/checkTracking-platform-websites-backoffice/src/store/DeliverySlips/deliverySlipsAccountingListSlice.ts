import {
    DataSliceState,
    createDataSlice,
    DeliverySlip,
} from '@checkTracking/helpers';

const initialState: DataSliceState<DeliverySlip> = {
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

export const deliverySlipsAccountingListSlice = createDataSlice(
    'deliverySlipsAccountingList',
    initialState,
);

export const {
    getAllByCriteria: getAllAccountingDeliverySlipsByCriteria,
    callApiSuccess: apiCallAccountingDeliverySlipsListSuccess,
    callApiFailure: apiCallAccountingDeliverySlipsListFailure,
    defaultEndCallApiSuccess,
} = deliverySlipsAccountingListSlice.actions;

export default deliverySlipsAccountingListSlice.reducer;
