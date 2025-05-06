import { FilterCriteriaChecks, IChecksService } from "@checkTracking/helpers";
import { Checks } from "@checkTracking/shared";
import { Grid } from "@checkTracking/ui-kit";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllChecks } from "../../store/Checks/getAllChecksSlice";
import { PAGES } from "../../config/navigation";

const HomePage = () => {
  const dispatch = useDispatch();

  const quittanceServices: IChecksService = {
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
        {/* <IndicatorsBO
          quittanceServices={quittanceServices}
          KPIsService={KPIsService}
        /> */}
        <Checks
          services={quittanceServices}
          detailsPage={PAGES.DETAILS_CHECK}
          initialFilterValues={filterValues}
        />
      </Grid>
    </>
  );
};

export default HomePage;
// No additional code is needed at $PLACEHOLDER$. The component is already complete and functional.
