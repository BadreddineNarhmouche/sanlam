import {
  FilterCriteriaChecks,
  IChecksService,
  IStatusService,
  IKPIService,
} from "@checkTracking/helpers";
import { Checks, KPIs } from "@checkTracking/shared";
import { Grid } from "@checkTracking/ui-kit";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllChecksByCriteria } from "../../store/Checks/getAllChecksByCriteriaSlice";
import { PAGES } from "../../config/navigation";
import { AllStatus } from "../../store/Status/StatusAllSlice";
import { GetCheckTrackingKPIs } from "../../store/KPIs/CheckTrackingKPISlice";
import { exportDocumentKpiExcelSlice } from "../../store/KPIs/ExportDocumentKpiExcelSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  const CheckServices: IChecksService = {
    getAllChecksByCriteria: (criteria: FilterCriteriaChecks) =>
      dispatch(getAllChecksByCriteria(criteria)),
  };

  const StatusServices: IStatusService = {
    getAllStatus: () => dispatch(AllStatus()),
  };

  const KPIsService: IKPIService = {
    GetKPIs: () => dispatch(GetCheckTrackingKPIs()),
    exportDocumentKpiExcelSlice: (payload: any) => {
      dispatch(exportDocumentKpiExcelSlice(payload));
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filterValues: FilterCriteriaChecks = {
    checkNumber: "",
    lotNumber: "",
    sinisterNumber: "",
    checkStatusId: "",
  };

  return (
    <>
      <Grid container>
        <Checks
          services={CheckServices}
          statusServices={StatusServices}
          detailsPage={PAGES.DETAILS_CHECK}
          initialFilterValues={filterValues}
          KPIservice={KPIsService}
        />
      </Grid>
    </>
  );
};

export default HomePage;
