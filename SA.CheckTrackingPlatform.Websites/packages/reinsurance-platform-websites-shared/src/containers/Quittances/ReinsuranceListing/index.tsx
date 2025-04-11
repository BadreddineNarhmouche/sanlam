import {
  FilterCriteriaQuittances,
  FilterCriteriaDeliverySlips,
  IQuittanceService,
  IQuittanceDetailsService,
  IDeliverySlipService,
  IDeliverySlipDetailsService,
} from "@reinsurance/helpers";
import { Tabs, TabPanels, Grid, Button } from "@reinsurance/ui-kit";
import { useEffect, useMemo, useState } from "react";
import FormSearch from "./../FormSearch/FormSearch";
import { REINSURANCE_FORM_SEARCH_FIELDS } from "./../constants";

import { TABS } from "./constants";

import { WORKFLOW_STEP_CODES } from "../../../constants/global";
import { ReinsuranceDeliverySlips } from "./DeliverySlips";
import { ReinsuranceQuittances } from "./Quittances";
import { DeliverySlipCreation } from "./DeliverySlipCreation";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const ReinsuranceListing = ({
  quittanceServices,
  quittanceDetailsServices,
  deliverySlipServices,
  deliverySlipDetailsServices,
  detailsPage,
  initialFilterValues,
}: {
  quittanceServices: IQuittanceService;
  quittanceDetailsServices: IQuittanceDetailsService;
  deliverySlipServices: IDeliverySlipService;
  deliverySlipDetailsServices: IDeliverySlipDetailsService;
  detailsPage: string;
  initialFilterValues: any;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const useQuery = () => {
    return useMemo(() => {
      return new URLSearchParams(location.search);
    }, [location.search]);
  };

  const query = useQuery();
  const tab = query.get("tab");

  const [filterValues, setFilterValues] = useState<any>(initialFilterValues);
  const [emptySearchResult, setEmptySearchResult] = useState({
    isEmptyResult: false,
    isSearchMode: false,
  });

  const [selectedTab, setSelectedTab] = useState(0);

  const [selectedQuittanceLine, setSelectedQuittanceLine] = useState<any[]>([]);

  const [selectedQuittanceLineId, setSelectedQuittanceLineId] = useState<any[]>(
    []
  );

  const [openConfiramtionDialog, setOpenConfiramtionDialog] = useState(false);
  const [reinsurerData, setReinsurerData] = useState<any[]>([]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    if (newValue === 0) {
      navigate("/");
    }
  };

  const {
    responseData: deliverySlipCreate,
    isLoading: isLoadingDeliverySlipCreate,
    error: errorDeliverySlipCreate,
  } = useSelector((state: any) => state.deliverySlipCreate);

  const {
    responseData: quittanceReinsurer,
    isLoadingReinsurer,
    errorReinsurer,
  } = useSelector((state: any) => state.quittanceReinsurer);

  const PANELS = [
    {
      component: (
        <ReinsuranceQuittances
          quittanceServices={quittanceServices}
          quittanceDetailsServices={quittanceDetailsServices}
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
        <ReinsuranceDeliverySlips
          deliverySlipServices={deliverySlipServices}
          deliverySlipDetailsServices={deliverySlipDetailsServices}
          detailsPage={detailsPage}
          initialFilterValues={initialFilterValues}
        />
      ),
    },
  ];

  const handleSubmitQuittances = (values: FilterCriteriaQuittances) => {
    const criteria = {
      ...values,
      workFlowStepCode: WORKFLOW_STEP_CODES.REINSURANCES,
      policyReference: values.policyReference,
      reference: values.reference,
      quittanceStatusId: values.quittanceStatusId,
    };
    quittanceServices.getAllReinsuranceQuittancesByCriteria &&
      quittanceServices.getAllReinsuranceQuittancesByCriteria(criteria);

    quittanceServices.reinsurerByAll && quittanceServices.reinsurerByAll();

    setEmptySearchResult({
      ...emptySearchResult,
      isSearchMode: true,
    });
    setFilterValues(values);
  };

  const handleSubmitDeliverySlips = (values: FilterCriteriaDeliverySlips) => {
    // const criteria = {
    //   ...values,
    //   workFlowStepCode: WORKFLOW_STEP_CODES.REINSURANCES,
    //   policyReference: values.policyReference,
    //   reference: values.reference,
    //   deliverySlipStatusId: values.deliverySlipStatusId,
    // };
    // deliverySlipServices.getAllReinsuranceDeliverySlipsByCriteria &&
    //   deliverySlipServices.getAllReinsuranceDeliverySlipsByCriteria(criteria);

    // setEmptySearchResult({
    //   ...emptySearchResult,
    //   isSearchMode: true,
    // });
    // setFilterValues(values);
  };

  const handleSubmitCreateDeliverySlip = () => {
    deliverySlipServices.createDeliverySlip &&
      deliverySlipServices.createDeliverySlip({
        quittanceLineIds: selectedQuittanceLineId,
      });
  };

  useEffect(() => {
    if (deliverySlipCreate.id) {
      setSelectedTab(1);
    }
  }, [deliverySlipCreate]);

  useEffect(() => {
    setReinsurerData(quittanceReinsurer);
  }, [quittanceReinsurer]);

  useEffect(() => {
    if (!openConfiramtionDialog) {
      quittanceServices.clearGetAllReinsuranceQuittancesByCriteria &&
        quittanceServices.clearGetAllReinsuranceQuittancesByCriteria();

      handleSubmitQuittances(initialFilterValues);
    }
  }, [openConfiramtionDialog]);

  useEffect(() => {
    if (tab !== null) {
      tab === "0" ? setSelectedTab(0) : setSelectedTab(1);
    }
  }, [tab]);

  useEffect(() => {
    selectedTab === 0
      ? handleSubmitQuittances(initialFilterValues)
      : handleSubmitDeliverySlips(initialFilterValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  const handleResetFilter = () => {
    setEmptySearchResult({
      ...emptySearchResult,
      isSearchMode: false,
    });
    setFilterValues(initialFilterValues);
    quittanceServices.getAllReinsuranceQuittancesByCriteria &&
      quittanceServices.getAllReinsuranceQuittancesByCriteria({
        ...initialFilterValues,
        workFlowStepCode: WORKFLOW_STEP_CODES.REINSURANCES,
        policyReference: initialFilterValues.policyReference,
        reference: initialFilterValues.reference,
        quittanceStatusId: initialFilterValues.quittanceStatusId,
      });
  };

  return (
    <>
      <Grid container direction="column" px={8} py={7} id="quittance-table">
        <Grid item>
          <FormSearch
            resetedValues={initialFilterValues}
            handleSubmit={(values: any) =>
              selectedTab === 0
                ? handleSubmitQuittances(values)
                : handleSubmitDeliverySlips(values)
            }
            handleResetFilter={handleResetFilter}
            initialValues={initialFilterValues}
            fieldsToDisplay={REINSURANCE_FORM_SEARCH_FIELDS(reinsurerData)}
            URLquittanceStatusDescriptionID={1}
            isLoading={false}
          />
        </Grid>
        <Grid display="flex" justifyContent="flex-start">
          <Grid item>
            <Tabs tabs={TABS} value={selectedTab} onChange={handleChangeTab} />
          </Grid>
          <Grid item sm>
            {" "}
          </Grid>
          {selectedTab === 0 && selectedQuittanceLineId.length > 0 && (
            <Grid item>
              <Button
                variant="contained"
                onClick={() => setOpenConfiramtionDialog(true)}
              >
                Grouper
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
        isLoading={isLoadingDeliverySlipCreate}
        error={errorDeliverySlipCreate}
        responseData={deliverySlipCreate}
        selectedQuittanceLine={selectedQuittanceLine}
        setSelectedQuittanceLine={setSelectedQuittanceLine}
      />
    </>
  );
};
