import { translate } from "@reinsurance/helpers";
import {
  Button,
  Dialog,
  Grid,
  Typography,
  TextField,
} from "@reinsurance/ui-kit";
import { FormattedMessage, useIntl } from "react-intl";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";

interface Props {
  openConfiramtionDialog: boolean;
  setOpenConfiramtionDialog: React.Dispatch<React.SetStateAction<boolean>>;

  handleSubmit: (item: any) => void;
  isLoading?: boolean;
  error?: boolean;
  responseData?: any;
  choice?: string;
}

export const DialogDates = ({
  openConfiramtionDialog,
  setOpenConfiramtionDialog,
  handleSubmit,
  choice,
  isLoading,
  error,
  responseData,
}: Props) => {
  useEffect(() => {
    if (!isLoading && !error && !isEmpty(responseData)) {
      setOpenConfiramtionDialog(false);
      handleCancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  const intl = useIntl();

  const [selectDateDu, setSelectDateDu] = useState("");
  const [selectDateAu, setSelectDateAu] = useState("");

  const handleCancel = () => {
    setSelectDateDu("");
    setSelectDateAu("");
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={openConfiramtionDialog}
      footerWithBorder={true}
      title={<FormattedMessage id="File.global.dialog.title" />}
      content={
        <>
          <Grid item xs={12} mt={3}>
            <TextField
              label={translate("File.global.search.startDate", intl)}
              type="date"
              value={selectDateDu}
              onChange={(v: React.ChangeEvent<HTMLInputElement>) =>
                setSelectDateDu(v.target.value)
              }
              inputProps={{
                min: `${new Date().getFullYear() - 9}-01-01`, // Minimum allowed date
                max: `${new Date().getFullYear()}-12-31`, // Maximum allowed date
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              label={translate("File.global.search.endDate", intl)}
              InputLabelProps={{
                shrink: true,
              }}
              type="date"
              format={"dd-MM-yyyy"}
              inputProps={{
                min: `${new Date().getFullYear() - 9}-01-01`, // Minimum allowed date
                max: `${new Date().getFullYear()}-12-31`, // Maximum allowed date
              }}
              value={selectDateAu}
              onChange={(v: React.ChangeEvent<HTMLInputElement>) =>
                setSelectDateAu(v.target.value)
              }
            />
          </Grid>
        </>
      }
      actions={
        <>
          <Button
            variant="outlined"
            onClick={() => {
              setOpenConfiramtionDialog(false);
              handleCancel();
            }}
            disabled={isLoading}
          >
            <Typography variant="button">
              <FormattedMessage id="button.abandon" />
            </Typography>
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleSubmit &&
                handleSubmit({
                  dateDu: selectDateDu,
                  dateAu: selectDateAu,
                });
            }}
            disabled={isLoading}
          >
            {isLoading && (
              <CircularProgress color="primary" size={24} sx={{ mr: 1 }} />
            )}
            <Typography variant="button">
              <FormattedMessage
                id={error ? "button.retry" : "button.download"}
              />
            </Typography>
          </Button>
        </>
      }
    />
  );
};
