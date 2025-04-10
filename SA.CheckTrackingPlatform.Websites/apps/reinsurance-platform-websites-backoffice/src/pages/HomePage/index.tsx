import {
  IQuittanceService,
  IQuittanceDetailsService,
  FilterCriteriaQuittances,
  IDeliverySlipService,
  IDeliverySlipDetailsService,
  IPaymentService,
  FilterCriteriaDeliverySlips,
  CreateDeliverySlipItem,
  FilterCriteriaPayments,
  CreatePayment,
  ValidatePaymentItem,
  IKPIsService,
} from "@reinsurance/helpers";
import { HomePages } from "@reinsurance/shared";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllSubscriptionQuittancesByCriteria } from "../../store/Quittances/quittancesSubscriptionListSlice";
import { getAllRecoveryQuittancesByCriteria } from "../../store/Quittances/quittancesRecoveryListSlice";
import {
  getAllReinsuranceQuittancesByCriteria,
  clearGetAllReinsuranceQuittancesByCriteria,
} from "../../store/Quittances/quittancesReinsuranceListSlice";
import { getAllAccountingQuittancesByCriteria } from "../../store/Quittances/quittancesAccountingListSlice";
import { getAllOtherQuittancesByCriteria } from "../../store/Quittances/quittancesOtherListSlice";
import {
  getQuittanceById,
  clearGetQuittanceById,
} from "../../store/Quittances/quittanceSlice";
import { getAllReinsuranceDeliverySlipsByCriteria } from "../../store/DeliverySlips/deliverySlipsReinsuranceListSlice";
import { getAllAccountingDeliverySlipsByCriteria } from "../../store/DeliverySlips/deliverySlipsAccountingListSlice";
import {
  getDeliverySlipById,
  clearGetDeliverySlipById,
} from "../../store/DeliverySlips/deliverySlipSlice";
import { getPaymentByCriteria } from "../../store/Payments/PaymentByCriteriaSlice";
import { getPaymentById } from "../../store/Payments/PaymentByIdSlice";
import { PaymentCreate } from "../../store/Payments/PaymentCreateSlice";
import { PAGES } from "../../config/navigation";
import { createDeliverySlip } from "../../store/DeliverySlips/deliverySlipCreateSlice";
import {
  PaymentValidate,
  clearPaymentValidate,
} from "../../store/Payments/PaymentValidateSlice";
import { quittanceAnnotationByAll } from "../../store/Quittances/quittanceAnnotationByAllSlice";
import { quittanceAnnotationCreate } from "../../store/Quittances/quittanceAnnotationCreateSlice";
import { reinsurerAll } from "../../store/Quittances/reinsurerSlice";
import { quittanceStatusCIOL } from "../../store/Quittances/quittanceStatusCIOLSlice";
import { quittanceStatusByAll } from "../../store/Quittances/quittanceStatusByAllSlice";
import { exportAllQuittance } from "../../store/Quittances/exportAllQuittanceSlice";
import { clearTreatRecoveryQuittance } from "../../store/Quittances/quittanceTreatRecoverySlice";

// KPIs
import { GetCountRecoveries } from "../../store/KPI/RecoveriesKPISlice";
import { GetCountReinsurances } from "../../store/KPI/ReinsurancesKPISlice";
import { exportFileExcelRenovel } from "../../store/KPI/exportFileExcelRenovelSlice";

