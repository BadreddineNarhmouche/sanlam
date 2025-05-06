import { useEffect } from "react";
import { CardContainer } from "@checkTracking/ui-kit";
import { CheckDetails } from "@checkTracking/shared";

const DetailsCheck = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CardContainer px={8} pt={8} pb={15.5}>
      <CheckDetails />
    </CardContainer>
  );
};

export default DetailsCheck;
