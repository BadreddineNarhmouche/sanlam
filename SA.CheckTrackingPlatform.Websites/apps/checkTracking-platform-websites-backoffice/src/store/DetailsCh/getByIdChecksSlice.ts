import { DataSliceState, createDataSlice } from "@checkTracking/helpers";
import { ROLE } from "@checkTracking/shared";

const initialState: DataSliceState<ROLE | null> = {
  responseData: null,
  isLoading: false,
  error: null,
};

export const getByIdChecksSlice = createDataSlice("getCheckById", initialState);

export const {
  getBy: getCheckById,
  callApiSuccess: apiCallGetAllChecksSuccess,
  callApiFailure: apiCallGetAllChecksFailure,
  defaultEndCallApiSuccess,
} = getByIdChecksSlice.actions;

export default getByIdChecksSlice.reducer;
