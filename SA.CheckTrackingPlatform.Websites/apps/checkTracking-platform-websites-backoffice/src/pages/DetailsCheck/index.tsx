import {
  IDetailsChecksService,
  FilterCriteriaChecks,
} from "@checkTracking/helpers";
import { useEffect, useMemo } from "react";
import { CardContainer } from "@checkTracking/ui-kit";
import { CheckDetails } from "@checkTracking/shared";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { PAGES } from "../../config/navigation";
import { getCheckById } from "../../store/DetailsCh/getByIdChecksSlice";

const DetailsCheck = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const useQuery = () => {
    return useMemo(() => {
      return new URLSearchParams(location.search);
    }, [location.search]);
  };

  const query = useQuery();
  const checkId = query.get("checkId");

  const DetailsChecksService: IDetailsChecksService = {
    getCheckById: (Id: string) => dispatch(getCheckById(Id)),
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CardContainer px={8} pt={8} pb={15.5}>
      {checkId ? (
        <CheckDetails services={DetailsChecksService} checkId={checkId} />
      ) : null}
    </CardContainer>
  );
};

export default DetailsCheck;
