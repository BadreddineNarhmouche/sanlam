import { Grid } from "@checkTracking/ui-kit";
import { useEffect } from "react";
import {
  FilterByAllChecks,
  FilterCriteriaChecks,
  FilterFirstPageTreatment,
  IChecksService,
  IReasonMoveServices,
} from "@checkTracking/helpers";
import { Treatment } from "@checkTracking/shared";
import { getAllChecksByCriteria } from "../../store/Checks/getAllChecksByCriteriaSlice";
import { useDispatch } from "react-redux";
import { getAllChecks } from "../../store/Checks/getAllChecksSlice";
import { AllReasonMove } from "../../store/ReasonMove/ReasonMoveAllSlice";

const TreatmentPage = () => {
  const dispatch = useDispatch();

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
  const filterValues: FilterFirstPageTreatment = {
    lotNumber: "",
    checkNumber: "",
    sinisterNumber: "",
  };
  return (
    <Grid container>
      <Treatment services={CheckServices} initialFilterValues={filterValues} />
    </Grid>
  );
};

export default TreatmentPage;
