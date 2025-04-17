const renderBorderColor = (severity: string) => {
  switch (severity) {
    case 'success':
      return 'success.main';
    case 'warning':
      return 'warning.main';
    case 'error':
      return 'error.main';
    default:
      return 'primary.main';
  }
};

const renderBackgroundColor = (severity: string) => {
  switch (severity) {
    case 'success':
      return 'success.light';
    case 'warning':
      return 'warning.light';
    case 'error':
      return 'error.light';
    default:
      return 'primary.light';
  }
};

const renderColor = (severity: string) => {
  switch (severity) {
    case 'success':
      return 'success.main';
    case 'warning':
      return 'warning.main';
    case 'error':
      return 'error.main';
    default:
      return 'primary.main';
  }
};

const boxStyle = (severity: string) => ({
  backgroundColor: renderBackgroundColor(severity),
  color: renderColor(severity),
  borderLeft: '4px solid',
  borderColor: renderBorderColor(severity),
});

const basicStyle = {
  backgroundColor: 'transparent',
  padding: 0,
  border: 'none',
  color: 'black',
};

export { boxStyle, basicStyle };
