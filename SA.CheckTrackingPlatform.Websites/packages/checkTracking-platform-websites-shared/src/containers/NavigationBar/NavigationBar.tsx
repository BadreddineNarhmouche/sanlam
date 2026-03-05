import { INotificationService } from "@checkTracking/helpers";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Tabs,
  Toolbar,
  Typography,
  UI_Typography,
  assets,
} from "@checkTracking/ui-kit";
import AppsIcon from "@mui/icons-material/Apps";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../Layout";
import styles from "./styles";
interface Links {
  label: string;
  to: string;
  isHidden?: boolean;
}
interface NavItems {
  links: Links[];
  applicationName: string;
  hiddenlinks?: Links[];
}
interface Props {
  navItems: NavItems;
  services?: INotificationService;
  showNavigationBar: boolean;
}

export const NavigationBar: React.FC<Props> = (props, theme) => {
  const navigate = useNavigate();
  const { navItems } = props;
  const { pathname } = useLocation();
  const currentRoot = pathname.split("/")[1] ? `/${pathname.split("/")[1]}` : "/";
  const selectedTabValue = navItems.links?.some((link) => link.to === currentRoot)
    ? currentRoot
    : undefined;

  const handleTabsChange = (
    event: any,
    value: React.SetStateAction<string>
  ) => {};

  return (
    <>
      <AppBar position="fixed" elevation={18}>
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Box>
              <IconButton aria-controls="menu-appbar" color="primary">
                <AppsIcon sx={{ color: "primary.dark" }} />
              </IconButton>
            </Box>
            <Box style={styles.logo}>
              <img
                src={assets.sanlam_logo.default}
                alt="Sanlam"
                width="120"
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
              />
            </Box>
            <Box style={styles.logoresponsive}>
              <img src={assets.sanlam_logo.default} alt="Sanlam" width="120" />
            </Box>
            <Typography
              sx={styles.appName}
              color="primary.main"
              fontWeight={UI_Typography.FONT_WEIGHT_LIGHT}
              variant="h7"
            >
              {navItems.applicationName}
            </Typography>
            <Box sx={styles.boxTabs}>
              {props.showNavigationBar && (
                <Tabs
                  value={selectedTabValue}
                  onChange={handleTabsChange}
                  tabs={navItems.links}
                ></Tabs>
              )}
            </Box>
            <Box>
              <User />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
