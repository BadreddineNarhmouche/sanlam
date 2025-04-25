const styles = {
  logo: {
    marginLeft: '10px',
    marginRight: '24px',
  },
  logoresponsive: {
    display: 'none',
    '@media (maxWidth: 768px)': {
      display: 'block',
    },
  },
  appName: {
    mr: 2,
    display: { xs: 'none', md: 'flex' },
  },
  boxTabs: {
    flexGrow: 1,
    mr: 2,
    display: { xs: 'none', md: 'flex' },
  },
  boxNotification: {
    mr: 2,
  },
  boxNotifMessage: {
    width: 450,
  },
  badge: {
    '.MuiBadge-badge': {
      right: 0,
      top: 4,
      border: '3px solid',
      borderColor: 'base.main',
      padding: '0 2px',
      borderRadius: '50%',
      backgroundColor: 'warning.dark',
      color: 'base.main',
    },
  },
  loadMoreButton: {
    alignSelf: 'center',
    marginTop: '24px',
    border: '1px solid #E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
};

export default styles;
