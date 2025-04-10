import { all } from "redux-saga/effects";
import notificationsSaga from "./Notifications/notificationsSaga";
import internalRolesSaga from "./InternalRoles/internalRolesSaga";
import quittancesSaga from "./Quittances/quittancesSaga";
import deliverySlipsSaga from "./DeliverySlips/deliverySlipsSaga";
import PaymentsSaga from "./Payments/PaymentsSaga";
import BanksSaga from "./Bank/BanksSaga";
import CurrenciesSaga from "./Currencies/CurrenciesSaga";
import KPIsSaga from "./KPI/KPIsSaga";
import WorkflowSaga from "./Workflow/WorkflowSaga";

export const rootSaga = function* sagas() {
  yield all([
    quittancesSaga(),
    notificationsSaga(),
    internalRolesSaga(),
    deliverySlipsSaga(),
    PaymentsSaga(),
    BanksSaga(),
    CurrenciesSaga(),
    KPIsSaga(),
    WorkflowSaga(),
  ]);
};
