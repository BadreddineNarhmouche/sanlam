import {
  IDeliverySlipDetailsService,
  IBankService,
} from "@checkTracking/helpers";
import {
  Box,
  CardContainer,
  EmptyState,
  Grid,
  Icons,
  Skeleton,
  Stack,
  Tabs,
  PDFViewer,
  Dialog,
  Button,
  Typography,
} from "@checkTracking/ui-kit";
import { useIntl, FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import Header from "./Header";
import { DeliverySlipInfo } from "./DeliverySlipInfo";
import DeliverySlipTimeLine from "./DeliverySlipTimeLine";
import { contentStyle, tabsContainer } from "./styles";
import { FormContextProvider } from "./FormContext";
import { quittanceStatusComponent } from "../../utils/QuittanceHelpers";
import { useState, useEffect } from "react";
import { clone } from "lodash";
import { DocumentTypeCodeConstants } from "@checkTracking/helpers/lib/helpers/ConstantsHelper";
import { DialogConfirmation } from "../WorkflowSteps/DialogConfirmation";
import {
  QUITTANCE_STATUS_CODES,
  WORKFLOW_TYPE_CODES,
} from "../../constants/global";
import { useNavigate } from "react-router-dom";

export const DeliverySlipDetails = (props: {
  id: string | null;
  deliverySlipServices: IDeliverySlipDetailsService;
  bankServices: IBankService;
}) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);
  const [pdfViewer, setPDFViewer] = useState<any>(() => {
    return { file: null, fileName: "", open: false };
  });
  const [bankData, setBankData] = useState<any[]>([]);
  const [currenciesData, setCurrenciesData] = useState<any[]>([]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const {
    responseData: deliverySlip,
    isLoading: isLoadingDeliverySlip,
    error,
  } = useSelector((state: any) => state.deliverySlip);

  const {
    responseData: Banks,
    isLoading: isLoadingBank,
    errorBanks,
  } = useSelector((state: any) => state.Banks);

  const {
    responseData: GetAllCurrencies,
    isLoading: isLoadingGetAllCurrencies,
    errorGetAllCurrencies,
  } = useSelector((state: any) => state.GetAllCurrencies);

  const {
    responseData: rollbackQuittance,
    isLoading: isLoadingrollbackQuittance,
    error: errorrollbackQuittance,
  } = useSelector((state: any) => state.rollbackQuittance);

  const [workflowTranstionsData, setWorkflowTranstionsData] = useState([]);

  useEffect(() => {
    if (rollbackQuittance?.length > 0) {
      props.deliverySlipServices.clearPUTWorkflowRollBack &&
        props.deliverySlipServices.clearPUTWorkflowRollBack();
      navigate(`${"/"}?tab=${1}`);
    }
  }, [rollbackQuittance]);

  useEffect(() => {
    props.bankServices.getBankByAll && props.bankServices.getBankByAll();
    props.bankServices.GetAllCurrencies &&
      props.bankServices.GetAllCurrencies();
    let tempWorkflowTranstionsData = clone(deliverySlip.timelineHistories);
    tempWorkflowTranstionsData = tempWorkflowTranstionsData?.map(
      (workflowHistoryItem: any) => {
        const deliverySlipTimeLine = deliverySlip?.deliverySlipTimelines
          ?.slice()
          .reverse()
          .find(
            (timeline: any) =>
              workflowHistoryItem.id == timeline.externalTimeLineHistoryId
          );
        return {
          ...workflowHistoryItem,
          transition: {
            coverNoteDocument: deliverySlip.deliverySlipDocuments?.find(
              (doc: any) =>
                doc.documentTypeCode === DocumentTypeCodeConstants.coverNote
            ),
            honorDeclarationDocument: deliverySlip.deliverySlipDocuments?.find(
              (doc: any) =>
                doc.documentTypeCode ===
                DocumentTypeCodeConstants.honorDeclaration
            ),
            otherDocuments: deliverySlipTimeLine
              ? deliverySlip.deliverySlipDocuments?.filter(
                  (doc: any) =>
                    deliverySlipTimeLine.id === doc.deliverySlipTimelineId &&
                    doc.documentTypeCode === DocumentTypeCodeConstants.other
                )
              : null,
            deliverySlipTimeLine: deliverySlipTimeLine,
          },
        };
      }
    );

    setWorkflowTranstionsData(tempWorkflowTranstionsData);
  }, [deliverySlip]);

  useEffect(() => {
    setBankData(Banks);
  }, [Banks]);

  useEffect(() => {
    setCurrenciesData(GetAllCurrencies);
  }, [GetAllCurrencies]);

  const TABS = [
    {
      label: (
        <Grid
          container
          spacing={1.5}
          flexDirection="column"
          alignItems="flex-start"
        >
          <Grid item xs>
            {"Status"}
          </Grid>
          <Grid item xs>
            {quittanceStatusComponent(
              deliverySlip.publicDeliverySlipStatusCode,
              deliverySlip.publicDeliverySlipStatusLabel
            )}
          </Grid>
        </Grid>
      ),
    },
  ];

  const openConfirmationDialogMethod = () => {
    setOpenConfirmationDialog(!openConfirmationDialog);
  };

  const handleSubmit = () => {
    const obj = {
      WorkflowTypeCode: WORKFLOW_TYPE_CODES.DELIVERYSLIP.toString(),
      DemandId: deliverySlip.id,
    };
    props.deliverySlipServices.PutWorkFlowRollBack &&
      props.deliverySlipServices.PutWorkFlowRollBack(obj);
  };

  const canDisplayButton = () => {
    let isValid = false;
    if (
      deliverySlip?.publicDeliverySlipStatusCode ===
      QUITTANCE_STATUS_CODES.IN_PROGRESS_REINSURANCE
    ) {
      return (isValid = true);
    } else return isValid;
  };

  return (
    <Grid mt={9}>
      {isLoadingDeliverySlip ? (
        <Stack spacing={2} mt={3}>
          <Skeleton variant="rectangular" mt={2} height={100} />
          <Skeleton variant="rectangular" mt={2} height={100} />
          <Skeleton variant="rectangular" mt={2} height={100} />
        </Stack>
      ) : error ? (
        <CardContainer mt={3}>
          <EmptyState
            title={intl.formatMessage({
              id: "error.api.title",
            })}
            subTitle={intl.formatMessage({
              id: "error.api.subTitle",
            })}
            action={{
              label: intl.formatMessage({ id: "button.retry" }),
              startIcon: <Icons.Refresh />,
              onClick: () =>
                props.id &&
                props.deliverySlipServices.getDeliverySlipById(props.id),
            }}
          />
        </CardContainer>
      ) : (
        <Box sx={{ display: "flex", width: "100%" }}>
          <Grid container>
            <Grid item>
              <Header
                deliverySlip={deliverySlip}
                setOpenConfirmationDialog={openConfirmationDialogMethod}
                displayButton={canDisplayButton()}
              />
            </Grid>

            <Grid item sx={contentStyle}>
              {
                <Grid
                  container
                  flexDirection="column"
                  display="flex"
                  pt={10}
                  px={20}
                >
                  <Grid item>
                    <DeliverySlipInfo deliverySlip={deliverySlip} />
                  </Grid>

                  <Grid item>
                    <FormContextProvider>
                      <Grid container flexDirection="column">
                        <Grid item sx={tabsContainer}>
                          <Tabs
                            tabs={TABS}
                            value={0}
                            isCentered={false}
                            tabStyle={{ minHeight: "90px" }}
                            scrollable={true}
                          />
                        </Grid>
                        <Grid>
                          {isLoadingDeliverySlip ? (
                            <Grid container direction="row" spacing={2} xl={12}>
                              <Grid item xs>
                                <Stack spacing={2} mt={3}>
                                  <Skeleton
                                    variant="rectangular"
                                    mt={2}
                                    height={180}
                                  />
                                </Stack>
                              </Grid>
                            </Grid>
                          ) : (
                            <DeliverySlipTimeLine
                              deliverySlip={deliverySlip}
                              workflowTranstionsData={workflowTranstionsData}
                              services={props.deliverySlipServices}
                              setDialogOpen={setDialogOpen}
                              setPDFViewer={setPDFViewer}
                              bankData={bankData}
                              currenciesData={currenciesData}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </FormContextProvider>
                  </Grid>
                </Grid>
              }
            </Grid>
          </Grid>
          <Dialog
            maxWidth="lg"
            open={dialogOpen}
            footerWithBorder={true}
            content={
              <PDFViewer file={pdfViewer.file} fileName={pdfViewer.fileName} />
            }
            actions={
              <Button
                variant="outlined"
                onClick={() => {
                  setDialogOpen(false);
                }}
              >
                <Typography variant="button">
                  <FormattedMessage id="button.close" />
                </Typography>
              </Button>
            }
          />
        </Box>
      )}
      <DialogConfirmation
        openConfiramtionDialog={openConfirmationDialog}
        setOpenConfiramtionDialog={setOpenConfirmationDialog}
        handleSubmit={handleSubmit}
        isLoading={isLoadingrollbackQuittance}
        error={errorrollbackQuittance}
        responseData={rollbackQuittance}
      />
    </Grid>
  );
};
