import { IQuittanceDetailsService } from "@checkTracking/helpers";
import {
  Accordion,
  Button,
  Grid,
  Typography,
  UI_Typography,
  TextField,
} from "@checkTracking/ui-kit";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { STEP_STATUSES } from "../constants";
import { DialogConfirmation } from "../DialogConfirmation";
import { FormControlLabel, Checkbox } from "@mui/material";
import {
  QUITTANCE_STATUS_CODES,
  QUITTANCE_PAYMENT_STATUS_CODES,
} from "../../../constants/global";
import { useNavigate } from "react-router-dom";

export const RecoveryProcessing = ({
  status,
  readOnly,
  titleDoing,
  titleDone,
  statusDate,
  handleChangeData,
  publicContentDoing,
  currentTimelineId,
  nextTransitions,
  defaultData,
  services,
  transitionData,
  demand,
  seuilQuittance,
}: {
  status: string;
  readOnly: boolean;
  titleDoing?: string;
  titleDone?: string;
  statusDate?: any;
  handleChangeData: (data: any) => void;
  publicContentDoing?: string;
  currentTimelineId: string;
  nextTransitions: any[];
  defaultData?: string;
  services: IQuittanceDetailsService;
  publicContentDone?: string;
  transitionData?: any;
  demand?: any;
  seuilQuittance?: any;
}) => {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const {
    responseData: quittanceTreatRecovery,
    isLoading: isLoadingQuittanceTreatRecovery,
    error: errorQuittanceTreatRecovery,
  } = useSelector((state: any) => state.quittanceTreatRecovery);

  const [openConfiramtionDialog, setOpenConfiramtionDialog] = useState(false);
  const [isMEDChecked, setIsMEDChecked] = useState(false);

  const formattedStatusDate = statusDate ? new Date(statusDate) : new Date();

  const [isNotificationSubmitted, setIsNotificationSubmitted] = useState(false);

  useEffect(() => {
    if (quittanceTreatRecovery?.isSuccess) {
      services.clearTreatRecoveryQuittance &&
        services.clearTreatRecoveryQuittance();
      navigate(`${"/"}`);
    }
  }, [quittanceTreatRecovery?.isSuccess]);

  const handleSubmit = () => {
    if (!isMEDChecked) {
      if (
        demand.policyPaymentStatusCode ===
          QUITTANCE_PAYMENT_STATUS_CODES.UNPAID ||
        (demand.policyPaymentStatusCode ===
          QUITTANCE_PAYMENT_STATUS_CODES.PARTIALLY_PAID &&
          seuilQuittance === true)
      ) {
        services.treatRecoveryQuittance &&
          services.treatRecoveryQuittance({
            externalTimelineHistoryId: currentTimelineId,
            externalNextTransitionId: nextTransitions?.find(
              (t) =>
                t.destinationStep?.privateStatus ===
                QUITTANCE_STATUS_CODES.IN_PROGRESS_RECOVERY
            )?.id,
            quittanceId: demand.id,
            comment: comment,
          });
      } else  {
        services.validateRecoveryQuittance &&
          services.validateRecoveryQuittance({
            externalTimelineHistoryId: currentTimelineId,
            externalNextTransitionId: nextTransitions?.find(
              (t) =>
                t.destinationStep?.privateStatus ===
                QUITTANCE_STATUS_CODES.TO_DO_REINSURANCE
            )?.id,
            quittanceId: demand.id,
            comment: comment,
          });
      }
    } else {
      setOpenConfiramtionDialog(false);
      setIsNotificationSubmitted(true);
    }
  };

  useEffect(() => {
    if (status === STEP_STATUSES.TODO) {
      handleChangeData &&
        handleChangeData({
          files: [],
          comment: defaultData || "",
          policyReference: "",
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTimelineId]);

  const handleChange = () => {
    if (isMEDChecked) {
      setIsMEDChecked(false);
    } else {
      setIsMEDChecked(true);
    }
  };

  return (
    <>
      {status === STEP_STATUSES.TODO && (
        <>
          {readOnly ? (
            <Grid
              container
              flexDirection="column"
              spacing={2}
              pl={2}
              pr={4}
              py={1}
              ml={0}
              mt={1}
              style={{
                border: "1px solid #EBEEF1",
                borderRadius: 4,
              }}
              backgroundColor="base.main"
            >
              <Grid item xs>
                <Typography
                  variant="subtitle1"
                  fontWeight={UI_Typography.FONT_WEIGHT_MEDIUM}
                >
                  {titleDoing}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  variant="subtitle1"
                  fontWeight={UI_Typography.FONT_WEIGHT_NORMAL}
                >
                  {publicContentDoing}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              flexDirection="column"
              spacing={2}
              pl={2}
              pr={4}
              py={1}
              ml={0}
              mt={1}
              style={{
                border: "1px solid #EBEEF1",
                borderRadius: 4,
              }}
              backgroundColor="base.main"
            >
              <Grid container spacing={2}>
                <Grid item xs>
                  <Typography
                    variant="subtitle1"
                    fontWeight={UI_Typography.FONT_WEIGHT_NORMAL}
                  >
                    {titleDoing}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={UI_Typography.FONT_WEIGHT_NORMAL}
                  >
                    Commentaire
                  </Typography>
                  <TextField
                    label="Commentaire"
                    multiline
                    rows={4}
                    value={comment}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setComment(e.target.value);
                    }}
                    variant="outlined"
                  />
                </Grid>
                {demand.policyPaymentStatusCode ===
                  QUITTANCE_PAYMENT_STATUS_CODES.UNPAID &&
                  !isNotificationSubmitted && (
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isMEDChecked}
                            onChange={handleChange}
                          />
                        }
                        label="En attente de confirmation MED chez la souscription"
                      />
                    </Grid>
                  )}
                {demand.policyPaymentStatusCode ===
                  QUITTANCE_PAYMENT_STATUS_CODES.UNPAID &&
                  isNotificationSubmitted && (
                    <Grid item xs={12}>
                      <Typography
                        variant="subtitle1"
                        color="#5BD050"
                        fontWeight={UI_Typography.FONT_WEIGHT_NORMAL}
                      >
                        Notification envoyée ✔
                      </Typography>
                    </Grid>
                  )}
                <Grid item container xs={12}>
                  <Grid item xs></Grid>
                  <Grid item xs style={{ textAlign: "right" }}>
                    <Button
                      variant="contained"
                      fontSize={14}
                      onClick={() => setOpenConfiramtionDialog(true)}
                      disabled={!comment && !isMEDChecked}
                    >
                      <Typography variant="body1" fontWeight={500} ml={1}>
                        <FormattedMessage
                          id={
                            isMEDChecked
                              ? "quittance.treat.button.notif"
                              : demand.policyPaymentStatusCode ===
                                QUITTANCE_PAYMENT_STATUS_CODES.UNPAID
                              ? "quittance.treat.button.validate"
                              : "button.validate"
                          }
                        />
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
          <DialogConfirmation
            openConfiramtionDialog={openConfiramtionDialog}
            setOpenConfiramtionDialog={setOpenConfiramtionDialog}
            handleSubmit={handleSubmit}
            isLoading={isLoadingQuittanceTreatRecovery}
            error={errorQuittanceTreatRecovery}
            responseData={quittanceTreatRecovery}
          />
        </>
      )}
      <Grid item xs backgroundColor="base.main">
        {status === STEP_STATUSES.DONE && (
          <Accordion
            title={
              <Grid>
                <Typography
                  variant="subtitle1"
                  fontWeight={UI_Typography.FONT_WEIGHT_MEDIUM}
                >
                  {titleDone}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={UI_Typography.FONT_WEIGHT_NORMAL}
                  color="grey"
                >
                  <FormattedMessage
                    id="quittance_details.creation_date"
                    values={{
                      date: format(formattedStatusDate, "dd MMMM yyyy", {
                        locale: fr,
                      }),

                      time: format(formattedStatusDate, "HH:mm"),
                    }}
                  />
                </Typography>
              </Grid>
            }
            expandedValue={1}
            children={
              <>
                {transitionData?.quittanceTimeLine?.comment && (
                  <>
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        color="base.greyMain"
                        mb={2}
                        mt={2}
                      >
                        Commentaire
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="body2" mb={2} mt={2}>
                        {transitionData?.quittanceTimeLine?.comment}
                      </Typography>
                    </Grid>
                  </>
                )}
              </>
            }
          />
        )}
      </Grid>
    </>
  );
};
