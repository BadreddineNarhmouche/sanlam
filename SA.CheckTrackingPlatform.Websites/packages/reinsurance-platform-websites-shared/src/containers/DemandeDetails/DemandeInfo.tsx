import { Quittance } from "@reinsurance/helpers";
import { Grid, Icons, Typography } from "@reinsurance/ui-kit";
import { useIntl } from "react-intl";
import { container, headerInfoStyle, infoStyle, sectionTitle } from "./styles";
import { quittanceStatusComponent } from "../../utils/QuittanceHelpers";

export const DemandeInfo = ({ quittance }: { quittance: Quittance }) => {
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
              {intl.formatMessage({ id: "quittance_details.quittance_info" })}
            </Typography>
          </Grid>
          <Grid item xs={12} pt={1} ml={5}>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Grid container direction={"column"}>
                  <Grid item>
                    <Typography variant="button" {...headerInfoStyle}>
                      {intl.formatMessage({
                        id: "quittance_details.quittance_policyReference",
                      })}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="button" {...infoStyle}>
                      {quittance.policyReference}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container direction={"column"}>
                  <Grid item>
                    <Typography variant="button" {...headerInfoStyle}>
                      {intl.formatMessage({
                        id: "quittance_details.quittance_insured",
                      })}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="button" {...infoStyle}>
                      {quittance.policySubscriberLabel}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container direction={"column"}>
                  <Grid item>
                    <Typography variant="button" {...headerInfoStyle}>
                      {intl.formatMessage({
                        id: "quittance_details.quittance_intermediary",
                      })}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="button" {...infoStyle}>
                      {quittance.partnerUserCode}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container direction={"column"}>
                  <Grid item>
                    <Typography variant="button" {...headerInfoStyle}>
                      {intl.formatMessage({
                        id: "quittance_details.quittance_branch",
                      })}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="button" {...infoStyle}>
                      {quittance.branchId}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container direction={"column"}>
                  <Grid item>
                    <Typography variant="button" {...headerInfoStyle}>
                      {intl.formatMessage({
                        id: "quittance_details.quittance_start_date",
                      })}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="button" {...infoStyle}>
                      {quittance.quittanceEffectiveDate}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container direction={"column"}>
                  <Grid item>
                    <Typography variant="button" {...headerInfoStyle}>
                      {intl.formatMessage({
                        id: "quittance_details.quittance_end_date",
                      })}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="button" {...infoStyle}>
                      {quittance.quittanceExprirationDate}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container direction={"column"}>
                  <Grid item>
                    <Typography variant="button" {...headerInfoStyle}>
                      {intl.formatMessage({
                        id: "quittance_details.quittance_cover_type",
                      })}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="button" {...infoStyle}>
                      {quittance.guaranteeTypes}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container direction={"column"}>
                  <Grid item>
                    <Typography variant="button" {...headerInfoStyle}>
                      {intl.formatMessage({
                        id: "quittance_details.status",
                      })}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="button" {...infoStyle}>
                      {quittanceStatusComponent(
                        quittance.publicQuittanceStatusCode,
                        quittance.publicQuittanceStatusLabel
                      )}
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
