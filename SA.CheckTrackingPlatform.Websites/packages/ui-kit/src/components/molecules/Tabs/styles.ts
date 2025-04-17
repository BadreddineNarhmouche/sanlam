const styles = {
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: '100%',
    width: '100%',
    backgroundColor: 'primary.main',
  },
  '& .MuiButtonBase-root': {
    maxWidth: 'fit-content',
  },
  deleteIcon: {
    cursor: 'pointer',
    display: 'flex',
    marginLeft: '5px',
  },
  spanContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hiddenTab:{
    visibility: 'hidden',
  }
};

export default styles;
