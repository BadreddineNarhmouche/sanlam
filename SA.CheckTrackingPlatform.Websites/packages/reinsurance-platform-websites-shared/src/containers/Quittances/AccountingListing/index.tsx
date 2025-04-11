import {
  FilterCriteriaQuittances,
  FilterCriteriaDeliverySlips,
  IQuittanceService,
  IQuittanceDetailsService,
  IDeliverySlipService,
  IDeliverySlipDetailsService,
  IPaymentService,
} from "@reinsurance/helpers";
import { Tabs, TabPanels, Grid, Button } from "@reinsurance/ui-kit";
import { useEffect, useState, useMemo } from "react";
import FormSearch from "./../FormSearch/FormSearch";
import { ACCOUNTING_FORM_SEARCH_FIELDS } from "./../constants";

import { TABS } from "./constants";

import { WORKFLOW_STEP_CODES } from "../../../constants/global";
import { AccountingDeliverySlips } from "./DeliverySlips";
import { AccountingPayment } from "./Payments";
import { DeliverySlipCreation } from "./DeliverySlipCreation";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const AccountingListing = ({
  quittanceServices,
  quittanceDetailsServices,
  deliverySlipServices,
  deliverySlipDetailsServices,
  paymentServices,
  detailsPage,
  initialFilterValues,
}: {
  quittanceServices: IQuittanceService;
  quittanceDetailsServices: IQuittanceDetailsService;
  deliverySlipServices: IDeliverySlipService;
  deliverySlipDetailsServices: IDeliverySlipDetailsService;
  paymentServices: IPaymentService;
  detailsPage: string;
  initialFilterValues: any;
}) => {
  const [filterValues, setFilterValues] = useState<any>(initialFilterValues);
  const [emptySearchResult, setEmptySearchResult] = useState({
    isEmptyResult: false,
    isSearchMode: false,
  });

  const location = useLocation();
  const useQuery = () => {
    return useMemo(() => {
      return new URLSearchParams(location.search);
    }, [location.search]);
  };
  const query = useQuery();
  const tab = query.get("tab");

  const [selectedTab, setSelectedTab] = useState(0);

  const [selectedQuittanceLine, setSelectedQuittanceLine] = useState<any[]>([]);

  const [selectedQuittanceLineId, setSelectedQuittanceLineId] = useState<any[]>(
    []
  );
  const [openConfiramtionDialog, setOpenConfiramtionDialog] = useState(false);
  const [reinsurerData, setReinsurerData] = useState<any[]>([]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const {
    responseData: PaymentsCreate,
    isLoading: isLoadingPaymentCreate,
    error: errorPaymentCreate,
  } = useSelector((state: any) => state.PaymentsCreate);

  const {
    responseData: quittanceReinsurer,
    isLoadingReinsurer,
    errorReinsurer,
  } = useSelector((state: any) => state.quittanceReinsurer);

  const PANELS = [
    {
      component: (
        <AccountingDeliverySlips
          deliverySlipServices={deliverySlipServices}
          deliverySlipDetailsServices={deliverySlipDetailsServices}
          detailsPage={detailsPage}
          initialFilterValues={initialFilterValues}
          selectedQuittanceLineId={selectedQuittanceLineId}
          setSelectedQuittanceLineId={setSelectedQuittanceLineId}
          selectedQuittanceLine={selectedQuittanceLine}
          setSelectedQuittanceLine={setSelectedQuittanceLine}
        />
      ),
    },
    {
      component: (
        <AccountingPayment
          paymentServices={paymentServices}
          deliverySlipServices={deliverySlipServices}
          deliverySlipDetailsServices={deliverySlipDetailsServices}
          detailsPage={detailsPage}
          initialFilterValues={initialFilterValues}
        />
      ),
    },
  ];

  const handleSubmitPayments = (values: FilterCriteriaQuittances) => {
    // const criteria = {
    //   ...values,
    //   workFlowStepCode: WORKFLOW_STEP_CODES.ACCOUNTING,
    //   policyReference: values.policyReference,
    //   reference: values.reference,
    //   quittanceStatusId: values.quittanceStatusId,
    // };
    // quittanceServices.getAllAccountingQuittancesByCriteria &&
    //   quittanceServices.getAllAccountingQuittancesByCriteria(criteria);

    // setEmptySearchResult({
    //   ...emptySearchResult,
    //   isSearchMode: true,
    // });
    // setFilterValues(values);
  };

  useEffect(() => {
    quittanceServices.reinsurerByAll && quittanceServices.reinsurerByAll();
  }, []);

  useEffect(() => {
    setReinsurerData(quittanceReinsurer);
  }, [quittanceReinsurer]);

  const handleSubmitDeliverySlips = (values: FilterCriteriaDeliverySlips) => {
    const criteria = {
      ...values,
      workFlowStepCode: WORKFLOW_STEP_CODES.ACCOUNTING,
      policyReference: values.policyReference,
      reference: values.reference,
      // deliverySlipStatusId: values.deliverySlipStatusId,
    };
    deliverySlipServices.getAllAccountingDeliverySlipsByCriteria &&
      deliverySlipServices.getAllAccountingDeliverySlipsByCriteria(criteria);

    setEmptySearchResult({
      ...emptySearchResult,
      isSearchMode: true,
    });
    setFilterValues(values);
  };

  useEffect(() => {
    if (PaymentsCreate.id) {
      setSelectedTab(1);
    }
  }, [PaymentsCreate]);

  useEffect(() => {
    selectedTab === 0
      ? handleSubmitPayments(initialFilterValues)
      : handleSubmitDeliverySlips(initialFilterValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFilterValues]);

  const handleResetFilter = () => {
    if (selectedTab === 0) {
      setEmptySearchResult({
        ...emptySearchResult,
        isSearchMode: false,
      });
      setFilterValues(initialFilterValues);
      deliverySlipServices.getAllAccountingDeliverySlipsByCriteria &&
        deliverySlipServices.getAllAccountingDeliverySlipsByCriteria({
          ...initialFilterValues,
          workFlowStepCode: WORKFLOW_STEP_CODES.ACCOUNTING,
          policyReference: initialFilterValues.policyReference,
          reference: initialFilterValues.reference,
          // quittanceStatusId: initialFilterValues.quittanceStatusId,
        });
    }
  };

  const handleSubmitCreateDeliverySlip = () => {
    paymentServices.CreatePayment &&
      paymentServices.CreatePayment({
        deliverySlipIds: selectedQuittanceLineId,
      });
  };

  useEffect(() => {
    if (tab !== null) {
      tab === "0" ? setSelectedTab(0) : setSelectedTab(1);
    }
  }, [tab]);

  return (
    <>
      <Grid container direction="column" px={8} py={7} id="quittance-table">
        <Grid item>
          <FormSearch
            resetedValues={initialFilterValues}
            handleSubmit={(values: any) =>
              selectedTab === 1
                ? handleSubmitPayments(values)
                : handleSubmitDeliverySlips(values)
            }
            handleResetFilter={handleResetFilter}
            initialValues={initialFilterValues}
            fieldsToDisplay={ACCOUNTING_FORM_SEARCH_FIELDS(reinsurerData)}
            URLquittanceStatusDescriptionID={1}
            isLoading={false}
          />
        </Grid>
        <Grid display="flex" justifyContent="flex-start">
          <Tabs tabs={TABS} value={selectedTab} onChange={handleChangeTab} />
          <Grid item sm>
            {" "}
          </Grid>
          {selectedTab === 0 && selectedQuittanceLineId.length > 0 && (
            <Grid item>
              <Button
                variant="contained"
                onClick={() => setOpenConfiramtionDialog(true)}
                disabled={selectedQuittanceLineId.length > 1 ? true : false}
              >
                Créer virement
              </Button>
            </Grid>
          )}
        </Grid>
        <Grid item>
          <TabPanels panels={PANELS} value={selectedTab} />
        </Grid>
      </Grid>
      <DeliverySlipCreation
        openConfiramtionDialog={openConfiramtionDialog}
        setOpenConfiramtionDialog={setOpenConfiramtionDialog}
        setSelected={setSelectedQuittanceLineId}
        handleSubmit={handleSubmitCreateDeliverySlip}
        isLoading={isLoadingPaymentCreate}
        error={errorPaymentCreate}
        responseData={PaymentsCreate}
        selectedQuittanceLine={selectedQuittanceLine}
        setSelectedQuittanceLine={setSelectedQuittanceLine}
      />
    </>
  );
};
