import { DataSliceState, createDataSlice } from "@checkTracking/helpers";
import { ROLE } from "@checkTracking/shared";

const initialState: DataSliceState<ROLE | null> = {
  responseData: null,
  isLoading: false,
  error: null,
};

export const getAllChecksByCriteriaSlice = createDataSlice(
  "getAllChecksByCriteria",
  initialState
);

export const {
  getBy: getAllChecksByCriteria,
  callApiSuccess: apiCallGetAllChecksByCriteriaSuccess,
  callApiFailure: apiCallGetAllChecksByCriteriaFailure,
  defaultEndCallApiSuccess,
} = getAllChecksByCriteriaSlice.actions;

export default getAllChecksByCriteriaSlice.reducer;
