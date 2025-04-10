import { DataSliceState, createDataSlice } from '@reinsurance/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const quittanceAnnotationByAllSlice = createDataSlice(
    'quittanceAnnotationByAll',
    initialState,
);

export const {
    getAll: quittanceAnnotationByAll,
    callApiSuccess: QuittanceAnnotationByAllSuccess,
    callApiFailure: QuittanceAnnotationByAllFailure,
    defaultEndCallApiSuccess,
} = quittanceAnnotationByAllSlice.actions;

export default quittanceAnnotationByAllSlice.reducer;
