import { Payment } from "@reinsurance/helpers";
import { Grid, Icons, Typography } from "@reinsurance/ui-kit";
import { useIntl } from "react-intl";
import { container, headerInfoStyle, infoStyle, sectionTitle } from "./styles";
import { isConstructorDeclaration } from "typescript";

export const PaymentInfo = ({
  payment,
  deliverySlipRef,
}: {
  payment: Payment;
  deliverySlipRef: string | null;
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
                id: "payment_details.payment_info",
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
                        id: "payment_details.payment_Number",
                      })}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="button" {...infoStyle}>
                      {payment.id}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container direction={"column"}>
                  <Grid item>
                    <Typography variant="button" {...headerInfoStyle}>
                      {intl.formatMessage({
                        id: "payment_details.payment_deliverySlip",
                      })}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="button" {...infoStyle}>
                      {deliverySlipRef ?? "N/A"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container direction={"column"}>
                  <Grid item>
                    <Typography variant="button" {...headerInfoStyle}>
                      {intl.formatMessage({
                        id: "payment_details.payment_amountTotal",
                      })}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="button" {...infoStyle}>
                    {payment.amount}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container direction={"column"}>
                  <Grid item>
                    <Typography variant="button" {...headerInfoStyle}>
                      {intl.formatMessage({
                        id: "payment_details.payment_Date_regler",
                      })}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="button" {...infoStyle}>
                      {payment.creationDate}
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