//WorkFlow
import { WorkflowRollBack } from "../../store/Workflow/WorkflowRollBackSlice";
import { clearPUTWorkflowRollBack } from "../../store/Workflow/WorkflowRollBackSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  const quittanceServices: IQuittanceService = {
    getAllSubscriptionQuittancesByCriteria: (
      criteria: FilterCriteriaQuittances
    ) => dispatch(getAllSubscriptionQuittancesByCriteria(criteria)),
    getAllRecoveryQuittancesByCriteria: (criteria: FilterCriteriaQuittances) =>
      dispatch(getAllRecoveryQuittancesByCriteria(criteria)),
    getAllReinsuranceQuittancesByCriteria: (
      criteria: FilterCriteriaQuittances
    ) => dispatch(getAllReinsuranceQuittancesByCriteria(criteria)),
    getAllAccountingQuittancesByCriteria: (
      criteria: FilterCriteriaQuittances
    ) => dispatch(getAllAccountingQuittancesByCriteria(criteria)),
    getAllOtherQuittancesByCriteria: (criteria: FilterCriteriaQuittances) =>
      dispatch(getAllOtherQuittancesByCriteria(criteria)),
    clearGetQuittanceById: () => {
      dispatch(clearGetQuittanceById());
    },
    clearGetAllReinsuranceQuittancesByCriteria: () => {
      dispatch(clearGetAllReinsuranceQuittancesByCriteria());
    },
    quittanceAnnotationByAll: () => {
      dispatch(quittanceAnnotationByAll());
    },
    quittanceAnnotationCreate: (payload: any) => {
      dispatch(quittanceAnnotationCreate(payload));
    },
    reinsurerByAll: () => {
      dispatch(reinsurerAll());
    },
    getStatusCIOL: () => {
      dispatch(quittanceStatusCIOL());
    },
    ExportAllQuittance: (payload: any) => {
      dispatch(exportAllQuittance(payload));
    },
    getQuittanceStatus: (payload: any) => {
      dispatch(quittanceStatusByAll(payload));
    },
  };

  const quittanceDetailsServices: IQuittanceDetailsService = {
    getQuittanceById: (id: string) => dispatch(getQuittanceById(id)),
    PutWorkFlowRollBack: (payload: any) => dispatch(WorkflowRollBack(payload)),
    clearTreatRecoveryQuittance: () => {
      dispatch(clearTreatRecoveryQuittance());
    },
    clearPUTWorkflowRollBack: () => {
      dispatch(clearPUTWorkflowRollBack());
    },
  };

  const deliverySlipServices: IDeliverySlipService = {
    getAllReinsuranceDeliverySlipsByCriteria: (
      criteria: FilterCriteriaDeliverySlips
    ) => dispatch(getAllReinsuranceDeliverySlipsByCriteria(criteria)),
    getAllAccountingDeliverySlipsByCriteria: (
      criteria: FilterCriteriaDeliverySlips
    ) => dispatch(getAllAccountingDeliverySlipsByCriteria(criteria)),
    clearGetDeliverySlipById: () => {
      dispatch(clearGetDeliverySlipById());
    },
    createDeliverySlip: (payload: CreateDeliverySlipItem) => {
      dispatch(createDeliverySlip(payload));
    },
    PutWorkFlowRollBack: (payload: any) => dispatch(WorkflowRollBack(payload)),
    clearPUTWorkflowRollBack: () => {
      dispatch(clearPUTWorkflowRollBack());
    },
  };

  const deliverySlipDetailsServices: IDeliverySlipDetailsService = {
    getDeliverySlipById: (id: string) => dispatch(getDeliverySlipById(id)),
    PutWorkFlowRollBack: (payload: any) => dispatch(WorkflowRollBack(payload)),
    clearPUTWorkflowRollBack: () => {
      dispatch(clearPUTWorkflowRollBack());
    },
  };

  const paymentServices: IPaymentService = {
    getPaymentByCriteria: (criteria: FilterCriteriaPayments) =>
      dispatch(getPaymentByCriteria(criteria)),
    getPaymentById: (id: string) => dispatch(getPaymentById(id)),
    CreatePayment: (payload: CreatePayment) => dispatch(PaymentCreate(payload)),
    ValidatePayment: (payload: ValidatePaymentItem) =>
      dispatch(PaymentValidate(payload)),
    clearPaymentValidate: () => {
      dispatch(clearPaymentValidate());
    },
  };

  const KPIsService: IKPIsService = {
    GetCountRecoveries: () => dispatch(GetCountRecoveries()),
    GetCountReinsurances: () => dispatch(GetCountReinsurances()),
    ExportFileExcelRenovel: () => dispatch(exportFileExcelRenovel({})),
  };

  const filterValues: FilterCriteriaQuittances = {
    reference: "",
    quittanceStatusId: "",
    policyReference: "",
    externalPartnerUserCode: "",
    externalReinsuranceReference: "",
    primeNetMin: "",
    primeNetMax: "",
    dateCreation: "",
    externalClientName: "",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HomePages
        quittanceServices={quittanceServices}
        quittanceDetailsServices={quittanceDetailsServices}
        deliverySlipServices={deliverySlipServices}
        deliverySlipDetailsServices={deliverySlipDetailsServices}
        paymentServices={paymentServices}
        KPIsService={KPIsService}
        detailsPage={PAGES.QUITTANCE_DETAILS}
        demandsProducerLink={PAGES.DEMANDS_PRODUCER}
        initialFilterValues={filterValues}
      />
    </>
  );
};

export default HomePage;
