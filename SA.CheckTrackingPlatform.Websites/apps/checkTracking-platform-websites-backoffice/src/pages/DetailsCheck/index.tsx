import {
  IDetailsChecksService,
  FilterCriteriaChecks,
} from "@checkTracking/helpers";
import { useEffect } from "react";
import { CardContainer } from "@checkTracking/ui-kit";
import { CheckDetails } from "@checkTracking/shared";
import { useDispatch } from "react-redux";
import { getCheckById } from "../../store/DetailsCh/getByIdChecksSlice";
import { PAGES } from "../../config/navigation";

const DetailsCheck = () => {
  const dispatch = useDispatch();

  const DetailsChecksService: IDetailsChecksService = {
    getCheckById: (criteria: FilterCriteriaChecks) =>
      dispatch(getCheckById(criteria)),
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CardContainer px={8} pt={8} pb={15.5}>
      <CheckDetails
        services={DetailsChecksService}
        detailsPage={PAGES.DETAILS_CHECK}
      />
    </CardContainer>
  );
};

export default DetailsCheck;
