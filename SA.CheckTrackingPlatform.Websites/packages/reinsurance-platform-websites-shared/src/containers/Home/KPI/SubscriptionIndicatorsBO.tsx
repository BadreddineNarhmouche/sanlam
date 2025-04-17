import { useIntl } from "react-intl";
import { GeneralHelper, translate } from "@reinsurance/helpers";
import { CardContainer, Grid, Theme, Typography } from "@reinsurance/ui-kit";

import { GenericKPI } from "./GenericKPI";
import { ExportFile } from "./ExportFile";
import { IQuittanceService, IKPIsService } from "@reinsurance/helpers";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const SubscriptionIndicatorsBO = ({
  quittanceServices,
  KPIsService,
}: {
  quittanceServices: IQuittanceService;
  KPIsService: IKPIsService;
}) => {
  const intl = useIntl();

  useEffect(() => {
    KPIsService.GetCountReinsurances();
  }, []);

  const { responseData: GetCountReinsurances } = useSelector(
    (state: any) => state.GetCountReinsurances
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
                title: "requests.torenew",
                contents: [
                  {
                    code: "1",
                    count: GetCountReinsurances?.count ?? 0,
                    countColor: "red",
                    description: "Affaire(s) fac",
                    onClick() {
                      KPIsService.ExportFileExcelRenovel &&
                        KPIsService.ExportFileExcelRenovel();
                    },
                    isHideButton: true,
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
