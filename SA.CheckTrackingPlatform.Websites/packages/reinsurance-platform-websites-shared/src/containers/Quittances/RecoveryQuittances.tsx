import {
  FilterCriteriaQuittances,
  IQuittanceService,
  IQuittanceDetailsService,
  PAGINATION,
  SubscriptionResponse,
} from "@reinsurance/helpers";
import {
  Autocomplete,
  Backdrop,
  Button,
  CardContainer,
  EmptyState,
  Grid,
  Skeleton,
  Stack,
  Table,
  TextField,
  Typography,
} from "@reinsurance/ui-kit";
import { Drawer, Box, IconButton, Divider } from "@mui/material";
import emptyStateDesk from "@reinsurance/ui-kit/src/assets/images/emptyStateDesk.svg";
import emptyStatePerson from "@reinsurance/ui-kit/src/assets/images/emptyStatePerson.svg";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormSearch from "./FormSearch/FormSearch";
import {
  RECOVERY_QUITTANCE_FORM_SEARCH_FIELDS,
  RECOVERY_QUITTANCE_TABLE_COLUMNS_DEFAULT,
  RECOVERY_QUITTANCE_TABLE_HIDDEN_COLUMNS_DEFAULT,
} from "./constants";
import { WORKFLOW_STEP_CODES } from "../../constants/global";
import {
  //   quittanceStatusComponent,
  quittancePaymentStatusComponent,
} from "../../utils/QuittanceHelpers";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";

