import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  Button,
  Grid,
  Typography,
  UI_Typography,
  Dialog,
} from '@checkTracking/ui-kit';
import { useSelector } from 'react-redux';
import { STEP_STATUSES } from '../constants';
import { DialogConfirmation } from '../DialogConfirmation';

export const MultipleChoice = ({
  status,
  data,
  readOnly,
  statusDate,
  nextTransitions,
  currentTimelineId,
  nextValidTransition,
  validateHistory,
  publicStatus,
  privateStatus,
  stepName,
  services,
  isBackOffice,
  isSubscriberTimeline,
}: {
  status: string;
  data: {
    branches: {
      key: string;
      label: string;
      titleDone: string;
    }[];
    multipleChoiceLabel: string;
  };
  readOnly: boolean;
  titleDoing?: string;
  titleDone?: string;
  statusDate: any;
  nextTransitions: any;
  currentTimelineId: string;
  nextValidTransition: any;
  validateHistory: any;
  publicContentDone?: string;
  publicContentDoing?: string;
  publicStatus?: string;
  privateStatus?: string;
  handleChangeData?: (data: any) => void;
  defaultData?: string;
  action?: string;
  stepName: string;
  services: any;
  isBackOffice: boolean;
  isSubscriberTimeline: boolean;
}) => {
  const [openConfiramtionDialog, setOpenConfiramtionDialog] = useState(false);
  const [choice, setChoice] = useState<any>({});

  const {
    isLoading: isLoadingValidateQuittanceWorkflowWrapper,
    error: errorValidateQuittanceWorkflowWrapper,
    responseData: workflowQuittanceValidateData,
  } = useSelector((state: any) => state?.workflowQuittanceValidateWrapper);

  const handleSelectChoice = (_choice: any) => {
    setChoice(_choice);
    setOpenConfiramtionDialog(true);
  };

  const handleConfirmChoice = () => {
    const selectedNextTransition = nextTransitions?.find(
      (item: any) => item.branchKey === choice.key,
    );
    validateHistory &&
      validateHistory({
        id: currentTimelineId,
        nextTransitionAction: choice?.titleDone,
        nextTransitionId: selectedNextTransition?.id,
        formValues: {
          publicStatus,
          privateStatus,
        },
        stepName,
        withNotification: false,
      });
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        px={4}
        py={3}
        ml={0}
        mt={1}
        style={{
          border: '1px solid #EBEEF1',
          borderRadius: 4,
        }}
        backgroundColor="base.main"
      >
        {status === STEP_STATUSES.TODO && (
          <Grid display="flex" flexDirection="row" alignItems="center">
            <Grid item>
              <Typography
                variant="subtitle1"
                fontWeight={UI_Typography.FONT_WEIGHT_NORMAL}
              >
                {data?.multipleChoiceLabel}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={2} ml={3}>
                {data?.branches?.map((item: any, index: number) => (
                  <Grid item key={index}>
                    <Button
                      disabled={readOnly}
                      fontSize={12}
                      key={index}
                      color={'primary'}
                      variant="contained"
                      onClick={() =>
                        readOnly ? undefined : handleSelectChoice(item)
                      }
                      style={{ height: '80%' }}
                    >
                      <Typography variant="button">{item.label}</Typography>
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        )}
        {status === STEP_STATUSES.DONE && (
          <Grid>
            <Typography
              variant="subtitle1"
              fontWeight={UI_Typography.FONT_WEIGHT_MEDIUM}
            >
              {
                data?.branches?.find(
                  (item: any) =>
                    item.key ===
                    nextValidTransition?.timelineTransition?.branchKey,
                )?.titleDone
              }
            </Typography>
            <Typography
              variant="body2"
              fontWeight={UI_Typography.FONT_WEIGHT_NORMAL}
              color="grey"
            >
              <FormattedMessage
                id="quittance_details.creation_date"
                values={{
                  date: format(new Date(statusDate), 'dd MMMM yyyy', {
                    locale: fr,
                  }),
                  time: format(new Date(statusDate), 'HH:mm'),
                }}
              />
            </Typography>
          </Grid>
        )}
      </Grid>
      <Dialog
        fullWidth
        open={openConfiramtionDialog}
        footerWithBorder={true}
        title={<FormattedMessage id="workflow.confirm_dialog_title" />}
        content={
          <Typography variant="body2">
            <FormattedMessage
              id="workflow.confirm_dialog_message"
              values={{
                choice: (
                  <span style={{ fontWeight: 'bold' }}>
                    {`"${choice?.label}"`}
                  </span>
                ),
              }}
            />
          </Typography>
        }
        actions={
          <>
            <Button
              variant="outlined"
              onClick={() => setOpenConfiramtionDialog(false)}
            >
              <Typography variant="button">
                <FormattedMessage id="button.abandon" />
              </Typography>
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleConfirmChoice();
              }}
            >
              <Typography variant="button">
                <FormattedMessage id="button.confirm" />
              </Typography>
            </Button>
          </>
        }
      />

      <DialogConfirmation
        openConfiramtionDialog={openConfiramtionDialog}
        setOpenConfiramtionDialog={setOpenConfiramtionDialog}
        handleSubmit={handleConfirmChoice}
        choice={choice?.label}
        isLoading={isLoadingValidateQuittanceWorkflowWrapper}
        error={errorValidateQuittanceWorkflowWrapper }
        responseData={workflowQuittanceValidateData}
        handleCancel={
          isSubscriberTimeline
            ? services?.resetQuittanceWorkflowWrapper
            : services?.resetQuittanceWorkflowWrapper
        }
      />
    </>
  );
};
