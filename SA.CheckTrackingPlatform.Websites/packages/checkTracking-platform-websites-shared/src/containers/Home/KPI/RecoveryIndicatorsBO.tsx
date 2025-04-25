import { useIntl } from "react-intl";
import { GeneralHelper, translate } from "@checkTracking/helpers";
import { CardContainer, Grid, Theme, Typography } from "@checkTracking/ui-kit";

import { GenericKPI } from "./GenericKPI";
import { ExportFile } from "./ExportFile";
import { IQuittanceService, IKPIsService } from "@checkTracking/helpers";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const RecoveryIndicatorsBO = ({
  quittanceServices,
  KPIsService,
}: {
  quittanceServices: IQuittanceService;
  KPIsService: IKPIsService;
}) => {
  const intl = useIntl();

  useEffect(() => {
    KPIsService.GetCountRecoveries();
  }, []);

  const { responseData: GetCountRecoveries } = useSelector(
    (state: any) => state.GetCountRecoveries
  );

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
            <GenericKPI
              component={{
                title: "Les impayees CIOL",
                contents: [
                  {
                    code: "1",
                    count: GetCountRecoveries?.count ?? 0,
                    countColor: "red",
                    description: "Affaire(s) fac",
                    onClick() {},
                    isHideButton: false,
                  },
                ],
              }}
            />
          </Grid>
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
