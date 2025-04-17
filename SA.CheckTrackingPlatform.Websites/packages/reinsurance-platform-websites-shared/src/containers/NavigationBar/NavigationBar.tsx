import { INotificationService } from '@reinsurance/helpers';
import {
  AppBar,
  Badge,
  Box,
  Container,
  IconButton,
  Tabs,
  Toolbar,
  Typography,
  UI_Typography,
  assets,
} from '@reinsurance/ui-kit';
import AppsIcon from '@mui/icons-material/Apps';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../Layout';
import styles from './styles';
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
  services: INotificationService;
  showNavigationBar: boolean;
}

export const NavigationBar: React.FC<Props> = (props, theme) => {
  const navigate = useNavigate();
  const { navItems } = props;
  const [[, currentRoot]] = useLocation().pathname.matchAll(/^(\/[^/]*)/g);
  const [tabsValue, setTabsValue] = useState(currentRoot);

  const currentRootInNavItems = navItems.links?.find(
    (link) => link.to === currentRoot,
  );

  useEffect(() => {
    setTabsValue(currentRoot);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoot]);

  const handleTabsChange = (
    event: any,
    value: React.SetStateAction<string>,
  ) => {
    setTabsValue(value);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" elevation={18}>
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Box>
              <IconButton aria-controls="menu-appbar" color="primary">
                <AppsIcon sx={{ color: 'primary.dark' }} />
              </IconButton>
            </Box>
            <Box style={styles.logo}>
              <img
                src={assets.sanlam_logo.default}
                alt="Sanlam"
                width="120"
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
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
                  {...(currentRootInNavItems ? { value: tabsValue } : {})}
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
