/* eslint-disable react-hooks/exhaustive-deps */
import { GeneralHelper } from "@checkTracking/helpers";
import { TimelineStep } from "../WorkflowSteps/TimelineStep";
import { STEP_STATUSES } from "../WorkflowSteps/constants";
import useRole from "../../Roles/useRole";
import { UserService } from "@checkTracking/helpers";
import emptyStateDesk from "@checkTracking/ui-kit/src/assets/images/emptyStateDesk.svg";

import { Grid, Timeline, EmptyState, Icons } from "@checkTracking/ui-kit";

import { useIntl } from "react-intl";

const QuittanceTimeLine = (props: {
  quittance: any;
  workflowTranstionsData: any;
  services: any;
  setDialogOpen: any;
  setPDFViewer: React.Dispatch<
    React.SetStateAction<{
      file: string | null;
      fileName: string;
      open: boolean;
    }>
  >;
  quittancePaymentData?: any;
}) => {
  const intl = useIntl();
  const handleChangeData = (data: any) => {};

  const [roles] = useRole();
  const renderSteps = () => {
    return props.workflowTranstionsData?.map((item: any, index: number) => ({
      content: (
        <TimelineStep
          nextTransitions={item.nextTransitions || []}
          currentTimelineId={item.id}
          key={index}
          component={item.timelineTransition?.destinationStep.moduleName}
          titleDoing={item.timelineTransition?.destinationStep?.title}
          titleDone={item.timelineTransition?.destinationStep?.title}
          status={item.status}
          canValidate={
            item.status === STEP_STATUSES.DONE ||
            roles.some((role) =>
              item.timelineTransition?.destinationStep?.timelineStepProfilValidators
                ?.map(
                  (timelineStepProfilValidator: any) =>
                    timelineStepProfilValidator.profil
                )
                ?.includes(role)
            )
          }
          statusDate={item.updatedAt}
          publicContentDone={
            item.timelineTransition?.destinationStep?.publicContentDone
          }
          publicContentDoing={
            item.timelineTransition?.destinationStep?.publicContentDoing
          }
          defaultData={item.timelineTransition?.destinationStep?.defaultData}
          handleChangeData={(data: any) => handleChangeData(data)}
          demand={props.quittance}
          transitionData={item?.transition}
          downloadTransitionFile={props.services.downloadQuittanceDocumentById}
          services={props.services}
          setDialogOpen={props.setDialogOpen}
          setPDFViewer={props.setPDFViewer}
          seuilQuittance={
            props.quittancePaymentData?.differenceNetAmountToPay <
            props.quittance?.seuilQuittance
              ? false
              : true
          }
        />
      ),
      isDone: item.status === STEP_STATUSES.DONE,
    }));
  };

  return (
    <Grid
      container
      flexDirection="row"
      backgroundColor="base.baseGreyLightBackground"
      justifyContent="center"
    >
      {props.quittance.isSuccess ? (
        !GeneralHelper.isObjectNullOrEmpty(props.workflowTranstionsData) ? (
          <Timeline content={[...renderSteps()]} />
        ) : (
          <Grid mt={1}>
            <EmptyState
              title={intl.formatMessage({ id: "demands.empty.title" })}
              subTitle={""}
              image={emptyStateDesk}
            />
          </Grid>
        )
      ) : (
        <EmptyState
          title={intl.formatMessage({
            id: "error.api.title",
          })}
          subTitle={intl.formatMessage({
            id: "error.api.subTitle",
          })}
          action={{
            label: intl.formatMessage({ id: "button.retry" }),
            startIcon: <Icons.Refresh />,
            onClick: () =>
              UserService.refreshToken().then(() => {
                props.quittance?.id &&
                  props.services.getQuittanceById(props.quittance?.id);
              }),
          }}
        />
      )}
    </Grid>
  );
};
export default QuittanceTimeLine;
