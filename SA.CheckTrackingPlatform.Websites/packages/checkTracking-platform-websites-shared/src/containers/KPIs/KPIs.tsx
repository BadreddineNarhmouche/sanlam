import {
  Alert,
  CardContainer,
  Grid,
  Theme,
  Typography,
} from "@checkTracking/ui-kit";
import { GenericKPI } from "./GenericKPI";

export const KPIs = () => {
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
                title: "check.search.checkNumber",
                contents: [
                  {
                    code: "1",
                    count: 0, //GetCountReinsurances?.count ?? 0,
                    countColor: "red",
                    description: "Télécharger",
                    onClick() {
                      //   KPIsService.ExportFileExcelRenovel &&
                      //     KPIsService.ExportFileExcelRenovel();
                      <Alert icon="info" />;
                    },
                    isHideButton: true,
                  },
                ],
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <GenericKPI
              component={{
                title: "check.search.checkNumber",
                contents: [
                  {
                    code: "1",
                    count: 0, //GetCountReinsurances?.count ?? 0,
                    countColor: "red",
                    description: "Télécharger",
                    onClick() {
                      //   KPIsService.ExportFileExcelRenovel &&
                      //     KPIsService.ExportFileExcelRenovel();
                    },
                    isHideButton: true,
                  },
                ],
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <GenericKPI
              component={{
                title: "check.search.checkNumber",
                contents: [
                  {
                    code: "1",
                    count: 0, //GetCountReinsurances?.count ?? 0,
                    countColor: "red",
                    description: "Télécharger",
                    onClick() {
                      //   KPIsService.ExportFileExcelRenovel &&
                      //     KPIsService.ExportFileExcelRenovel();
                    },
                    isHideButton: true,
                  },
                ],
              }}
            />
          </Grid>
        </Grid>
      }
    </Grid>
  );
};
