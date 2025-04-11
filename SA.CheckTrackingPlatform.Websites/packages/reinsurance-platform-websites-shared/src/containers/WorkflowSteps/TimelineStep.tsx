import { Grid } from "@reinsurance/ui-kit";
import components from "./components";

export const TimelineStep = ({
  component,
  status,
  canValidate,
  titleDoing,
  titleDone,
  statusDate,
  currentTimelineId,
  publicContentDoing,
  publicContentDone,
  nextTransitions,
  handleChangeData,
  demand,
  defaultData,
  transitionData,
  downloadTransitionFile,
  services,
  setDialogOpen,
  setPDFViewer,
  bankData,
  currenciesData,
  seuilQuittance,
}: {
  component: string;
  status: string;
  canValidate: boolean;
  titleDoing?: string;
  titleDone?: string;
  statusDate: string;
  currentTimelineId: string;
  publicContentDoing?: string;
  publicContentDone?: string;
  nextTransitions: any;
  handleChangeData: (data: any) => void;
  demand?: any;
  defaultData?: string;
  action?: string;
  transitionData?: any;
  downloadTransitionFile?: (payload: any) => void;
  services?: any;
  setDialogOpen?: any;
  setPDFViewer?: React.Dispatch<
    React.SetStateAction<{
      file: string | null;
      fileName: string;
      open: boolean;
    }>
  >;
  bankData?: any;
  currenciesData?: any;
  seuilQuittance?:any;
}) => {
  const ComponentToDisplay = components[component];

  return (
    <Grid container>
      {ComponentToDisplay && (
        <ComponentToDisplay
          status={status}
          titleDoing={titleDoing}
          titleDone={titleDone}
          readOnly={!canValidate}
          statusDate={statusDate}
          currentTimelineId={currentTimelineId}
          publicContentDone={publicContentDone}
          publicContentDoing={publicContentDoing}
          nextTransitions={nextTransitions}
          handleChangeData={handleChangeData}
          demand={demand}
          defaultData={defaultData}
          transitionData={transitionData}
          downloadTransitionFile={downloadTransitionFile}
          services={services}
          setDialogOpen={setDialogOpen}
          setPDFViewer={setPDFViewer}
          bankData={bankData}
          currenciesData={currenciesData}
          seuilQuittance={seuilQuittance}
        />
      )}
    </Grid>
  );
};
