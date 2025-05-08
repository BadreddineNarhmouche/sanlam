import { FilterCriteriaChecks, IChecksService } from "@checkTracking/helpers";
import { Checks, KPIs } from "@checkTracking/shared";
import { Grid } from "@checkTracking/ui-kit";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllChecks } from "../../store/Checks/getAllChecksSlice";
import { PAGES } from "../../config/navigation";

const HomePage = () => {
  const dispatch = useDispatch();

  const CheckServices: IChecksService = {
    getAllChecksByCriteria: (criteria: FilterCriteriaChecks) =>
      dispatch(getAllChecks(criteria)),
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filterValues: FilterCriteriaChecks = {
    reference: "",
    policyReference: "",
    externalPartnerUserCode: "",
    primeNetMin: "",
    primeNetMax: "",
  };

  return (
    <>
      <Grid container>
        <KPIs />
        <Checks
          services={CheckServices}
          detailsPage={PAGES.DETAILS_CHECK}
          initialFilterValues={filterValues}
        />
      </Grid>
    </>
  );
};

export default HomePage;
