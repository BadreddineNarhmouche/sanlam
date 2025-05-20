import { Grid } from "@checkTracking/ui-kit";
import { useIntl } from "react-intl";

export const Treatment = () => {
  const intl = useIntl();

  return (
    <>
      <Grid container direction="column" px={8} py={7} id="quittance-table">
        Traitement
      </Grid>
    </>
  );
};
