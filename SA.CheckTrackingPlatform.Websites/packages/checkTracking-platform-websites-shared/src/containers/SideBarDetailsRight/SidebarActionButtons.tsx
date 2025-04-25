import {
  Box,
  IconButton,
  Icons,
  Tooltip,
  Typography,
} from "@checkTracking/ui-kit";
import List from "@mui/material/List";
import { useIntl } from "react-intl";
import {
  sideBarButton,
  sideBarButtonContainer,
  sideBarContainer,
} from "./styles";

const SidebarActionButtons = ({
  toggleSideBar,
  isOpen,
  activeTab,
}: {
  toggleSideBar: any;
  isOpen: boolean;
  activeTab?: string;
}) => {
  const intl = useIntl();

  const BUTTONS_CONFIG = [
    {
      name: "documents",
      title: "Documents",
      condition: true,
      onClick: () => toggleSideBar("documents"),
      icon: (
        <Tooltip
          title={intl.formatMessage({
            id: "quittance_details.side_bar.documents_tooltip",
          })}
        >
          <Icons.UploadFileSharp color="primary" />
        </Tooltip>
      ),
    },
  ];

  return (
    <Box sx={sideBarContainer(isOpen)}>
      <List>
        {BUTTONS_CONFIG.map(
          ({ condition, onClick, icon, name, title }, index) =>
            condition && (
              <IconButton
                key={index}
                aria-controls="menu-appbar"
                color="primary"
                onClick={onClick}
                style={sideBarButton(Boolean(activeTab === name))}
              >
                <Box sx={sideBarButtonContainer}>
                  {icon}
                  <Typography
                    variant="button"
                    fontWeight={500}
                    sx={{ fontSize: "10px" }}
                  >
                    {title}
                  </Typography>
                </Box>
              </IconButton>
            )
        )}
      </List>
    </Box>
  );
};

export default SidebarActionButtons;
