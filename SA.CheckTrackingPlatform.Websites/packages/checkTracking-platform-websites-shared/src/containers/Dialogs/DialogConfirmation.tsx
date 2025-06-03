import { GeneralHelper, translate } from "@checkTracking/helpers";
import {
  Alert,
  Button,
  Dialog,
  Grid,
  Icons,
  Typography,
} from "@checkTracking/ui-kit";
import { FormattedMessage, useIntl } from "react-intl";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

interface Props {
  openConfiramtionDialog: boolean;
  setOpenConfiramtionDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
  handleCancel?: () => void;
  isLoading: boolean;
  error: boolean;
  responseData: any;
  choice?: string;
}

export const DialogConfirmation = ({
  openConfiramtionDialog,
  setOpenConfiramtionDialog,
  handleSubmit,
  choice,
  isLoading,
  error,
  responseData,
  handleCancel,
}: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !error && !isEmpty(responseData)) {
      setOpenConfiramtionDialog(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  const intl = useIntl();

  return (
    <Dialog
      fullWidth
      open={openConfiramtionDialog}
      footerWithBorder={true}
      title={<FormattedMessage id="workflow.confirm_dialog_title" />}
      content={
        <>
          <Typography variant="body2">
            <FormattedMessage
              id="workflow.confirm_dialog_message_confirm"
              values={{
                choice: !GeneralHelper.isStringNullOrEmpty(choice) ? (
                  <span style={{ fontWeight: "bold" }}>{`"${choice}"`}</span>
                ) : (
                  ""
                ),
              }}
            />
          </Typography>

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
            onClick={handleSubmit}
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
