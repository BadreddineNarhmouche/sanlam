import { IDetailsChecksService } from "@checkTracking/helpers";
import { useEffect, useMemo } from "react";
import { CardContainer } from "@checkTracking/ui-kit";
import { CheckDetails } from "@checkTracking/shared";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getCheckById } from "../../store/DetailsCh/getByIdChecksSlice";

const DetailsCheck = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const checkId = useMemo(() => {
    const q = new URLSearchParams(location.search);
    return q.get("checkId") || "";
  }, [location.search]);

  const service: IDetailsChecksService = {
    getCheckById: (id: string) => dispatch(getCheckById(id)),
  };

  useEffect(() => {
    if (checkId) service.getCheckById!(checkId);
  }, [checkId]);

  return (
    <CardContainer px={8} pt={8} pb={15.5}>
      {checkId && <CheckDetails services={service} checkId={checkId} />}
    </CardContainer>
  );
};

export default DetailsCheck;
