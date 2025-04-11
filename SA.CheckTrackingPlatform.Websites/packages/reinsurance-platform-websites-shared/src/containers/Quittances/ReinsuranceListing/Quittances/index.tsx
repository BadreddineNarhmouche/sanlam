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
import {
  REINSURANCE_QUITTANCE_TABLE_COLUMNS_DEFAULT,
  REINSURANCE_QUITTANCE_TABLE_HIDDEN_COLUMNS_DEFAULT,
  REINSURANCE_QUITTANCE_TABLE_DETAILS_COLUMNS_DEFAULT,
  REINSURANCE_QUITTANCE_TABLE_DETAILS_NESTED_COLUMNS_DEFAULT,
} from "../../constants";
import { WORKFLOW_STEP_CODES } from "../../../../constants/global";
import { quittanceStatusComponent } from "../../../../utils/QuittanceHelpers";

export const ReinsuranceQuittances = ({
  quittanceServices,
  quittanceDetailsServices,
  detailsPage,
  initialFilterValues,
  selectedQuittanceLineId,
  setSelectedQuittanceLineId,
  selectedQuittanceLine,
  setSelectedQuittanceLine,
}: {
  quittanceServices: IQuittanceService;
  quittanceDetailsServices: IQuittanceDetailsService;
  detailsPage: string;
  initialFilterValues: FilterCriteriaQuittances;
  selectedQuittanceLineId: any[];
  setSelectedQuittanceLineId: any;
  selectedQuittanceLine: any[];
  setSelectedQuittanceLine: any;
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
    responseData: quittancesReinsurance,
    meta: quittancesMeta,
    isLoading: isLoadingQuittancesData,
    error: errorQuittancesData,
  } = useSelector((state: any) => state.quittancesReinsurance);

  const [quittancesData, setQuittancesData] = useState<any[]>([]);

  const handleSubmit = (values: FilterCriteriaQuittances) => {
    const criteria = {
      ...values,
      workFlowStepCode: WORKFLOW_STEP_CODES.REINSURANCES,
      policyReference: values.policyReference,
      reference: values.reference,
      quittanceStatusId: values.quittanceStatusId,
    };
    quittanceServices.getAllReinsuranceQuittancesByCriteria &&
      quittanceServices.getAllReinsuranceQuittancesByCriteria(criteria);

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
    setQuittancesData(quittancesReinsurance);
  }, [quittancesReinsurance]);

  useEffect(() => {
    let updatedData: any[] = [];

    updatedData = quittancesData.map((item) => {
      return {
        ...item,
        details: item.details?.map((obj: any) => {
          return {
            ...obj,
            status: quittanceStatusComponent(
              obj.publicQuittanceStatusCode,
              obj.publicQuittanceStatusLabel
            ),
          };
        }),
        isLoaded: true,
      };
    });
    setQuittancesData(updatedData);
  }, [quittancesData]);

  useEffect(() => {
    if (policyReferenceToView && errorQuittancesData) {
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
      quittanceServices.clearGetQuittanceById &&
        quittanceServices.clearGetQuittanceById();
    }
  }, [errorQuittancesData, policyReferenceToView]);

  const handleOnPageChange = (page: number) => {
    quittanceServices.getAllReinsuranceQuittancesByCriteria &&
      quittanceServices.getAllReinsuranceQuittancesByCriteria({
        ...filterValues,
        workFlowStepCode: WORKFLOW_STEP_CODES.REINSURANCES,
        policyReference: filterValues.policyReference,
        reference: filterValues.reference,
        quittanceStatusId: filterValues.quittanceStatusId,
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

  const handleCheckBoxChange = (row: any) => {
    const selectedIndex = selectedQuittanceLineId.indexOf(row.id);
    let newSelectedIds: any[] = [];
    let newSelected: any[] = [];

    if (selectedIndex === -1) {
      newSelectedIds = [...selectedQuittanceLineId, row.id];
      newSelected = [...selectedQuittanceLine, row];
    } else {
      newSelectedIds = selectedQuittanceLineId.filter((id) => id !== row.id);
      newSelected = selectedQuittanceLine.filter((id) => id !== row);
    }

    setSelectedQuittanceLineId(newSelectedIds);
    setSelectedQuittanceLine(newSelected);
  };

  return (
    <Grid>
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
          columns={REINSURANCE_QUITTANCE_TABLE_COLUMNS_DEFAULT}
          detailsColumns={REINSURANCE_QUITTANCE_TABLE_DETAILS_COLUMNS_DEFAULT}
          nestedDetailsColumns={
            REINSURANCE_QUITTANCE_TABLE_DETAILS_NESTED_COLUMNS_DEFAULT
          }
          hiddenColumns={REINSURANCE_QUITTANCE_TABLE_HIDDEN_COLUMNS_DEFAULT}
          onClickDetailsColumnsDetailRow={(row: any) => {
            navigate(`${detailsPage}?quittanceId=${row.id}`);
          }}
          onOpenDetailRow={(row: any) => onOpenDetailRow(row)}
          pagination={{
            meta: quittancesMeta,
            handleOnChangePage: (page: number) => handleOnPageChange(page),
          }}
          handleCheckBoxChange={handleCheckBoxChange}
          selected={selectedQuittanceLineId}
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
