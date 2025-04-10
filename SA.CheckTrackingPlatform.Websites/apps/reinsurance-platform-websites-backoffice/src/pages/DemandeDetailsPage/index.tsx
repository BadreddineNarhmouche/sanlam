import { useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  IQuittanceDetailsService,
  TreatSubscriptionQuittanceItem,
  ValidateSubscriptionQuittanceItem,
  TreatRecoveryQuittanceItem,
  ValidateRecoveryQuittanceItem,
  IDeliverySlipDetailsService,
  IPaymentService,
  FilterCriteriaPayments,
  ValidatePaymentItem,
  TreatReinsuranceDeliverySlipItem,
  ValidateReinsuranceDeliverySlipItem,
  ValidateAccountingDeliverySlipItem,
} from "@reinsurance/helpers";
import { DemandeDetails } from "@reinsurance/shared";

import { getQuittanceById } from "../../store/Quittances/quittanceSlice";
import { treatSubscriptionQuittance } from "../../store/Quittances/quittanceTreatSubscriptionSlice";
import { validateSubscriptionQuittance } from "../../store/Quittances/quittanceValidateSubscriptionSlice";
import { treatRecoveryQuittance, clearTreatRecoveryQuittance } from "../../store/Quittances/quittanceTreatRecoverySlice";
import { validateRecoveryQuittance } from "../../store/Quittances/quittanceValidateRecoverySlice";
import { downloadQuittanceDocumentById } from "../../store/Quittances/quittanceDownloadDocumentByIdSlice";
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
import { CardContainer, EmptyState } from "@reinsurance/ui-kit";
import emptyStateDesk from "@reinsurance/ui-kit/src/assets/images/emptyStateDesk.svg";
import { useIntl } from "react-intl";

// payemnts
import { getPaymentByCriteria } from "../../store/Payments/PaymentByCriteriaSlice";
import { getPaymentById } from "../../store/Payments/PaymentByIdSlice";
import {
  PaymentValidate,
  clearPaymentValidate,
} from "../../store/Payments/PaymentValidateSlice";
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

// delivrySlip
import { treatReinsuranceDeliverySlip } from "../../store/DeliverySlips/deliverySlipTreatReinsuranceSlice";
import { validateReinsuranceDeliverySlip } from "../../store/DeliverySlips/deliverySlipValidateReinsuranceSlice";
import { validateAccountingDeliverySlip } from "../../store/DeliverySlips/deliverySlipValidateAccountingSlice";
import { getDeliverySlipById } from "../../store/DeliverySlips/deliverySlipSlice";
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


const DemandeDetailsPage = () => {
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
     clearTreatRecoveryQuittance:()=>{
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
  };

  const useQuery = () => {
    return useMemo(() => {
      return new URLSearchParams(location.search);
    }, [location.search]);
  };

  const query = useQuery();
  const quittanceId = query.get("quittanceId");
  let quittances = query.getAll("quittance");

  useEffect(() => {
    if (location.state) {
      quittances = location.state?.quittances;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    quittanceId && quittanceServices.getQuittanceById(quittanceId);
    quittanceId &&
      quittanceServices.getAllQuittanceDocumentsByCriteria &&
      quittanceServices.getAllQuittanceDocumentsByCriteria({ quittanceId });

    quittances &&
      quittanceServices.getAllQuittanceDocumentsByCriteria &&
      quittanceServices.getAllQuittanceDocumentsByCriteria({
        quittanceId: quittances,
      });
  }, []);

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
    };

  return (
    <>
      {quittanceId ? (
        <DemandeDetails
          id={quittanceId}
          quittanceServices={quittanceServices}
          deliverySlipService={deliverySlipServices}
          paymentService={paymentServices}
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

export default DemandeDetailsPage;
