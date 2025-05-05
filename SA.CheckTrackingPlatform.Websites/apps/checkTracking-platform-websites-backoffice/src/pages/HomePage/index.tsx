import { FilterCriteriaService } from "@checkTracking/helpers";
import { FirstPage } from "@checkTracking/shared";
import { Grid } from "@checkTracking/ui-kit";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filterValues: FilterCriteriaService = {
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
        <FirstPage
          services={""}
          detailsPage={""}
          initialFilterValues={filterValues}
        />
      </Grid>
    </>
  );
};

export default HomePage;
