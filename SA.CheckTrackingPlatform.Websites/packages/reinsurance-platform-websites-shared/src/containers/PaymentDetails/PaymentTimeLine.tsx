/* eslint-disable react-hooks/exhaustive-deps */
import useRole from "../../Roles/useRole";
import { UserService } from "@reinsurance/helpers";
// import emptyStateDesk from "@reinsurance/ui-kit/src/assets/images/emptyStateDesk.svg";
import { TimelineStep } from "../WorkflowSteps/TimelineStep";
import { STEP_STATUSES } from "../WorkflowSteps/constants";

import { Grid, EmptyState, Icons, Timeline } from "@reinsurance/ui-kit";

import { useIntl } from "react-intl";

const PaymentTimeLine = (props: {
  payment: any;
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
}) => {
  const intl = useIntl();
  const handleChangeData = (data: any) => {};

  const [roles] = useRole();
  const renderSteps = () => {
    return props.workflowTranstionsData?.map((item: any, index: number) => ({
      content: (
        <TimelineStep
          nextTransitions={[]}
          currentTimelineId={"0"}
          component={"AccountingProcessing"}
            titleDoing={"Comptabilité"}
          status={"TODO"}
          canValidate={true}
          statusDate={"0001-01-01T00:00:00"}
          handleChangeData={(data: any) => handleChangeData(data)}
          demand={props.payment}
          downloadTransitionFile={
            props.services.downloadDeliverySlipDocumentById
          }
          services={props.services}
          setDialogOpen={props.setDialogOpen}
          setPDFViewer={props.setPDFViewer}
        />
      ),
    }));
  };

  return (
    <Grid
      container
      flexDirection="row"
      backgroundColor="base.baseGreyLightBackground"
      justifyContent="center"
    >
      {props.payment.isSuccess ? (
        <Timeline content={[...renderSteps()]} />
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
                props.payment?.id &&
                  props.services.getDeliverySlipById(props.payment?.id);
              }),
          }}
        />
      )}
    </Grid>
  );
};
export default PaymentTimeLine;
