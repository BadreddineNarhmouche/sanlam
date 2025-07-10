import { Grid } from "@checkTracking/ui-kit";
import { useEffect } from "react";
import {
  FilterByAllChecks,
  FilterCriteriaChecks,
  FilterFirstPageTreatment,
  IChecksService,
  ITimeLineService,
} from "@checkTracking/helpers";
import { IReasonMoveService } from "@checkTracking/helpers";
import { Treatment } from "@checkTracking/shared";
import { getAllChecksByCriteria } from "../../store/Checks/getAllChecksByCriteriaSlice";
import { useDispatch } from "react-redux";
import { getAllChecks } from "../../store/Checks/getAllChecksSlice";
import { AllReasonMove } from "../../store/ReasonMove/ReasonMoveAllSlice";
import { CreateTimeline } from "../../store/timeline/TimelineCreateSlice";

const TreatmentPage = () => {
  const dispatch = useDispatch();

  const ReasonMoveService: IReasonMoveService = {
    AllReasonMoves: (To: any) => dispatch(AllReasonMove(To)),
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(AllReasonMove());
  }, [dispatch]);

  const CheckServices: IChecksService = {
    getAllChecksByCriteria: (criteria: FilterCriteriaChecks) =>
      dispatch(getAllChecksByCriteria(criteria)),
    getAllChecks: (criteria: FilterByAllChecks) =>
      dispatch(getAllChecks(criteria)),
  };

  const TimeLineService: ITimeLineService = {
    CreateTimeLine: (criteria: any) =>
      dispatch(CreateTimeline(criteria)),
  };

  const filterValues: FilterFirstPageTreatment = {
    lotNumber: "",
    checkNumber: "",
    sinisterNumber: "",
  };

  return (
    <Grid container>
      <Treatment
        services={CheckServices}
        initialFilterValues={filterValues}
        reasonMoveService={ReasonMoveService}
        timeLineService={TimeLineService}
      />
    </Grid>
  );
};

export default TreatmentPage;
