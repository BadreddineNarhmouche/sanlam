import {
  IQuittanceService,
  FilterCriteriaQuittances,
} from "@reinsurance/helpers";
import { Demande } from "@reinsurance/shared";
import { PAGES } from "../../config/navigation";
import { useDispatch } from "react-redux";
import { getAllSubscriptionQuittancesByCriteria } from "../../store/Quittances/quittancesSubscriptionListSlice";
import {
  getQuittanceById,
  clearGetQuittanceById,
} from "../../store/Quittances/quittanceSlice";
import { reinsurerAll } from "../../store/Quittances/reinsurerSlice";
import { quittanceStatusByAll } from "../../store/Quittances/quittanceStatusByAllSlice";
import { getAllOtherQuittancesByCriteria } from "../../store/Quittances/quittancesOtherListSlice";
import { useLocation } from "react-router-dom";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const quittanceServices: IQuittanceService = {
    getAllSubscriptionQuittancesByCriteria: (
      criteria: FilterCriteriaQuittances
    ) => dispatch(getAllSubscriptionQuittancesByCriteria(criteria)),
    getAllOtherQuittancesByCriteria: (criteria: FilterCriteriaQuittances) =>
      dispatch(getAllOtherQuittancesByCriteria(criteria)),
    clearGetQuittanceById: () => {
      dispatch(clearGetQuittanceById());
    },
    reinsurerByAll: () => {
      dispatch(reinsurerAll());
    },
    getQuittanceById: (id: string) => dispatch(getQuittanceById(id)),
    getQuittanceStatus: (payload: any) => {
      dispatch(quittanceStatusByAll(payload));
    },
  };

  const filterValues: FilterCriteriaQuittances = {
    reference: "",
    quittanceStatusId: "",
    policyReference: "",
    externalPartnerUserCode: "",
    externalReinsuranceReference: "",
    primeNetMin: "",
    primeNetMax: "",
    dateCreation: "",
  };
  var pathArray = location.pathname;
  return (
    <>
      <Demande
        quittanceServices={quittanceServices}
        detailsPage={PAGES.DEMANDS_DETAILS}
        initialFilterValues={filterValues}
        goBackPage={
          pathArray === PAGES.DEMANDS_PRODUCER
            ? PAGES.DEMANDS_PRODUCER
            : PAGES.DEMANDS
        }
      />
    </>
  );
};

export default DashboardPage;
