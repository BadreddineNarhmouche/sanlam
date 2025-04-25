import { useIntl } from "react-intl";
import { GeneralHelper, translate } from "@checkTracking/helpers";
import { CardContainer, Grid, Theme, Typography } from "@checkTracking/ui-kit";

import { GenericKPI } from "./GenericKPI";
import { ExportFile } from "./ExportFile";
import { IQuittanceService } from "@checkTracking/helpers";

export const AccountingIndicatorsBO = ({
  quittanceServices,
}: {
  quittanceServices: IQuittanceService;
}) => {
  const intl = useIntl();

  return (
    <Grid
      container
      sx={{ pt: 7, px: 8, pr: 6 }}
      backgroundColor={
        // @ts-ignore
        Theme.theme.palette.base.main
      }
    >
      {
        <Grid container direction="row" spacing={2} xl={12}>
          <Grid item xs={3}>
            <CardContainer minHeight={170}>
              <Typography variant="h5" color="base.greyDark">
                {translate("home_page.indicators.global_schedule_file", intl, {
                  month: GeneralHelper.getCurrentMonth(intl),
                })}
              </Typography>
              <ExportFile quittanceServices={quittanceServices} />
            </CardContainer>
          </Grid>
        </Grid>
      }
    </Grid>
  );
};
