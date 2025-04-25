import { GeneralHelper, translate } from "@checkTracking/helpers";
import { Button, Grid, Icons } from "@checkTracking/ui-kit";
import { useIntl } from "react-intl";
import { DialogDates } from "./DialogDates";
import { useState } from "react";
import { IQuittanceService } from "@checkTracking/helpers";
import { useSelector } from "react-redux";

export const ExportFile = ({
  quittanceServices,
}: {
  quittanceServices: IQuittanceService;
}) => {
  const intl = useIntl();

  const [openConfiramtionDialog, setOpenConfiramtionDialog] = useState(false);

  const handleSubmit = (v: any) => {
    quittanceServices.ExportAllQuittance &&
      quittanceServices.ExportAllQuittance({
        fromCreationDate: v?.dateDu,
        toCreationDate: v?.dateAu,
      });
  };

  const {
    responseData: exportAllQuittance,
    isLoading: isLoadingexportAllQuittance,
    error: errorexportAllQuittance,
  } = useSelector((state: any) => state.exportAllQuittance);

  return (
    <>
      <Grid container mt={2}>
        <Button
          //   variant="text"
          endIcon={<Icons.Download />}
          px={0}
          onClick={() => setOpenConfiramtionDialog(true)}
        >
          {translate("home_page.indicators.global_download", intl, {
            month: GeneralHelper.getCurrentMonth(intl),
          })}
        </Button>
      </Grid>

      <DialogDates
        openConfiramtionDialog={openConfiramtionDialog}
        setOpenConfiramtionDialog={setOpenConfiramtionDialog}
        handleSubmit={handleSubmit}
        isLoading={isLoadingexportAllQuittance}
        error={errorexportAllQuittance}
        responseData={exportAllQuittance}
      />
    </>
  );
};
