import { IQuittanceDetailsService } from "@checkTracking/helpers";
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
import { QuittanceInfo } from "./QuittanceInfo";
import { QuittancePaymentInfo } from "./QuittancePaymentInfo";
import QuittanceTimeLine from "./QuittanceTimeLine";
import { contentStyle, tabsContainer } from "./styles";
import { FormContextProvider } from "./FormContext";
import { quittanceStatusComponent } from "../../utils/QuittanceHelpers";
import { useState, useEffect } from "react";
import { clone } from "lodash";
import {
  DocumentTypeCodeConstants,
  InternalRoleCodeConstants,
} from "@checkTracking/helpers/lib/helpers/ConstantsHelper";
import {
  QUITTANCE_STATUS_CODES,
  WORKFLOW_STATUS_CODES,
  WORKFLOW_TYPE_CODES,
} from "../../constants/global";
import SideBar from "../SideBarDetailsRight/SideBar";
import { RenderByRoles } from "../RenderByRoles";
import { DialogConfirmation } from "../WorkflowSteps/DialogConfirmation";

export const QuittanceDetails = (props: {
  id: string;
  quittanceServices: IQuittanceDetailsService;
}) => {
  const intl = useIntl();
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const [dialogOpen, setDialogOpen]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);

  const [pdfViewer, setPDFViewer] = useState<any>(() => {
    return { file: null, fileName: "", open: false };
  });

  const {
    responseData: quittance,
    isLoading: isLoadingQuittance,
    error: errorQuittance,
  } = useSelector((state: any) => state.quittance);

  const {
    responseData: internalRoles,
    isLoading: isLoadingRole,
    error: isErrorRole,
  } = useSelector((state: any) => state.internalRoles);

  const {
    responseData: quittancePayment,
    isLoading: isLoadingQuittancePayment,
    error: errorQuittancePayment,
  } = useSelector((state: any) => state.quittancePayment);

  const {
    responseData: rollbackQuittance,
    isLoading: isLoadingrollbackQuittance,
    error: errorrollbackQuittance,
  } = useSelector((state: any) => state.rollbackQuittance);

  const [workflowTranstionsData, setWorkflowTranstionsData] = useState([]);

  const [quittancePaymentData, setQuittancePaymentData] = useState(null);

  useEffect(() => {
    if (quittance) {
      let tempWorkflowTranstionsData = clone(quittance.timelineHistories);
      tempWorkflowTranstionsData = tempWorkflowTranstionsData?.map(
        (workflowHistoryItem: any) => {
          const quittanceTimeLine = quittance?.quittanceTimelines
            ?.slice()
            .reverse()
            .find(
              (timeline: any) =>
                workflowHistoryItem.id == timeline.externalTimeLineHistoryId
            );
          return {
            ...workflowHistoryItem,
            transition: {
              coverNoteDocument: quittance.quittanceDocuments?.find(
                (doc: any) =>
                  doc.documentTypeCode === DocumentTypeCodeConstants.coverNote
              ),
              honorDeclarationDocument: quittance.quittanceDocuments?.find(
                (doc: any) =>
                  doc.documentTypeCode ===
                  DocumentTypeCodeConstants.honorDeclaration
              ),
              otherDocuments: quittanceTimeLine
                ? quittance.quittanceDocuments?.filter(
                    (doc: any) =>
                      quittanceTimeLine.id === doc.quittanceTimelineId &&
                      doc.documentTypeCode === DocumentTypeCodeConstants.other
                  )
                : null,
              quittanceTimeLine: quittanceTimeLine,
            },
          };
        }
      );

      setWorkflowTranstionsData(tempWorkflowTranstionsData);

      if (quittancePaymentData !== null) {
        props.quittanceServices.getQuittancePaymentByQuittanceId &&
          props.quittanceServices.getQuittancePaymentByQuittanceId(
            quittance.id
          );
      }
    }
  }, [quittance]);

  useEffect(() => {
    if (
      !isLoadingQuittancePayment &&
      quittancePayment &&
      quittancePayment.isPopulated &&
      quittancePayment.isSuccess
    ) {
      setQuittancePaymentData(quittancePayment);
    } else {
      setQuittancePaymentData(null);
    }
  }, [quittancePayment]);

  useEffect(() => {
    if (quittancePaymentData && quittancePayment) {
      setQuittancePaymentData(null);
    }
  }, [quittance]);

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
              quittance.publicQuittanceStatusCode,
              quittance.publicQuittanceStatusLabel
            )}
          </Grid>
        </Grid>
      ),
    },
  ];

  const handleSubmit = () => {
    const obj = {
      WorkflowTypeCode: WORKFLOW_TYPE_CODES.QUITTANCE.toString(),
      DemandId: quittance.id,
    };
    props.quittanceServices.PutWorkFlowRollBack &&
      props.quittanceServices.PutWorkFlowRollBack(obj);
  };

  const openConfirmationDialogMethod = () => {
    setOpenConfirmationDialog(!openConfirmationDialog);
  };

  const canDisplayButton = () => {
    let isValid = false;
    let isInternalRoleValid = false;
    internalRoles.map((item: any) => {
      if (
        item.internalRoleCode === InternalRoleCodeConstants.subscriptionsManager
      ) {
        isInternalRoleValid = true;
      }
    });
    // console.log(isInternalRoleValid);
    quittance?.timelineHistories?.map((item: any) => {
      if (
        item.timelineTransition.destinationStep.moduleName ===
          WORKFLOW_STATUS_CODES.SUBSCRIPTION_VALIDATOR &&
        isInternalRoleValid
      ) {
        return (isValid = true);
      } else return isValid;
    });
    if (
      isValid &&
      quittance?.publicQuittanceStatusCode ===
        QUITTANCE_STATUS_CODES.IN_PROGRESS_SUBSCRIPTION
    ) {
      return true;
    } else return false;
  };

  return (
    <Grid mt={9}>
      {isLoadingQuittance ? (
        <Stack spacing={2} mt={3}>
          <Skeleton variant="rectangular" mt={2} height={100} />
          <Skeleton variant="rectangular" mt={2} height={100} />
          <Skeleton variant="rectangular" mt={2} height={100} />
        </Stack>
      ) : errorQuittance ? (
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
                props.id && props.quittanceServices.getQuittanceById(props.id),
            }}
          />
        </CardContainer>
      ) : (
        <Box sx={{ display: "flex", width: "100%" }}>
          <Grid container>
            <Grid item>
              <Header
                quittance={quittance}
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
                    <QuittanceInfo quittance={quittance} />
                  </Grid>

                  {quittance &&
                    quittance.publicQuittanceStatusCode ===
                      QUITTANCE_STATUS_CODES.IN_PROGRESS_RECOVERY &&
                    quittancePaymentData && (
                      <Grid item>
                        <QuittancePaymentInfo
                          quittancePayment={quittancePaymentData}
                        />
                      </Grid>
                    )}

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
                          {isLoadingQuittance ? (
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
                            <QuittanceTimeLine
                              quittance={quittance}
                              workflowTranstionsData={workflowTranstionsData}
                              services={props.quittanceServices}
                              setDialogOpen={setDialogOpen}
                              setPDFViewer={setPDFViewer}
                              quittancePaymentData={quittancePaymentData}
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

          <RenderByRoles
            internalRoleCodes={[InternalRoleCodeConstants.documentDetails]}
          >
            <SideBar
              id={quittance.id}
              services={props.quittanceServices}
              setDialogOpen={setDialogOpen}
              setPDFViewer={setPDFViewer}
              displayUpload={true}
            />
          </RenderByRoles>

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
