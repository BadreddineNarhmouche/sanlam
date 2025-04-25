import { DataSliceState, createDataSlice } from '@checkTracking/helpers';

const initialState: DataSliceState<any> = {
    responseData: [],
    isLoading: false,
    error: null,
};

export const quittanceAnnotationCreateSlice = createDataSlice(
    'quittanceAnnotationCreate',
    initialState,
);

export const {
    update: quittanceAnnotationCreate,
    callApiSuccess: QuittanceAnnotationCreateSuccess,
    callApiFailure: QuittanceAnnotationCreateFailure,
    defaultEndCallApiSuccess,
} = quittanceAnnotationCreateSlice.actions;

export default quittanceAnnotationCreateSlice.reducer;