export const RecoveryQuittances = ({
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
  const [dataAnnotation, setDataAnnotation] = useState([]);
  const [dataAnnotationSelect, setDataAnnotationSelect] = useState<string>("");
  const [showDateField, setShowDateField] = useState(false);
  const [dateAnnotation, setDateAnnotation] = useState<string>("");
  const [emptySearchResult, setEmptySearchResult] = useState({
    isEmptyResult: false,
    isSearchMode: false,
  });

  const {
    responseData: quittancesRecovery,
    meta: quittancesRecoveryMeta,
    isLoading: isLoadingQuittancesData,
    error: errorQuittancesData,
  } = useSelector((state: any) => state.quittancesRecovery);

  const {
    responseData: quittance,
    isLoading,
    error,
  } = useSelector((state: any) => state.quittance);

  const {
    responseData: quittanceAnnotations,
    isLoadingAnnotaion,
    errorAnnotaion,
  } = useSelector((state: any) => state.quittanceAnnotations);

  const {
    responseData: quittanceAnnotationHistory,
    isLoadingAnnotaionCreate,
    errorAnnotaionCreate,
  } = useSelector((state: any) => state.quittanceAnnotationHistory);

  const [quittancesData, setQuittancesData] = useState<any[]>([]);
  const [quittanceDataSelect, setQuittanceDataSelect] = useState<any>();
  const [quittancesDataComment, setQuittancesDataComment] =
    useState<SubscriptionResponse>();
  const [OpenDrawerComment, setOpenDrawerComment] = useState(false);
  const [reinsurerData, setReinsurerData] = useState<any[]>([]);
  const [statusCIOLData, setStatusCIOLData] = useState<any[]>([]);

  const handleSubmit = (values: FilterCriteriaQuittances) => {
    const criteria = {
      ...values,
      workFlowStepCode: WORKFLOW_STEP_CODES.RECOVERIES,
      policyReference: values.policyReference,
      reference: values.reference,
      quittanceStatusId: values.quittanceStatusId,
      externalPartnerUserCode: values.externalPartnerUserCode,
      dateCreation: values.dateCreation,
    };
    services.getAllRecoveryQuittancesByCriteria &&
      services.getAllRecoveryQuittancesByCriteria(criteria);
    services.reinsurerByAll && services.reinsurerByAll();
    services.getStatusCIOL && services.getStatusCIOL();
    services.quittanceAnnotationByAll && services.quittanceAnnotationByAll();
    setEmptySearchResult({
      ...emptySearchResult,
      isSearchMode: true,
    });
    setFilterValues(values);
  };

  const {
    responseData: quittanceReinsurer,
    isLoadingReinsurer,
    errorReinsurer,
  } = useSelector((state: any) => state.quittanceReinsurer);

  const {
    responseData: statusCIOL,
    isLoadingStatusCIOL,
    errorStatusCIOL,
  } = useSelector((state: any) => state.statusCIOL);

  useEffect(() => {
    setReinsurerData(quittanceReinsurer);
  }, [quittanceReinsurer]);

  useEffect(() => {
    setStatusCIOLData(statusCIOL);
  }, [statusCIOL]);
  useEffect(() => {
    handleSubmit(initialFilterValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFilterValues]);

  useEffect(() => {
    setQuittancesData(quittancesRecovery);
    setOpenDrawerComment(false);
    setShowDateField(false);
  }, [quittancesRecovery]);

  useEffect(() => {
    // setQuittancesData(quittanceAnnotationCreate);
  }, [quittanceAnnotationHistory]);

  useEffect(() => {
    setDataAnnotation(quittanceAnnotations);
  }, [quittanceAnnotations]);

  useEffect(() => {
    let updatedData: any[] = [];
    updatedData = quittancesData.map((item) => {
      return {
        // ...item,
        id: item?.id,
        policyReference: item?.policyReference,
        reference: item?.reference,
        publicQuittanceStatusCode: item?.publicQuittanceStatusCode,
        publicQuittanceStatusLabel: item?.publicQuittanceStatusLabel,
        policyPaymentStatusCode: item?.policyPaymentStatusCode,
        policyPaymentStatusLabel: item?.policyPaymentStatusLabel,
        policySubscriberLabel: item?.policySubscriberLabel,
        reinsurerLabel: item?.reinsurerLabel,
        beneficiaryLabel: item?.beneficiaryLabel,
        quittanceAnnotationHistoryData: item?.quittanceAnnotationHistoryData,
        partnerUserCode: item?.partnerUserCode,
        quittanceEffectiveDate: item?.quittanceEffectiveDate,
        quittanceNetPremiumAmount: item?.quittanceNetPremiumAmount,
        remainingNetPayable: item?.remainingNetPayable,
        policyPaymentStatus: quittancePaymentStatusComponent(
          item.policyPaymentStatusCode,
          item.policyPaymentStatusLabel
        ),
        paymentDeadline: item.paymentDeadline,
        sla: item?.sla,
      };
    });
    setQuittancesData(updatedData);
  }, [quittancesData]);

  const handleResetFilter = () => {
    setEmptySearchResult({
      ...emptySearchResult,
      isSearchMode: false,
    });
    setFilterValues(initialFilterValues);
    services.getAllRecoveryQuittancesByCriteria &&
      services.getAllRecoveryQuittancesByCriteria({
        ...initialFilterValues,
        workFlowStepCode: WORKFLOW_STEP_CODES.RECOVERIES,
        policyReference: initialFilterValues.policyReference,
        reference: initialFilterValues.reference,
        quittanceStatusId: initialFilterValues.quittanceStatusId,
        externalPartnerUserCode: initialFilterValues.externalPartnerUserCode,
        dateCreation: initialFilterValues.dateCreation,
      });
  };

  const handleOnPageChange = (page: number) => {
    services.getAllRecoveryQuittancesByCriteria &&
      services.getAllRecoveryQuittancesByCriteria({
        ...filterValues,
        workFlowStepCode: WORKFLOW_STEP_CODES.RECOVERIES,
        policyReference: filterValues.policyReference,
        reference: filterValues.reference,
        quittanceStatusId: filterValues.quittanceStatusId,
        externalPartnerUserCode: filterValues.externalPartnerUserCode,
        dateCreation: filterValues.dateCreation,
        meta: {
          pageIndex: page,
          pageSize: PAGINATION.PAGE_SIZE,
        },
      });
  };

  const intl = useIntl();

  const list = () => (
    <>
      <Box sx={{ width: 500 }} role="presentation">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "24px 32px 16px",
            gap: "10px",
            height: "74px",
            background: "#0075c9",
            borderRadius: "0px",
            flex: "left",
            order: 0,
            alignSelf: "stretch",
            flexGrow: 0,
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: "130%",
            color: "#ffffff",
          }}
        >
          <Grid container direction="column">
            <Grid item xs={12}>
              Police&nbsp;N°&nbsp;:&nbsp;
              {quittancesDataComment?.policyReference ?? null}
            </Grid>
            <Grid item xs={12}>
              Quittance&nbsp;N°&nbsp;:&nbsp;
              {quittancesDataComment?.reference ?? null}
            </Grid>
          </Grid>
          <IconButton
            sx={{ color: "#ffffff" }}
            aria-label="close"
            onClick={() => {
              setOpenDrawerComment((open) => !open);
              setShowDateField(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box>
          <Box
            sx={{
              margin: "22px 42px 0 42px",
              padding: "10px",
            }}
          >
            <Stack>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontFamily: "'Roboto'",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "16px",
                      lineHeight: "150%",
                      color: "#012163",
                    }}
                  >
                    <Autocomplete
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(
                        item: React.ChangeEvent<HTMLInputElement>,
                        v: any
                      ) => {
                        handleChange(v);
                      }}
                      options={dataAnnotation}
                      renderInput={(params: any) => (
                        <TextField {...params} label="Liste des annotations" />
                      )}
                    />
                  </Typography>
                </Grid>
              </Grid>
              {showDateField && (
                <Grid>
                  <TextField
                    id="w"
                    label="Date annotation"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="date"
                    format={"DD/MM/YYYY"}
                    onChange={(item: React.ChangeEvent<HTMLInputElement>) =>
                      setDateAnnotation(item.target.value)
                    }
                  />
                </Grid>
              )}
              <Grid>
                <Button
                  style={{ float: "right" }}
                  variant="contained"
                  color="primary"
                  onClick={() => myFunction()}
                >
                  Enregistrer
                </Button>
              </Grid>
            </Stack>
            <br />
            <br />
            {quittanceDataSelect?.quittanceAnnotationHistoryData &&
              quittanceDataSelect?.quittanceAnnotationHistoryData?.map(
                (item: any) => {
                  return (
                    <Stack
                      spacing={{ xs: 1, sm: 2 }}
                      direction="row"
                      useFlexGap
                      flexWrap="wrap"
                    >
                      <Grid container direction={"row"}>
                        <Grid item xs={8}>
                          <Typography
                            sx={{
                              fontFamily: "'Roboto'",
                              fontStyle: "normal",
                              fontWeight: "400",
                              fontSize: "12px",
                              lineHeight: "150%",
                              color: "#012163",
                            }}
                          >
                            {moment(item.creationDate).format(
                              "DD/MM/YYYY à HH:mm:ss"
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography
                        sx={{
                          fontFamily: "'Roboto'",
                          fontStyle: "normal",
                          fontWeight: "400",
                          fontSize: "16px",
                          lineHeight: "14px",
                          color: "#000000",
                        }}
                      >
                        {item.quittanceAnnotationLabel} &nbsp;&nbsp;&nbsp;
                        {item.dateQuittanceAnnotation
                          ? moment(item.dateQuittanceAnnotation).format(
                              "DD/MM/YYYY"
                            )
                          : ""}
                      </Typography>
                      <br />
                    </Stack>
                  );
                }
              )}
          </Box>
        </Box>
      </Box>
    </>
  );

  const handleChange = (item: any) => {
    setDataAnnotationSelect(item?.id);
    if (item?.code === "MRDE" || item?.code === "MED") {
      setShowDateField(true);
    } else {
      setShowDateField(false);
    }
  };

  const myFunction = () => {
    let obj = {
      QuittanceId: quittanceDataSelect?.id,
      QuittanceAnnotationHistoryId: dataAnnotationSelect,
      DateQuittanceAnnotation: dateAnnotation,
    };
    services.quittanceAnnotationCreate &&
      services.quittanceAnnotationCreate(obj);
  };

  return (
    <Grid container direction="column" px={8} py={7} id="quittance-table">
      <Grid item>
        <FormSearch
          resetedValues={initialFilterValues}
          handleSubmit={(values: any) => handleSubmit(values)}
          handleResetFilter={handleResetFilter}
          initialValues={initialFilterValues}
          fieldsToDisplay={RECOVERY_QUITTANCE_FORM_SEARCH_FIELDS(
            reinsurerData,
            statusCIOLData
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
          isCollapsable={false}
          rows={quittancesData}
          columns={RECOVERY_QUITTANCE_TABLE_COLUMNS_DEFAULT}
          hiddenColumns={RECOVERY_QUITTANCE_TABLE_HIDDEN_COLUMNS_DEFAULT}
          onClickCommentRow={(row: any) => {
            setQuittancesDataComment(row);
            setQuittanceDataSelect(
              quittancesData.find((item) => item.id === row.id)
            );
            setOpenDrawerComment((open) => !open);
          }}
          onClickDetailRow={(row: any) => {
            navigate(`${detailsPage}?quittanceId=${row.id}`);
          }}
          pagination={{
            meta: quittancesRecoveryMeta,
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
      <Drawer
        anchor={"right"}
        open={OpenDrawerComment}
        closeAfterTransition={false}
      >
        {list()}
      </Drawer>
    </Grid>
  );
};
