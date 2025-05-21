import { Grid } from "@checkTracking/ui-kit";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { PAGES } from "../../config/navigation";
import { FilterCriteriaChecks } from "@checkTracking/helpers";
import { Treatment } from "@checkTracking/shared";

const TreatmentPage = () => {
  const intl = useIntl();
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
