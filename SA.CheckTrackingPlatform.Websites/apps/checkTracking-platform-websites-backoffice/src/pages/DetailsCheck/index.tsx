import { useEffect } from "react";
import { CardContainer } from "@checkTracking/ui-kit";
import { CheckDetails } from "@checkTracking/shared";
import { IChecksService } from "@checkTracking/helpers";
import { useDispatch } from "react-redux";
import { getCheckById } from "../../store/Checks/getCheckByIdSlice";

const DetailsCheck = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();

  const CheckServices: IChecksService = {
    getCheckById: (Id: string) => dispatch(getCheckById(Id)),
  };

  return (
    <CardContainer px={8} pt={8} pb={15.5}>
      <CheckDetails services={CheckServices} />
    </CardContainer>
  );
};

export default DetailsCheck;
