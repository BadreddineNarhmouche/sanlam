import { apiCallHandler, UserService } from "@checkTracking/helpers";
import { call, takeEvery } from "redux-saga/effects";
import {
  apiCallGetAllChecksByCriteriaFailure,
  apiCallGetAllChecksByCriteriaSuccess,
  getAllChecksByCriteria,
} from "./getAllChecksByCriteriaSlice";
import { mapAllChecksList, mapChecksList } from "./mapper";
import {
  apiCallGetAllChecksFailure,
  apiCallGetAllChecksSuccess,
  getAllChecks,
} from "./getAllChecksSlice";
import {
  apiCallGetCheckFailure,
  apiCallGetCheckSuccess,
  getCheckById,
} from "./getCheckByIdSlice";
import {
  devMockChecks,
  getDevMockCheckDetails,
  isDevelopmentOffline,
} from "../devMocks";

const baseApiPath = process.env.REACT_APP_API_BASE_PATH;

function* getAllCheckByCriteria({ payload }: { payload: any }): any {
  const internalUser = yield call(UserService.getCurrentInternalUser);
  const internalUserElectronicAddress =
    payload?.internalUserElectronicAddress || internalUser?.electronicAddress || "";
  const pageIndex = payload?.meta?.pageIndex || 1;

  yield apiCallHandler({
    apiPath: `/Checkes/GetAllByCriteria?CheckNumbers=${payload?.checkNumber || ""}&LotNumber=${payload?.lotNumber || ""}&SinisterNumber=${payload?.sinisterNumber || ""}&StatusId=${payload?.checkStatusId || ""}&InternalUserElectronicAddress=${encodeURIComponent(internalUserElectronicAddress)}&PageIndex=${pageIndex}`,
    baseApiPath,
    dispatchSuccess: apiCallGetAllChecksByCriteriaSuccess,
    dispatchFailure: apiCallGetAllChecksByCriteriaFailure,
    mapper: mapChecksList,
    offlineMode: isDevelopmentOffline,
    offlineCall: () => devMockChecks,
  });
}

function* getAllCheck({ payload }: { payload: any }): any {
  yield apiCallHandler({
    apiPath: `/Checkes/GetAllChecks?status=${payload?.status}`,
    baseApiPath,
    dispatchSuccess: apiCallGetAllChecksSuccess,
    dispatchFailure: apiCallGetAllChecksFailure,
    mapper: mapAllChecksList,
    offlineMode: isDevelopmentOffline,
    offlineCall: () => devMockChecks,
  });
}

function* GetCheckById({ payload }: { payload: string }): any {
  yield apiCallHandler({
    apiPath: `/Checkes/GetById?Id=${payload}`,
    baseApiPath,
    dispatchSuccess: apiCallGetCheckSuccess,
    dispatchFailure: apiCallGetCheckFailure,
    offlineMode: isDevelopmentOffline,
    offlineCall: () => getDevMockCheckDetails(payload),
  });
}

function* ChecksSaga() {
  yield takeEvery(getAllChecksByCriteria, getAllCheckByCriteria);
  yield takeEvery(getAllChecks, getAllCheck);
  yield takeEvery(getCheckById, GetCheckById);
}

export default ChecksSaga;
