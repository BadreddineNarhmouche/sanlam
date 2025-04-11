import { Box, IconButton, Icons, Typography } from "@reinsurance/ui-kit";
import { injectIntl, useIntl } from "react-intl";
import { sideBarHeader } from "./styles";

const SideBarHeader = ({
  toggleSideBar,
  titleId,
}: {
  toggleSideBar: any;
  titleId: any;
  intl: any;
}) => {
  const intl = useIntl();

  return (
    <Box sx={sideBarHeader} px={3} py={1}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h7">
          {intl.formatMessage({ id: titleId })}
        </Typography>
      </Box>
      <IconButton
        aria-controls="menu-appbar"
        color="gray"
        onClick={() => toggleSideBar()}
      >
        <Icons.Close />
      </IconButton>
    </Box>
  );
};

export default injectIntl(SideBarHeader);
