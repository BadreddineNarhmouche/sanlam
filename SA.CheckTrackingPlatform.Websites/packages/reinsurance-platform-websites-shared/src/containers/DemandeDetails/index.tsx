import { IDeliverySlipDetailsService, IPaymentService, IQuittanceDetailsService } from "@reinsurance/helpers";
import {
  Box,
  Button,
  CardContainer,
  Dialog,
  EmptyState,
  Grid,
  Icons,
  PDFViewer,
  Skeleton,
  Stack,
  Typography,
} from "@reinsurance/ui-kit";
import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";
import Header from "./Header";
import { DemandeInfo } from "./DemandeInfo";
import { contentStyle } from "./styles";
import { useState } from "react";
import SideBar from "../SideBarDetailsRight/SideBar";
import { RenderByRoles } from "../RenderByRoles";
import { InternalRoleCodeConstants } from "@reinsurance/helpers/lib/helpers/ConstantsHelper";
import { useLocation } from "react-router-dom";

export const DemandeDetails = (props: {
  id: string;
  quittanceServices: IQuittanceDetailsService;
  deliverySlipService: IDeliverySlipDetailsService;
  paymentService: IPaymentService;
}) => {
  const intl = useIntl();
  const location = useLocation();

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
                goBack={location.state?.from ?? null}
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
                    <DemandeInfo quittance={quittance} />
                  </Grid>
                </Grid>
              }
            </Grid>
          </Grid>

          <RenderByRoles
            internalRoleCodes={[InternalRoleCodeConstants.documentDetails]}
          >
            <SideBar
              id={quittance?.id}
              services={props.quittanceServices}
              servicesDeliverySlip={props.deliverySlipService}
              servicesPayments={props.paymentService}
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
    </Grid>
  );
};
