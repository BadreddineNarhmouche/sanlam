import { DeliverySlip, translate } from "@checkTracking/helpers";
import {
  Button,
  Grid,
  IconButton,
  Icons,
  Typography,
  UI_Typography,
} from "@checkTracking/ui-kit";
import { FormattedMessage, injectIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { headerStyle } from "./styles";

const Header = (props: {
  deliverySlip: DeliverySlip | any;
  intl: any;
  setOpenConfirmationDialog: any;
  displayButton: any;
}) => {
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
      <Grid display="flex" flexDirection="row" alignItems="center">
        <IconButton
          aria-controls="menu-appbar"
          color="primary"
          onClick={() => navigate(`${"/"}?tab=${1}`)}
        >
          <Icons.ArrowBack color="primary" />
        </IconButton>

        <Typography
          variant="h7"
          fontWeight={UI_Typography.FONT_MONTSERRAT_REGULAR}
          ml={3}
          mr={1.5}
        >
          {translate("deliverySlip_details.reference", props.intl, {
            reference: props.deliverySlip?.reference || "",
          })}
        </Typography>
      </Grid>
      <Grid>
        {props.displayButton ? (
          <Button
            style={{ justifyContent: "right" }}
            variant="contained"
            fontSize={14}
            onClick={() => props.setOpenConfirmationDialog()}
          >
            <Typography variant="body1" fontWeight={500} ml={1}>
              <FormattedMessage id={"quittance.treat.button.rollback"} />
            </Typography>
          </Button>
        ) : null}
      </Grid>
    </Grid>
  );
};
export default injectIntl(Header);
