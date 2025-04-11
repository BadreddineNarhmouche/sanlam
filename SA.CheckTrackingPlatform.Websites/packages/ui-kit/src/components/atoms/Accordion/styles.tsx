const accordionStyle = {
  boxShadow: 'none',
  borderRadius: '10px !important',
};

const accordionSummaryStyle = {
  borderRadius: '8px 8px 0px 0px',
  border: '1px solid #EBEEF1',
  px: '32px',
  py: '24px',
  m: 0,
  '& 	.MuiAccordionSummary-content': {
    m: 0,
  },
  '& 	.MuiAccordionSummary-content.Mui-expanded': {
    m: 0,
  },
};

const accordionDetailStyle = {
  borderRadius: '0px 0px 8px 8px',
  p: '24px 32px',
  border: '1px solid #EBEEF1',
  borderTop: 'none',
};

const typographyStyle = {
  fontSize: '24px',
  fontWeight: 'fontWeightLight',
  lineHeight: 'caption.lineHeight',
  letterSpacing: 'caption.letterSpacing',
};

export {
  accordionStyle,
  accordionSummaryStyle,
  accordionDetailStyle,
  typographyStyle,
};
