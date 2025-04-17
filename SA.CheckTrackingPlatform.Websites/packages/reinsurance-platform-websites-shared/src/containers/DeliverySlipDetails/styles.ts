import { UI_Typography } from '@reinsurance/ui-kit';

const container = {
  border: '1px solid #EBEEF1',
  borderRadius: 4,
};

const headerStyle = {
  zIndex: 300,
  position: 'fixed',
  borderBottom: '1px solid',
  borderBottomColor: 'base.light',
  backgroundColor: 'base.main',
};

const contentStyle = {
  backgroundColor: 'base.main',
  width: '100%',
  minHeight: '100vh',
  paddingBottom: 5,
};

const title = {
  fontWeight: UI_Typography.FONT_WEIGHT_LIGHT,
  lineHeight: '24px',
};

const tabsContainer = {
  borderBottom: '1px solid #D5DAE1',
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
  backgroundColor: 'white',
  position: 'sticky',
  top: '125px',
  zIndex: 100,
};

const infoStyle = {
  fontWeight: UI_Typography.FONT_WEIGHT_MEDIUM,
};

const headerInfoStyle = {
  fontWeight: UI_Typography.FONT_WEIGHT_NORMAL,
  color: 'base.greyMain',
};

const iconSubBranchStyle = {
  backgroundColor: '#D4ECFF',
  borderRadius: '90%',
  width: '40px',
  height: '40px',
};

const sectionTitle = {
  fontWeight: UI_Typography.FONT_WEIGHT_MEDIUM,
  lineHeight: '24px',
};

const sectionContainer = {
  border: '1px solid #EBEEF1',
  borderRadius: '8px',
};

export {
  container,
  contentStyle,
  headerInfoStyle,
  headerStyle,
  iconSubBranchStyle,
  infoStyle,
  sectionContainer,
  sectionTitle,
  tabsContainer,
  title,
};
