import { translate } from "@checkTracking/helpers";
import {
  Alert,
  Autocomplete,
  Button,
  Dialog,
  Grid,
  Icons,
  Typography,
} from "@checkTracking/ui-kit";
import { FormattedMessage, useIntl } from "react-intl";
import { CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";

interface Props {
  openConfiramtionDialog: boolean;
  setOpenConfiramtionDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (Select?: any, Comment?: any) => any;
  handleCancel?: () => void;
  isLoading: boolean;
  error: boolean;
  responseData: any;
  choice?: string;
}

export const DialogTreatment = ({
  openConfiramtionDialog,
  setOpenConfiramtionDialog,
  handleSubmit,
  choice,
  isLoading,
  error,
  responseData,
  handleCancel,
}: Props) => {
  const [fieldReason, setFieldReason] = useState<any>();
  const [fieldComment, setFieldComment] = useState<any>();
  useEffect(() => {
    if (!isLoading && !error && !isEmpty(responseData)) {
      setOpenConfiramtionDialog(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  const intl = useIntl();

  const { responseData: reasonMoveOptions = [] } = useSelector(
    (state: any) => state.AllReasonMove
  );

  return (
    <Dialog
      fullWidth
      open={openConfiramtionDialog}
      footerWithBorder={true}
      title={<FormattedMessage id="workflow.confirm_dialog_title" />}
      content={
        <>
          <Grid mt={1} container columnSpacing={1}>
            <Grid item xs={12}>
              <Autocomplete
                options={reasonMoveOptions}
                renderOption={(props: any, option: any) => (
                  <li {...props} key={option.id}>
                    {option.label || option.name || option}
                  </li>
                )}
                onChange={(e: any, value: any) => {
                  setFieldReason(value.id);
                }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    label={translate("File.global.search.comment", intl)}
                  />
                )}
              />
            </Grid>
            <Grid mt={2} item xs={12}>
              <TextField
                type="text"
                label={translate("File.global.search.comment", intl)}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => setFieldComment(e.target.value)}
                name="comments"
                fullWidth
                multiline
                minRows={3}
              />
            </Grid>
          </Grid>
          {error && (
            <Grid item xs={12} mt={3}>
              <Alert
                withBoxStyle={true}
                severity={"error"}
                icon={<Icons.Error />}
              >
                <Typography variant="button">
                  {translate("error.api.title", intl)}
                </Typography>
              </Alert>
            </Grid>
          )}
        </>
      }
      actions={
        <>
          <Button
            variant="outlined"
            onClick={() => {
              setOpenConfiramtionDialog(false);
              handleCancel && handleCancel();
            }}
            disabled={isLoading}
          >
            <Typography variant="button">
              <FormattedMessage id="button.abandon" />
            </Typography>
          </Button>
          <Button
            variant="contained"
            onClick={() => handleSubmit(fieldReason, fieldComment)}
            disabled={isLoading}
          >
            {isLoading && (
              <CircularProgress color="primary" size={24} sx={{ mr: 1 }} />
            )}
            <Typography variant="button">
              <FormattedMessage
                id={error ? "button.retry" : "button.confirm"}
              />
            </Typography>
          </Button>
        </>
      }
    />
  );
};
