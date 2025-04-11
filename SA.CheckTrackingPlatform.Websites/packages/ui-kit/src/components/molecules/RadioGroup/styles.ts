const communStyle = (theme?: any, error?: boolean, fullwidth?: boolean) => {
  const style: React.CSSProperties = {
    padding: '16px 24px',
    gap: '10px',
    height: '56px',
    borderRadius: '4px',
    width: 'auto',
    cursor: 'pointer',
    flexGrow: 0,
    flex: 'none',
    marginRight: '8px',
  };

  if (error) {
    style.borderColor = 'error.main';
  }

  if (fullwidth) {
    style.marginRight = '0px';
  }

  return style;
};

const boxStyle = {
  border: '1px solid',
  borderColor: 'grey.300',
};

const selectedBoxStyle = {
  backgroundColor: 'primary.100',
  border: '1px solid',
  borderColor: 'primary.main',
};

const typographyStyle = (theme?: any, error?: boolean) => {
  const style: React.CSSProperties = {
    fontSize: '16px',
    lineHeight: '24px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: '-0.25px',
    flex: 'none',
    order: 0,
    flexGrow: 0,
    color: 'base.greyDark',
    justifyContent: 'center',
  };

  if (error) {
    style.color = 'error.main';
  }

  return style;
};

const typoSelectedStyle = {
  color: 'primary.main',
  fontWeight: 'h6.fontWeight',
};

const containerStyle = (theme?: any, fullwidth?: boolean) => {
  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '8px',
  };

  if (fullwidth) {
    style.justifyContent = 'space-between';
  }

  return style;
};

const titleContainer = {
  display: 'flex',
  alignItems: 'center',
};

const helperTextStyle = {
  margin: '3px 14px 0 14px',
  width: '100%',
};

export {
  boxStyle,
  selectedBoxStyle,
  communStyle,
  typographyStyle,
  typoSelectedStyle,
  containerStyle,
  titleContainer,
  helperTextStyle,
};
