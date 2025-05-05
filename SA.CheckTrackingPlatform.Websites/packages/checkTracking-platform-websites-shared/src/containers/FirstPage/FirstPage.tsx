import { FilterCriteriaService } from "@checkTracking/helpers";
import { Backdrop, Grid, Table } from "@checkTracking/ui-kit";
import { useIntl } from "react-intl";
import { Navigate } from "react-router-dom";
import {
  FIRST_PAGE_QUITTANCE_FORM_SEARCH_FIELDS,
  FIRST_PAGE_QUITTANCE_TABLE_COLUMNS_DEFAULT,
  FIRST_PAGE_QUITTANCE_TABLE_HIDDEN_COLUMNS_DEFAULT,
} from "./constants";
import FormSearch from "./FormSearch/FormSearch";

export const FirstPage = ({
  services,
  detailsPage,
  initialFilterValues,
}: {
  //   services: IQuittanceService;
  services: any;
  detailsPage: string;
  initialFilterValues: FilterCriteriaService;
}) => {
  const intl = useIntl();

  const handleOnPageChange = (page: number) => {
    // services.getAllSubscriptionQuittancesByCriteria &&
    //   services.getAllSubscriptionQuittancesByCriteria({
    //     ...filterValues,
    //     workFlowStepCode: WORKFLOW_STEP_CODES.SUBSCRIPTIONS,
    //     policyReference: filterValues.policyReference,
    //     reference: filterValues.reference,
    //     quittanceStatusId: filterValues.quittanceStatusId,
    //     externalPartnerUserCode: filterValues.externalPartnerUserCode,
    //     externalReinsuranceReference: filterValues.externalReinsuranceReference,
    //     primeNetMin: filterValues.primeNetMin,
    //     primeNetMax: filterValues.primeNetMax,
    //     meta: {
    //       pageIndex: page,
    //       pageSize: PAGINATION.PAGE_SIZE,
    //     },
    //   });
  };

  const dataTest = {
    data: [
      {
        id: 1,
        test1: "2",
        test2: "3",
        test3: "4",
      },
    ],
    itemsCount: 0,
    totalCount: 20,
    pageIndex: 1,
    pageSize: 10,
    pageCount: 1,
  };

  const handleResetFilter = () => {
    // setEmptySearchResult({
    //   ...emptySearchResult,
    //   isSearchMode: false,
    // });
    // setFilterValues(initialFilterValues);
    // services.getAllSubscriptionQuittancesByCriteria &&
    //   services.getAllSubscriptionQuittancesByCriteria({
    //     ...initialFilterValues,
    //     workFlowStepCode: WORKFLOW_STEP_CODES.SUBSCRIPTIONS,
    //     policyReference: initialFilterValues.policyReference,
    //     reference: initialFilterValues.reference,
    //     quittanceStatusId: initialFilterValues.quittanceStatusId,
    //     externalPartnerUserCode: initialFilterValues.externalPartnerUserCode,
    //     externalReinsuranceReference:
    //       initialFilterValues.externalReinsuranceReference,
    //     primeNetMin: initialFilterValues.primeNetMin,
    //     primeNetMax: initialFilterValues.primeNetMax,
    //   });
  };

  return (
    <Grid container direction="column" px={8} py={7} id="quittance-table">
      <Grid item>
        <FormSearch
          resetedValues={initialFilterValues}
          handleSubmit={(values: any) => {}}
          handleResetFilter={handleResetFilter}
          initialValues={initialFilterValues}
          fieldsToDisplay={FIRST_PAGE_QUITTANCE_FORM_SEARCH_FIELDS()}
          URLquittanceStatusDescriptionID={1}
          isLoading={false}
        />
      </Grid>
      {/* {isLoadingQuittancesData ? (
          <Stack spacing={2} mt={3}>
            <Skeleton variant="rectangular" mt={2} height={100} />
            <Skeleton variant="rectangular" mt={2} height={100} />
            <Skeleton variant="rectangular" mt={2} height={100} />
          </Stack>
        ) : errorQuittancesData ? ( */}
      {/* <CardContainer mt={3}>
            <EmptyState
              title={intl.formatMessage({
                id: "error.api.title",
              })}
              subTitle={intl.formatMessage({
                id: "error.api.subTitle",
              })}
            />
          </CardContainer>
        ) : quittancesData?.length > 0 ? ( */}
      <Table
        isCollapsable={true}
        rows={dataTest.data}
        columns={FIRST_PAGE_QUITTANCE_TABLE_COLUMNS_DEFAULT}
        hiddenColumns={FIRST_PAGE_QUITTANCE_TABLE_HIDDEN_COLUMNS_DEFAULT}
        onClickDetailsColumnsDetailRow={(row: any) => {
          // Navigate(`${""}?quittanceId=${row.id}`);
        }}
        //   onOpenDetailRow={(row: any) => onOpenDetailRow(row)}
        pagination={{
          meta: dataTest,
          handleOnChangePage: (page: number) => handleOnPageChange(page),
        }}
      />
      {/* ) : (
          <CardContainer px={8} pt={8} pb={15.5}>
            <EmptyState
              title={
                emptySearchResult.isEmptyResult &&
                emptySearchResult.isSearchMode
                  ? intl.formatMessage({
                      id: "quittances.searchResult.empty.title",
                    })
                  : intl.formatMessage({ id: "empty_state.title" })
              }
              subTitle={
                emptySearchResult.isEmptyResult &&
                emptySearchResult.isSearchMode
                  ? intl.formatMessage({
                      id: "quittances.empty.subTitle",
                    })
                  : intl.formatMessage({
                      id: "quittances.empty.subTitle",
                    })
              }
              image={
                emptySearchResult.isEmptyResult &&
                emptySearchResult.isSearchMode
                  ? emptyStatePerson
                  : emptyStateDesk
              }
            />
          </CardContainer>
        )} */}
      <Backdrop open={false} />
    </Grid>
  );
};
