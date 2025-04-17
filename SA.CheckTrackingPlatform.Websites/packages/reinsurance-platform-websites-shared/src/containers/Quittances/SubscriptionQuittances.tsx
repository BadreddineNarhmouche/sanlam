import {
  FilterCriteriaQuittances,
  IQuittanceService,
  IQuittanceDetailsService,
  PAGINATION,
} from "@reinsurance/helpers";
import {
  Backdrop,
  CardContainer,
  EmptyState,
  Grid,
  Skeleton,
  Stack,
  Table,
} from "@reinsurance/ui-kit";
import emptyStateDesk from "@reinsurance/ui-kit/src/assets/images/emptyStateDesk.svg";
import emptyStatePerson from "@reinsurance/ui-kit/src/assets/images/emptyStatePerson.svg";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormSearch from "./FormSearch/FormSearch";
import {
  SUBSCRIPTION_QUITTANCE_FORM_SEARCH_FIELDS,
  SUBSCRIPTION_QUITTANCE_TABLE_COLUMNS_DEFAULT,
  SUBSCRIPTION_QUITTANCE_TABLE_HIDDEN_COLUMNS_DEFAULT,
  SUBSCRIPTION_QUITTANCE_TABLE_DETAILS_COLUMNS_DEFAULT,
} from "./constants";
import { WORKFLOW_STEP_CODES } from "../../constants/global";
import { quittanceStatusComponent } from "../../utils/QuittanceHelpers";

