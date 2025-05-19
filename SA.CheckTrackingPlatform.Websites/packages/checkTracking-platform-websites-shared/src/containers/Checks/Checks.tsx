import {
  FilterCriteriaChecks,
  IChecksService,
  IStatusService,
  PAGINATION,
} from "@checkTracking/helpers";
import {
  Backdrop,
  CardContainer,
  EmptyState,
  Grid,
  Skeleton,
  Stack,
  Table,
} from "@checkTracking/ui-kit";
import { useIntl } from "react-intl";
import {
  FIRST_PAGE_QUITTANCE_FORM_SEARCH_FIELDS,
  FIRST_PAGE_QUITTANCE_TABLE_COLUMNS_DEFAULT,
  FIRST_PAGE_QUITTANCE_TABLE_HIDDEN_COLUMNS_DEFAULT,
} from "./constants";
import FormSearch from "./FormSearch/FormSearch";
import { useEffect, useState } from "react";
import emptyStateDesk from "@checkTracking/ui-kit/src/assets/images/emptyStateDesk.svg";
import emptyStatePerson from "@checkTracking/ui-kit/src/assets/images/emptyStatePerson.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Checks = ({
  services,
  statusServices,
  detailsPage,
  initialFilterValues,
}: {
  services: IChecksService;
  statusServices: IStatusService;
  detailsPage: string;
  initialFilterValues: FilterCriteriaChecks;
}) => {
  const [filterValues, setFilterValues] = useState<any>(initialFilterValues);
  const [emptySearchResult, setEmptySearchResult] = useState({
    isEmptyResult: false,
    isSearchMode: false,  
  });
  const [checksData, setChecksData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);
  const intl = useIntl();
  const navigate = useNavigate();

  const handleSubmit = (values: FilterCriteriaChecks) => {
    const criteria = {
      ...values,
      // workFlowStepCode: WORKFLOW_STEP_CODES.SUBSCRIPTIONS,
      policyReference: values.policyReference,
      reference: values.reference,
      quittanceStatusId: values.quittanceStatusId,
      externalPartnerUserCode: values.externalPartnerUserCode,
      // externalReinsuranceReference: values.externalReinsuranceReference,
      primeNetMin: values.primeNetMin,
      primeNetMax: values.primeNetMax,
    };
    services.getAllChecksByCriteria &&
      services.getAllChecksByCriteria(criteria);

    statusServices.getAllStatus && statusServices.getAllStatus();

    setEmptySearchResult({
      ...emptySearchResult,
      isSearchMode: true,
    });
    setFilterValues(values);
  };

  const {
    responseData: getAllChecks,
    meta: checksMeta,
    isLoading: isLoadingQuittancesData,
    error: errorQuittancesData,
  } = useSelector((state: any) => state.getAllChecks);

  const {
    responseData: AllStatus,
    isLoading: isLoadingStatusData,
    error: errorStatusData,
  } = useSelector((state: any) => state.AllStatus);

  useEffect(() => {
    handleSubmit(initialFilterValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFilterValues]);

  const handleOnPageChange = (page: number) => {
    services.getAllChecksByCriteria &&
      services.getAllChecksByCriteria({
        ...filterValues,
        // workFlowStepCode: WORKFLOW_STEP_CODES.SUBSCRIPTIONS,
        policyReference: filterValues.policyReference,
        reference: filterValues.reference,
        quittanceStatusId: filterValues.quittanceStatusId,
        externalPartnerUserCode: filterValues.externalPartnerUserCode,
        externalReinsuranceReference: filterValues.externalReinsuranceReference,
        primeNetMin: filterValues.primeNetMin,
        primeNetMax: filterValues.primeNetMax,
        meta: {
          pageIndex: page,
          pageSize: PAGINATION.PAGE_SIZE,
        },
      });

    statusServices.getAllStatus && statusServices.getAllStatus();
  };

  const handleResetFilter = () => {
    setEmptySearchResult({
      ...emptySearchResult,
      isSearchMode: false,
    });
    setFilterValues(initialFilterValues);
    services.getAllChecksByCriteria &&
      services.getAllChecksByCriteria({
        ...initialFilterValues,
        // workFlowStepCode: WORKFLOW_STEP_CODES.SUBSCRIPTIONS,
        policyReference: initialFilterValues.policyReference,
        reference: initialFilterValues.reference,
        quittanceStatusId: initialFilterValues.quittanceStatusId,
        externalPartnerUserCode: initialFilterValues.externalPartnerUserCode,
        // externalReinsuranceReference:
        // initialFilterValues.externalReinsuranceReference,
        primeNetMin: initialFilterValues.primeNetMin,
        primeNetMax: initialFilterValues.primeNetMax,
      });
  };

  useEffect(() => {
    setChecksData(getAllChecks);
  }, [getAllChecks]);

  useEffect(() => {
    setStatusData(AllStatus);
  }, [AllStatus]);

  return (
    <Grid container direction="column" px={8} py={7} id="quittance-table">
      <Grid item>
        <FormSearch
          resetedValues={initialFilterValues}
          handleSubmit={(values: any) => handleSubmit(values)}
          handleResetFilter={handleResetFilter}
          initialValues={initialFilterValues}
          fieldsToDisplay={FIRST_PAGE_QUITTANCE_FORM_SEARCH_FIELDS(statusData)}
          URLquittanceStatusDescriptionID={1}
          isLoading={false}
        />
      </Grid>
      {isLoadingQuittancesData ? (
        <Stack spacing={2} mt={3}>
          <Skeleton variant="rectangular" mt={2} height={100} />
          <Skeleton variant="rectangular" mt={2} height={100} />
          <Skeleton variant="rectangular" mt={2} height={100} />
        </Stack>
      ) : errorQuittancesData ? (
        <CardContainer mt={3}>
          <EmptyState
            title={intl.formatMessage({
              id: "error.api.title",
            })}
            subTitle={intl.formatMessage({
              id: "error.api.subTitle",
            })}
          />
        </CardContainer>
      ) : checksData?.length > 0 ? (
        <Table
          isCollapsable={true}
          rows={checksData}
          columns={FIRST_PAGE_QUITTANCE_TABLE_COLUMNS_DEFAULT}
          hiddenColumns={FIRST_PAGE_QUITTANCE_TABLE_HIDDEN_COLUMNS_DEFAULT}
          onClickDetailRow={(row: any) => {
            navigate(`${detailsPage}?checkId=${row.id}`);
          }}
          pagination={{
            meta: checksMeta,
            handleOnChangePage: (page: number) => handleOnPageChange(page),
          }}
        />
      ) : (
        <CardContainer px={8} pt={8} pb={15.5}>
          <EmptyState
            title={
              emptySearchResult.isEmptyResult && emptySearchResult.isSearchMode
                ? intl.formatMessage({
                    id: "quittances.searchResult.empty.title",
                  })
                : intl.formatMessage({ id: "empty_state.title" })
            }
            subTitle={
              emptySearchResult.isEmptyResult && emptySearchResult.isSearchMode
                ? intl.formatMessage({
                    id: "quittances.empty.subTitle",
                  })
                : intl.formatMessage({
                    id: "quittances.empty.subTitle",
                  })
            }
            image={
              emptySearchResult.isEmptyResult && emptySearchResult.isSearchMode
                ? emptyStatePerson
                : emptyStateDesk
            }
          />
        </CardContainer>
      )}
      <Backdrop open={true} />
    </Grid>
  );
};
