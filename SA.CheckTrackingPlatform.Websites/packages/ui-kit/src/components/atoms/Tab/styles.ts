const styles = (theme: any) => ({
  flexDirection: 'row',
  alignItems: 'center',
  fontSize: 14,
  lineHeight: 1.4,
  color: 'base.greyMain',
  textTransform: 'none',
  fontWeight: 'subtitle.fontWeight',
  height: '70px',
  '&.Mui-selected': {
    color: 'primary.main',
    textTransform: 'none',
    fontWeight: 'subtitle1.fontWeight',
  },
  'svg.MuiSvgIcon-root': {
    marginBottom: '0px',
    marginRight: '5px',
  },
});

export default styles;
