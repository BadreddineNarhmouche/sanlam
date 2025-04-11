import { DeliverySlip } from "@reinsurance/helpers";
import { Grid, Icons, Typography } from "@reinsurance/ui-kit";
import { useIntl } from "react-intl";
import { container, headerInfoStyle, infoStyle, sectionTitle } from "./styles";

export const DeliverySlipInfo = ({
  deliverySlip,
}: {
  deliverySlip: DeliverySlip;
}) => {
  const intl = useIntl();

  return (
    <>
      <Grid item py={3}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="baseline"
          p={3}
          {...container}
        >
          <Grid item container xs={12} pb={1}>
            <Icons.AssignmentTurnedInOutlined />
            <Typography variant="h7" {...sectionTitle} ml={2}>
              {intl.formatMessage({
                id: "deliverySlip_details.deliverySlip_info",
              })}
            </Typography>
          </Grid>
          <Grid item xs={12} pt={1} ml={5}>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Grid container direction={"column"}>
                  <Grid item>
                    <Typography variant="button" {...headerInfoStyle}>
                      {intl.formatMessage({
                        id: "deliverySlip_details.deliverySlip_reference",
                      })}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="button" {...infoStyle}>
                      {deliverySlip.reference}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container direction={"column"}>
                  <Grid item>
                    <Typography variant="button" {...headerInfoStyle}>
                      {intl.formatMessage({
                        id: "deliverySlip_details.deliverySlip_settlementDate",
                      })}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="button" {...infoStyle}>
                      {deliverySlip.creationDate}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container direction={"column"}>
                  <Grid item>
                    <Typography variant="button" {...headerInfoStyle}>
                      {intl.formatMessage({
                        id: "deliverySlip_details.deliverySlip_amountTotal",
                      })}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="button" {...infoStyle}>
                      {deliverySlip.annuelPremiumTotal}{" "}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
