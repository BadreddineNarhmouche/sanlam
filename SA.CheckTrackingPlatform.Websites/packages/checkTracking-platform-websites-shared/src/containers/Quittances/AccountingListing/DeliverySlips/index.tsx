import {
  FilterCriteriaDeliverySlips,
  IDeliverySlipService,
  IDeliverySlipDetailsService,
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
import emptyStateDesk from "@checkTracking/ui-kit/src/assets/images/emptyStateDesk.svg";
import emptyStatePerson from "@checkTracking/ui-kit/src/assets/images/emptyStatePerson.svg";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ACCOUNTING_DELIVERYSLIP_TABLE_COLUMNS_DEFAULT,
  ACCOUNTING_DELIVERYSLIP_TABLE_HIDDEN_COLUMNS_DEFAULT,
  ACCOUNTING_DELIVERYSLIP_TABLE_DETAILS_COLUMNS_DEFAULT,
} from "../../constants";
import { WORKFLOW_STEP_CODES } from "../../../../constants/global";
import { deliverySlipStatusComponent } from "../../../../utils/QuittanceHelpers";

export const AccountingDeliverySlips = ({
  deliverySlipServices,
  deliverySlipDetailsServices,
  detailsPage,
  initialFilterValues,
  selectedQuittanceLineId,
  setSelectedQuittanceLineId,
  selectedQuittanceLine,
  setSelectedQuittanceLine,
}: {
  deliverySlipServices: IDeliverySlipService;
  deliverySlipDetailsServices: IDeliverySlipDetailsService;
  detailsPage: string;
  initialFilterValues: FilterCriteriaDeliverySlips;
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
  const [deliverySlipReferenceToView, setDeliverySlipReferenceToView] =
    useState<string | null>(null);

  const {
    responseData: deliverySlipsAccounting,
    meta: deliverySlipsMeta,
    isLoading: isLoadingDeliverySlipsData,
    error: errorDeliverySlipsData,
  } = useSelector((state: any) => state.deliverySlipsAccounting);

  const [deliverySlipsData, setDeliverySlipsData] = useState<any[]>([]);

  const handleSubmit = (values: FilterCriteriaDeliverySlips) => {
    const criteria = {
      ...values,
      workFlowStepCode: WORKFLOW_STEP_CODES.ACCOUNTING,
      // reference: values.reference,
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
    handleSubmit(initialFilterValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFilterValues]);

  useEffect(() => {
    setDeliverySlipsData(deliverySlipsAccounting);
  }, [deliverySlipsAccounting]);

  useEffect(() => {
    let updatedData: any[] = [];

    updatedData = deliverySlipsData.map((item: any) => {
      return {
        ...item,
        status: deliverySlipStatusComponent(
          item.publicDeliverySlipStatusCode,
          item.publicDeliverySlipStatusLabel
        ),
        isLoaded: true,
      };
    });
    setDeliverySlipsData(updatedData);
  }, [deliverySlipsData]);

  useEffect(() => {
    if (deliverySlipReferenceToView && errorDeliverySlipsData) {
      const filteredData = deliverySlipsData.filter(
        (item) => item.reference === deliverySlipReferenceToView
      );
      let updatedData: any[] = [];
      updatedData = filteredData.map((item) => {
        return {
          ...item,
          isLoaded: true,
        };
      });
      setDeliverySlipsData((prevData) => {
        return prevData.map((item) => {
          const updatedItem = updatedData.find(
            (updated) => updated.reference === item.reference
          );
          return updatedItem || item;
        });
      });
      setDeliverySlipReferenceToView(null);
      deliverySlipServices.clearGetDeliverySlipById &&
        deliverySlipServices.clearGetDeliverySlipById();
    }
  }, [errorDeliverySlipsData, deliverySlipReferenceToView]);

  const handleOnPageChange = (page: number) => {
    deliverySlipServices.getAllAccountingDeliverySlipsByCriteria &&
      deliverySlipServices.getAllAccountingDeliverySlipsByCriteria({
        ...filterValues,
        workFlowStepCode: WORKFLOW_STEP_CODES.ACCOUNTING,
        reference: filterValues.reference,
        deliverySlipStatusId: filterValues.deliverySlipStatusId,
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
      !deliverySlipsData
        .filter((item) => item.reference === row.data.reference)
        .some((item) => item.isLoaded)
    ) {
      setDeliverySlipReferenceToView(row.data.reference);
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

    newSelected.map((item) => {
      item.details = [];
    });

    setSelectedQuittanceLineId(newSelectedIds);
    setSelectedQuittanceLine(newSelected);
  };

  return (
    <Grid>
      {isLoadingDeliverySlipsData ? (
        <Stack spacing={2} mt={3}>
          <Skeleton variant="rectangular" mt={2} height={100} />
          <Skeleton variant="rectangular" mt={2} height={100} />
          <Skeleton variant="rectangular" mt={2} height={100} />
        </Stack>
      ) : errorDeliverySlipsData ? (
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
      ) : deliverySlipsData?.length > 0 ? (
        <Table
          isCollapsable={true}
          rows={deliverySlipsData}
          columns={ACCOUNTING_DELIVERYSLIP_TABLE_COLUMNS_DEFAULT}
          detailsColumns={ACCOUNTING_DELIVERYSLIP_TABLE_DETAILS_COLUMNS_DEFAULT}
          hiddenColumns={ACCOUNTING_DELIVERYSLIP_TABLE_HIDDEN_COLUMNS_DEFAULT}
          onOpenDetailRow={(row: any) => onOpenDetailRow(row)}
          pagination={{
            meta: deliverySlipsMeta,
            handleOnChangePage: (page: number) => handleOnPageChange(page),
          }}
          handleCheckBoxChange={handleCheckBoxChange}
          selected={selectedQuittanceLineId}
          isFirstRowToDisplaySelect={true}
        />
      ) : (
        <CardContainer px={8} pt={8} pb={15.5}>
          <EmptyState
            title={
              emptySearchResult.isEmptyResult && emptySearchResult.isSearchMode
                ? intl.formatMessage({
                    id: "deliverySlips.searchResult.empty.title",
                  })
                : intl.formatMessage({ id: "empty_state.title" })
            }
            subTitle={
              emptySearchResult.isEmptyResult && emptySearchResult.isSearchMode
                ? intl.formatMessage({
                    id: "deliverySlips.empty.subTitle",
                  })
                : intl.formatMessage({
                    id: "deliverySlips.empty.subTitle",
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
      <Backdrop open={isLoadingDeliverySlipsData} />
    </Grid>
  );
};
