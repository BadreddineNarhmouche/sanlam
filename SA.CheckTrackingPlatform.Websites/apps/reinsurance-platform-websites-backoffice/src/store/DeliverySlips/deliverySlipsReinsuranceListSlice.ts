import {
    DataSliceState,
    createDataSlice,
    DeliverySlip,
} from '@reinsurance/helpers';

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

export const deliverySlipsReinsuranceListSlice = createDataSlice(
    'deliverySlipsReinsuranceList',
    initialState,
);

export const {
    getAllByCriteria: getAllReinsuranceDeliverySlipsByCriteria,
    callApiSuccess: apiCallReinsuranceDeliverySlipsListSuccess,
    callApiFailure: apiCallReinsuranceDeliverySlipsListFailure,
    defaultEndCallApiSuccess,
} = deliverySlipsReinsuranceListSlice.actions;

export default deliverySlipsReinsuranceListSlice.reducer;