export const SubscriptionQuittances = ({
  services,
  detailsServices,
  detailsPage,
  initialFilterValues,
}: {
  services: IQuittanceService;
  detailsServices: IQuittanceDetailsService;
  detailsPage: string;
  initialFilterValues: FilterCriteriaQuittances;
}) => {
  const navigate = useNavigate();
  const [filterValues, setFilterValues] = useState<any>(initialFilterValues);
  const [emptySearchResult, setEmptySearchResult] = useState({
    isEmptyResult: false,
    isSearchMode: false,
  });
  const [policyReferenceToView, setPolicyReferenceToView] = useState<
    string | null
  >(null);

  const {
    responseData: quittancesSubscription,
    meta: quittancesMeta,
    isLoading: isLoadingQuittancesData,
    error: errorQuittancesData,
  } = useSelector((state: any) => state.quittancesSubscription);

  const {
    responseData: quittanceReinsurer,
    isLoadingReinsurer,
    errorReinsurer,
  } = useSelector((state: any) => state.quittanceReinsurer); 

  const {
    responseData: quittance,
    isLoading,
    error,
  } = useSelector((state: any) => state.quittance);

  const [quittancesData, setQuittancesData] = useState<any[]>([]);
  const [reinsurerData, setReinsurerData] = useState<any[]>([]);

  const handleSubmit = (values: FilterCriteriaQuittances) => {
    const criteria = {
      ...values,
      workFlowStepCode: WORKFLOW_STEP_CODES.SUBSCRIPTIONS,
      policyReference: values.policyReference,
      reference: values.reference,
      quittanceStatusId: values.quittanceStatusId,
      externalPartnerUserCode: values.externalPartnerUserCode,
      externalReinsuranceReference: values.externalReinsuranceReference,
      primeNetMin: values.primeNetMin,
      primeNetMax: values.primeNetMax,
    };
    services.getAllSubscriptionQuittancesByCriteria &&
      services.getAllSubscriptionQuittancesByCriteria(criteria);

    services.reinsurerByAll && services.reinsurerByAll();

    setEmptySearchResult({
      ...emptySearchResult,
      isSearchMode: true,
    });
    setFilterValues(values);
  };

  useEffect(() => {
    handleSubmit(initialFilterValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFilterValues]);

  useEffect(() => {
    setQuittancesData(quittancesSubscription);
  }, [quittancesSubscription]);

  useEffect(() => {
    setReinsurerData(quittanceReinsurer);
  }, [quittanceReinsurer]);

  useEffect(() => {
    let updatedData: any[] = [];

    updatedData = quittancesData.map((item) => {
      return {
        ...item,
        details: item.details?.map((obj: any) => {
          return {
            ...obj,
            // status: quittanceStatusComponent(
            //   obj.publicQuittanceStatusCode,
            //   obj.publicQuittanceStatusLabel
            // ),
          };
        }),
        isLoaded: true,
      };
    });
    setQuittancesData(updatedData);
  }, [quittancesData]);

  useEffect(() => {
    if (policyReferenceToView && error) {
      const filteredData = quittancesData.filter(
        (item) => item.policyReference === policyReferenceToView
      );
      let updatedData: any[] = [];
      updatedData = filteredData.map((item) => {
        return {
          ...item,
          isLoaded: true,
        };
      });
      setQuittancesData((prevData) => {
        return prevData.map((item) => {
          const updatedItem = updatedData.find(
            (updated) => updated.policyReference === item.policyReference
          );
          return updatedItem || item;
        });
      });
      setPolicyReferenceToView(null);
      services.clearGetQuittanceById && services.clearGetQuittanceById();
    }
  }, [error, policyReferenceToView]);

  const handleResetFilter = () => {
    setEmptySearchResult({
      ...emptySearchResult,
      isSearchMode: false,
    });
    setFilterValues(initialFilterValues);
    services.getAllSubscriptionQuittancesByCriteria &&
      services.getAllSubscriptionQuittancesByCriteria({
        ...initialFilterValues,
        workFlowStepCode: WORKFLOW_STEP_CODES.SUBSCRIPTIONS,
        policyReference: initialFilterValues.policyReference,
        reference: initialFilterValues.reference,
        quittanceStatusId: initialFilterValues.quittanceStatusId,
        externalPartnerUserCode: initialFilterValues.externalPartnerUserCode,
        externalReinsuranceReference:
          initialFilterValues.externalReinsuranceReference,
        primeNetMin: initialFilterValues.primeNetMin,
        primeNetMax: initialFilterValues.primeNetMax,
      });
  };

  const handleOnPageChange = (page: number) => {
    services.getAllSubscriptionQuittancesByCriteria &&
      services.getAllSubscriptionQuittancesByCriteria({
        ...filterValues,
        workFlowStepCode: WORKFLOW_STEP_CODES.SUBSCRIPTIONS,
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
  };

  const intl = useIntl();

  const onOpenDetailRow = (row: any) => {
    if (
      !row.isOpen &&
      !quittancesData
        .filter((item) => item.policyReference === row.data.policyReference)
        .some((item) => item.isLoaded)
    ) {
      setPolicyReferenceToView(row.data.policyReference);
    }
  };

  return (
    <Grid container direction="column" px={8} py={7} id="quittance-table">
      <Grid item>
        <FormSearch
          resetedValues={initialFilterValues}
          handleSubmit={(values: any) => handleSubmit(values)}
          handleResetFilter={handleResetFilter}
          initialValues={initialFilterValues}
          fieldsToDisplay={SUBSCRIPTION_QUITTANCE_FORM_SEARCH_FIELDS(
            reinsurerData
          )}
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
      ) : quittancesData?.length > 0 ? (
        <Table
          isCollapsable={true}
          rows={quittancesData}
          columns={SUBSCRIPTION_QUITTANCE_TABLE_COLUMNS_DEFAULT}
          detailsColumns={SUBSCRIPTION_QUITTANCE_TABLE_DETAILS_COLUMNS_DEFAULT}
          hiddenColumns={SUBSCRIPTION_QUITTANCE_TABLE_HIDDEN_COLUMNS_DEFAULT}
          onClickDetailsColumnsDetailRow={(row: any) => {
            navigate(`${detailsPage}?quittanceId=${row.id}`);
          }}
          onOpenDetailRow={(row: any) => onOpenDetailRow(row)}
          pagination={{
            meta: quittancesMeta,
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
      <Backdrop open={isLoadingQuittancesData} />
    </Grid>
  );
};
