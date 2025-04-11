const titleContainer = {
  display: 'flex',
  alignItems: 'center',
};

const customNumberField = (error?: boolean) => {
  return {
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input[type="number"]': {
      '-moz-appearance': 'textfield',
    },
    '& .MuiInput-underline:before': {
      borderColor: error ? 'error.main' : 'primary.main',
    },
    '& .MuiInput-underline:after': {
      borderColor: error ? 'error.main' : 'primary.main',
    },
  };
};

const customAvatar = {
  bgcolor: 'primary.light',
  width: '48px',
  height: '48px',
};

const customIcon = {
  color: 'primary.main',
};

const customText = (theme: any, error?: boolean) => {
  const style: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 500,
    color: error ? theme.palette.error.main : theme.palette.primary.main,
  };
  return style;
};

const helperTextStyle = {
  margin: '0',
  width: '100%',
};

export {
  titleContainer,
  customNumberField,
  customAvatar,
  customText,
  helperTextStyle,
  customIcon,
};
