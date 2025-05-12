import { IChecksService } from "@checkTracking/helpers";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const CheckDetails = ({ services }: { services: IChecksService }) => {
  const handleSubmit = () => {
    services.getCheckById && services.getCheckById("1");
  };

  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { responseData: getCheckById } = useSelector(
    (state: any) => state.getCheckById
  );

  useEffect(() => {
    console.log(getCheckById);
  }, [getCheckById]);

  return (
    <>
      Information Sur chéques<br></br>
      {getCheckById.amount}
      {getCheckById.beneficiaryName}
    </>
  );
};
