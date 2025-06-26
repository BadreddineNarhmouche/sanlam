import { IDetailsChecksService } from "@checkTracking/helpers";
import { useEffect, useMemo } from "react";
import { CardContainer } from "@checkTracking/ui-kit";
import { CheckDetails } from "@checkTracking/shared";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getCheckById } from "../../store/DetailsCh/getByIdChecksSlice";

const DetailsCheck = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const detailsChecksService: IDetailsChecksService = {
    getCheckById: (criteria: string) => dispatch(getCheckById(criteria)),
  };

  const checkId = useMemo(() => {
    const q = new URLSearchParams(location.search);
    return q.get("checkId") || "";
  }, [location.search]);

  useEffect(() => {
    if (checkId)
      detailsChecksService.getCheckById &&
        detailsChecksService.getCheckById(checkId);
  }, [checkId, detailsChecksService]);

  return (
    <CardContainer px={8} pt={8} pb={15.5}>
      {checkId && (
        <CheckDetails services={detailsChecksService} checkId={checkId} />
      )}
    </CardContainer>
  );
};

export default DetailsCheck;
