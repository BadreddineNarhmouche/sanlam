import { Quittance, translate } from "@checkTracking/helpers";
import {
  Grid,
  IconButton,
  Icons,
  Typography,
  UI_Typography,
} from "@checkTracking/ui-kit";
import { injectIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { headerStyle } from "./styles";

const Header = (props: { quittance: Quittance; intl: any; goBack: string }) => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      flexDirection="row"
      justifyContent="space-between"
      display="flex"
      pt={1}
      pb={1}
      px={4}
      gap={1}
      sx={headerStyle}
    >
      <Grid item>
        <Grid display="flex" flexDirection="row" alignItems="center">
          <IconButton
            aria-controls="menu-appbar"
            color="primary"
            onClick={() =>
              props.goBack ? navigate(props.goBack) : navigate("/demands")
            }
          >
            <Icons.ArrowBack color="primary" />
          </IconButton>
          <Typography
            variant="h7"
            fontWeight={UI_Typography.FONT_MONTSERRAT_REGULAR}
            ml={3}
            mr={1.5}
          >
            {translate("quittance_details.reference", props.intl, {
              reference:
                props.quittance?.policyReference +
                  "-" +
                  props.quittance?.reference || "",
            })}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default injectIntl(Header);
