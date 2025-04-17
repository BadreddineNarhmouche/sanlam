import React, { memo } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import GridViewIcon from '@mui/icons-material/GridView';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Typography } from '../../atoms';
import Tabs from '../Tabs/Tabs';

interface Btn {
  label: string;
  onClick: () => void;
}
interface Links {
  links: { label: string; to: string }[];
  button: Btn;
  username: string;
}

interface Props {
  navItems: Links;
}

const NavbarComponent: React.FC<Props> = ({ navItems }) => {
  const { links, button, username } = navItems;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <GridViewIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Logo
          </Typography>
          <Tabs tabs={links} />
          <p>Signed in as {username}</p>
          <button style={{ marginRight: 0 }} onClick={button.onClick}>
            {button.label}
          </button>
          <AccountCircleOutlinedIcon sx={{ mr: 2 }} />
          <NotificationsOutlinedIcon sx={{ mr: 2 }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default memo(NavbarComponent);
