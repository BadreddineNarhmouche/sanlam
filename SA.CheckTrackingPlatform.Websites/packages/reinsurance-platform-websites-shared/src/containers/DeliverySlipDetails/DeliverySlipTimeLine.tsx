/* eslint-disable react-hooks/exhaustive-deps */
import { GeneralHelper } from "@reinsurance/helpers";
import { TimelineStep } from "../WorkflowSteps/TimelineStep";
import { STEP_STATUSES } from "../WorkflowSteps/constants";
import useRole from "../../Roles/useRole";
import { UserService } from "@reinsurance/helpers";
import emptyStateDesk from "@reinsurance/ui-kit/src/assets/images/emptyStateDesk.svg";

import { Grid, Timeline, EmptyState, Icons } from "@reinsurance/ui-kit";

import { useIntl } from "react-intl";

const DeliverySlipTimeLine = (props: {
  deliverySlip: any;
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
  bankData: any;
  currenciesData:any;
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
          demand={props.deliverySlip}
          transitionData={item?.transition}
          downloadTransitionFile={
            props.services.downloadDeliverySlipDocumentById
          }
          services={props.services}
          setDialogOpen={props.setDialogOpen}
          setPDFViewer={props.setPDFViewer}
          bankData={props.bankData}
          currenciesData={props.currenciesData}
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
      {props.deliverySlip.isSuccess ? (
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
                props.deliverySlip?.id &&
                  props.services.getDeliverySlipById(props.deliverySlip?.id);
              }),
          }}
        />
      )}
    </Grid>
  );
};
export default DeliverySlipTimeLine;
