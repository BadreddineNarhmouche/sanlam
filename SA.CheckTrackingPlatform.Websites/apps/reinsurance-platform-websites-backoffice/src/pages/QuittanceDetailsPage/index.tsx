import { useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  IQuittanceDetailsService,
  TreatSubscriptionQuittanceItem,
  ValidateSubscriptionQuittanceItem,
  TreatRecoveryQuittanceItem,
  ValidateRecoveryQuittanceItem,
  TreatReinsuranceDeliverySlipItem,
  ValidateReinsuranceDeliverySlipItem,
  ValidateAccountingDeliverySlipItem,
  IDeliverySlipDetailsService,
  IPaymentService,
  ValidatePaymentItem,
  FilterCriteriaPayments,
  IBankService,
} from "@reinsurance/helpers";
import {
  QuittanceDetails,
  DeliverySlipDetails,
  PaymentDetails,
} from "@reinsurance/shared";

import { getQuittanceById } from "../../store/Quittances/quittanceSlice";
import { treatSubscriptionQuittance } from "../../store/Quittances/quittanceTreatSubscriptionSlice";
import { validateSubscriptionQuittance } from "../../store/Quittances/quittanceValidateSubscriptionSlice";
import {
  treatRecoveryQuittance,
  clearTreatRecoveryQuittance,
} from "../../store/Quittances/quittanceTreatRecoverySlice";
import { validateRecoveryQuittance } from "../../store/Quittances/quittanceValidateRecoverySlice";
import { treatReinsuranceDeliverySlip } from "../../store/DeliverySlips/deliverySlipTreatReinsuranceSlice";
import { validateReinsuranceDeliverySlip } from "../../store/DeliverySlips/deliverySlipValidateReinsuranceSlice";
import { validateAccountingDeliverySlip } from "../../store/DeliverySlips/deliverySlipValidateAccountingSlice";
import { getDeliverySlipById } from "../../store/DeliverySlips/deliverySlipSlice";
import { downloadQuittanceDocumentById } from "../../store/Quittances/quittanceDownloadDocumentByIdSlice";
import { getPaymentByCriteria } from "../../store/Payments/PaymentByCriteriaSlice";
import { getPaymentById } from "../../store/Payments/PaymentByIdSlice";
import {
  PaymentValidate,
  clearPaymentValidate,
} from "../../store/Payments/PaymentValidateSlice";
import {
  getQuittanceDocumentById,
  clearGetQuittanceDocumentById,
} from "../../store/Quittances/quittanceGetDocumentByIdSlice";
import { downloadQuittanceDocumentByCriteria } from "../../store/Quittances/quittanceDownloadDocumentByCriteriaSlice";
import {
  getQuittanceDocumentByCriteria,
  clearGetQuittanceDocumentByCriteria,
} from "../../store/Quittances/quittanceGetDocumentByCriteriaSlice";
import { getQuittancePaymentByQuittanceId } from "../../store/Quittances/quittanceGetPaymentByIdSlice";
import { getAllQuittanceDocumentsByCriteria } from "../../store/Quittances/quittanceGetAllDocumentsByCriteriaSlice";
import {
  submitDocumentsQuittance,
  clearSubmitDocumentsQuittance,
} from "../../store/Quittances/quittanceSubmitDocumentsSlice";
import { downloadDeliverySlipDocumentById } from "../../store/DeliverySlips/deliverySlipDownloadDocumentByIdSlice";
import {
  clearGetDeliverySlipDocumentById,
  getDeliverySlipDocumentById,
} from "../../store/DeliverySlips/deliverySlipGetDocumentByIdSlice";
import { downloadDeliverySlipDocumentByCriteria } from "../../store/DeliverySlips/deliverySlipDownloadDocumentByCriteriaSlice";
import {
  clearGetDeliverySlipDocumentByCriteria,
  getDeliverySlipDocumentByCriteria,
} from "../../store/DeliverySlips/deliverySlipGetDocumentByCriteriaSlice";
import { getAllDeliverySlipDocumentsByCriteria } from "../../store/DeliverySlips/deliverySlipGetAllDocumentsByCriteriaSlice";
import {
  clearSubmitDocumentsDeliverySlip,
  submitDocumentsDeliverySlip,
} from "../../store/DeliverySlips/deliverySlipSubmitDocumentsSlice";
import { getBankByAll } from "../../store/Bank/BankByAllSlice";
import { GetAllCurrencies } from "../../store/Currencies/GetAllCurrenciesSlice";
import { CardContainer, EmptyState } from "@reinsurance/ui-kit";
import emptyStateDesk from "@reinsurance/ui-kit/src/assets/images/emptyStateDesk.svg";
import { useIntl } from "react-intl";
import { WorkflowRollBack } from "../../store/Workflow/WorkflowRollBackSlice";
import { clearPUTWorkflowRollBack } from "../../store/Workflow/WorkflowRollBackSlice";
import { downloadPaymentDocumentById } from "../../store/Payments/PaymentsDownloadDocumentByIdSlice";
import {
  clearGetPaymentsDocumentById,
  getPaymentsDocumentById,
} from "../../store/Payments/PaymentsGetDocumentByIdSlice";
import { downloadPaymentDocumentByCriteria } from "../../store/Payments/PaymentsDownloadDocumentByCriteriaSlice";
import {
  clearGetPaymentsDocumentByCriteria,
  getPaymentsDocumentByCriteria,
} from "../../store/Payments/PaymentsGetDocumentByCriteriaSlice";
import { getAllPaymentsDocumentsByCriteria } from "../../store/Payments/PaymentsGetAllDocumentsByCriteriaSlice";

const QuittanceDetailsPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const intl = useIntl();

  const quittanceServices: IQuittanceDetailsService = {
    getQuittanceById: (id: string) => dispatch(getQuittanceById(id)),
    treatSubscriptionQuittance: (payload: TreatSubscriptionQuittanceItem) => {
      dispatch(treatSubscriptionQuittance(payload));
    },
    validateSubscriptionQuittance: (
      payload: ValidateSubscriptionQuittanceItem
    ) => {
      dispatch(validateSubscriptionQuittance(payload));
    },
    treatRecoveryQuittance: (payload: TreatRecoveryQuittanceItem) => {
      dispatch(treatRecoveryQuittance(payload));
    },
    clearTreatRecoveryQuittance: () => {
      dispatch(clearTreatRecoveryQuittance());
    },
    validateRecoveryQuittance: (payload: ValidateRecoveryQuittanceItem) => {
      dispatch(validateRecoveryQuittance(payload));
    },
    downloadQuittanceDocumentById: (payload: any) => {
      dispatch(downloadQuittanceDocumentById(payload));
    },
    getQuittanceDocumentById: (payload: any) => {
      dispatch(getQuittanceDocumentById(payload));
    },
    clearGetQuittanceDocumentById: () => {
      dispatch(clearGetQuittanceDocumentById());
    },
    downloadQuittanceDocumentByCriteria: (payload: any) => {
      dispatch(downloadQuittanceDocumentByCriteria(payload));
    },
    getQuittanceDocumentByCriteria: (payload: any) => {
      dispatch(getQuittanceDocumentByCriteria(payload));
    },
    getQuittancePaymentByQuittanceId: (payload: any) => {
      dispatch(getQuittancePaymentByQuittanceId(payload));
    },
    clearGetQuittanceDocumentByCriteria: () => {
      dispatch(clearGetQuittanceDocumentByCriteria());
    },
    getAllQuittanceDocumentsByCriteria: (payload: any) => {
      dispatch(getAllQuittanceDocumentsByCriteria(payload));
    },
    submitDocumentsQuittance: (payload: any) => {
      dispatch(submitDocumentsQuittance(payload));
    },
    clearSubmitDocumentsQuittance: () => {
      dispatch(clearSubmitDocumentsQuittance());
    },
    PutWorkFlowRollBack: (payload: any) => dispatch(WorkflowRollBack(payload)),
    clearPUTWorkflowRollBack: () => {
      dispatch(clearPUTWorkflowRollBack());
    },
  };

  const deliverySlipServices: IDeliverySlipDetailsService = {
    getDeliverySlipById: (id: string) => dispatch(getDeliverySlipById(id)),
    treatReinsuranceDeliverySlip: (
      payload: TreatReinsuranceDeliverySlipItem
    ) => {
      dispatch(treatReinsuranceDeliverySlip(payload));
    },
    validateReinsuranceDeliverySlip: (
      payload: ValidateReinsuranceDeliverySlipItem
    ) => {
      dispatch(validateReinsuranceDeliverySlip(payload));
    },
    validateAccountingDeliverySlip: (
      payload: ValidateAccountingDeliverySlipItem
    ) => {
      dispatch(validateAccountingDeliverySlip(payload));
    },
    downloadDeliverySlipDocumentById: (payload: any) => {
      dispatch(downloadDeliverySlipDocumentById(payload));
    },
    getDeliverySlipDocumentById: (payload: any) => {
      dispatch(getDeliverySlipDocumentById(payload));
    },
    clearGetDeliverySlipDocumentById: () => {
      dispatch(clearGetDeliverySlipDocumentById());
    },
    downloadDeliverySlipDocumentByCriteria: (payload: any) => {
      dispatch(downloadDeliverySlipDocumentByCriteria(payload));
    },
    getDeliverySlipDocumentByCriteria: (payload: any) => {
      dispatch(getDeliverySlipDocumentByCriteria(payload));
    },
    clearGetDeliverySlipDocumentByCriteria: () => {
      dispatch(clearGetDeliverySlipDocumentByCriteria());
    },
    getAllDeliverySlipDocumentsByCriteria: (payload: any) => {
      dispatch(getAllDeliverySlipDocumentsByCriteria(payload));
    },
    submitDocumentsDeliverySlip: (payload: any) => {
      dispatch(submitDocumentsDeliverySlip(payload));
    },
    clearSubmitDocumentsDeliverySlip: () => {
      dispatch(clearSubmitDocumentsDeliverySlip());
    },
    PutWorkFlowRollBack: (payload: any) => dispatch(WorkflowRollBack(payload)),
    clearPUTWorkflowRollBack: () => {
      dispatch(clearPUTWorkflowRollBack());
    },
  };

  const paymentServices: IPaymentService = {
    getPaymentByCriteria: (criteria: FilterCriteriaPayments) =>
      dispatch(getPaymentByCriteria(criteria)),
    getPaymentById: (id: string) => dispatch(getPaymentById(id)),
    ValidatePayment: (payload: ValidatePaymentItem) =>
      dispatch(PaymentValidate(payload)),
    clearPaymentValidate: () => {
      dispatch(clearPaymentValidate());
    },
    downloadPaymentDocumentById: (payload: any) => {
      dispatch(downloadPaymentDocumentById(payload));
    },
    getPaymentDocumentById: (payload: any) => {
      dispatch(getPaymentsDocumentById(payload));
    },
    clearGetPaymentDocumentById: () => {
      dispatch(clearGetPaymentsDocumentById());
    },
    downloadPaymentDocumentByCriteria: (payload: any) => {
      dispatch(downloadPaymentDocumentByCriteria(payload));
    },
    getPaymentDocumentByCriteria: (payload: any) => {
      dispatch(getPaymentsDocumentByCriteria(payload));
    },
    clearGetPaymentDocumentByCriteria: () => {
      dispatch(clearGetPaymentsDocumentByCriteria());
    },
    getAllPaymentDocumentsByCriteria: (payload: any) => {
      dispatch(getAllPaymentsDocumentsByCriteria(payload));
    },
  };

  const bankServices: IBankService = {
    getBankByAll: () => dispatch(getBankByAll()),
    GetAllCurrencies: () => dispatch(GetAllCurrencies()),
  };

  const useQuery = () => {
    return useMemo(() => {
      return new URLSearchParams(location.search);
    }, [location.search]);
  };

  const query = useQuery();
  const quittanceId = query.get("quittanceId");
  const paymentId = query.get("paymentId");
  let deliverySlipId = query.get("deliverySlipId");
  let quittances = query.getAll("quittance");

  useEffect(() => {
    if (location.state) {
      quittances = location.state?.quittances;
      deliverySlipId = location.state?.deliverySlipId;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    quittanceId !== null && quittanceServices.getQuittanceById(quittanceId);
    quittanceId &&
      quittanceServices.getAllQuittanceDocumentsByCriteria &&
      quittanceServices.getAllQuittanceDocumentsByCriteria({ quittanceId });

    quittances.length > 0 &&
      quittanceServices.getAllQuittanceDocumentsByCriteria &&
      quittanceServices.getAllQuittanceDocumentsByCriteria({
        quittanceId: quittances,
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    deliverySlipId && deliverySlipServices.getDeliverySlipById(deliverySlipId);
    deliverySlipId &&
      deliverySlipServices.getAllDeliverySlipDocumentsByCriteria &&
      deliverySlipServices.getAllDeliverySlipDocumentsByCriteria({
        deliverySlipId,
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    paymentId && deliverySlipServices.getDeliverySlipById(paymentId);
    paymentId &&
      paymentServices.getAllPaymentDocumentsByCriteria &&
      paymentServices.getAllPaymentDocumentsByCriteria({
        paymentId,
      });
  }, []);

  return (
    <>
      {quittanceId ? (
        <QuittanceDetails
          id={quittanceId}
          quittanceServices={quittanceServices}
        />
      ) : paymentId ? (
        <PaymentDetails
          id={paymentId}
          paymentServices={paymentServices}
          quittanceServices={quittanceServices}
          deliverySlipServices={deliverySlipServices}
        />
      ) : deliverySlipId ? (
        <DeliverySlipDetails
          id={deliverySlipId}
          deliverySlipServices={deliverySlipServices}
          bankServices={bankServices}
        />
      ) : (
        <CardContainer px={8} pt={8} pb={15.5}>
          <EmptyState
            title={intl.formatMessage({ id: "demands.empty.title" })}
            subTitle={""}
            image={emptyStateDesk}
          />
        </CardContainer>
      )}
    </>
  );
};

export default QuittanceDetailsPage;
