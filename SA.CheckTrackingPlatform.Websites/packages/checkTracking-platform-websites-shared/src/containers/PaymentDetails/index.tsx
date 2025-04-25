import {
  IPaymentService,
  IQuittanceDetailsService,
  IDeliverySlipDetailsService
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
import { PaymentInfo } from "./PaymentInfo";
import PaymentTimeLine from "./PaymentTimeLine";
import { contentStyle, tabsContainer } from "./styles";
import { FormContextProvider } from "./FormContext";
import { quittanceStatusComponent } from "../../utils/QuittanceHelpers";
import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "../SideBarDetailsRight/SideBar";
import { RenderByRoles } from "../RenderByRoles";
import { InternalRoleCodeConstants } from "@checkTracking/helpers/lib/helpers/ConstantsHelper";

export const PaymentDetails = (props: {
  id: string;
  paymentServices: IPaymentService;
  quittanceServices: IQuittanceDetailsService;
  deliverySlipServices: IDeliverySlipDetailsService;
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

  const {
    responseData: paymentsById,
    isLoading: isLoadingPayment,
    error,
  } = useSelector((state: any) => state.paymentsById);

  useEffect(() => {
    props.paymentServices.getPaymentById &&
      props.paymentServices.getPaymentById(props.id);
  }, []);

  useEffect(() => {
    if (!location.state?.quittances) {
      navigate(`${"/"}?tab=${1}`);
    }
  }, []);

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
              paymentsById.publicPaymentStatusCode,
              paymentsById.publicPaymentStatusLabel
            )}
          </Grid>
        </Grid>
      ),
    },
  ];
  const location = useLocation();
  const useQuery = () => {
    return useMemo(() => {
      return new URLSearchParams(location.search);
    }, [location.search]);
  };

  const query = useQuery();
  const deliverySlipRef = location?.state?.deliverySlipRef;

  return (
    <Grid mt={9}>
      {isLoadingPayment ? (
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
              // onClick: () =>
              //   props.id && props.paymentServices.getPaymentById(props.id),
            }}
          />
        </CardContainer>
      ) : (
        <Box sx={{ display: "flex", width: "100%" }}>
          <Grid container>
            <Grid item>
              <Header payment={paymentsById} />
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
                    <PaymentInfo
                      payment={paymentsById}
                      deliverySlipRef={deliverySlipRef}
                    />
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
                          {isLoadingPayment ? (
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
                            <PaymentTimeLine
                              payment={paymentsById}
                              workflowTranstionsData={[{ id: 1 }]}
                              services={props.paymentServices}
                              setDialogOpen={setDialogOpen}
                              setPDFViewer={setPDFViewer}
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

          {paymentsById ? (
            <RenderByRoles
              internalRoleCodes={[InternalRoleCodeConstants.documentDetails]}
            >
              <SideBar
                id={
                  paymentsById.isSuccess
                    ? paymentsById?.quittanceIds[0]?.id
                    : null
                }
                services={props.quittanceServices}
                servicesDeliverySlip={props.deliverySlipServices} 
                servicesPayments={props.paymentServices}               
                setDialogOpen={setDialogOpen}
                setPDFViewer={setPDFViewer}
                displayUpload={false}
              />
            </RenderByRoles>
          ) : null}

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
    </Grid>
  );
};
