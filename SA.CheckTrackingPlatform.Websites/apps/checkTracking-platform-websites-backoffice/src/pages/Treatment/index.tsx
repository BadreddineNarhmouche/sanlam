import { Grid } from "@checkTracking/ui-kit";
import { useEffect } from "react";
import {
  FilterByAllChecks,
  FilterCriteriaChecks,
  FilterFirstPageTreatment,
  IChecksService,
} from "@checkTracking/helpers";
import { Treatment } from "@checkTracking/shared";
import { getAllChecksByCriteria } from "../../store/Checks/getAllChecksByCriteriaSlice";
import { useDispatch } from "react-redux";
import { getAllChecks } from "../../store/Checks/getAllChecksSlice";

const TreatmentPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
