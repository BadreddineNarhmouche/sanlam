import { Grid } from "@checkTracking/ui-kit";
import { useEffect } from "react";
import { FilterCriteriaChecks } from "@checkTracking/helpers";
import { Treatment } from "@checkTracking/shared";

const TreatmentPage = () => {
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
  <Grid container>
      <Treatment
      //  services={CheckServices}
      //  detailsPage={PAGES.TREATMENT_CHECK}
       initialFilterValues={filterValues}
      />
    </Grid>
  );
};

export default TreatmentPage;
