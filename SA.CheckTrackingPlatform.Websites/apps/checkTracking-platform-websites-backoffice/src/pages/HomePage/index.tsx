import {
  FilterCriteriaChecks,
  IChecksService,
  IStatusService,
} from "@checkTracking/helpers";
import { Checks, KPIs } from "@checkTracking/shared";
import { Grid } from "@checkTracking/ui-kit";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllChecksByCriteria } from "../../store/Checks/getAllChecksByCriteriaSlice";
import { PAGES } from "../../config/navigation";
import { AllStatus } from "../../store/Status/StatusAllSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  const CheckServices: IChecksService = {
    getAllChecksByCriteria: (criteria: FilterCriteriaChecks) =>
      dispatch(getAllChecksByCriteria(criteria)),
  };

  const StatusServices: IStatusService = {
    getAllStatus: () => dispatch(AllStatus()),
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filterValues: FilterCriteriaChecks = {
    reference: "",
    policyReference: "",
    primeNetMin: "",
    primeNetMax: "",
  };

  return (
    <>
      <Grid container>
        <KPIs />
        <Checks
          services={CheckServices}
          statusServices={StatusServices}
          detailsPage={PAGES.DETAILS_CHECK}
          initialFilterValues={filterValues}
        />
      </Grid>
    </>
  );
};

export default HomePage;
// No additional code is needed at $PLACEHOLDER$. The component is already complete and functional.
