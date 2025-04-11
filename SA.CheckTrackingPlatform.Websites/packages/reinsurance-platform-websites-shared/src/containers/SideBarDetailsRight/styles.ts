import { UI_Typography } from "@reinsurance/ui-kit";

const sideBarContainer = (open: boolean) => ({
  width: "64px",
  flexShrink: 0,
  overflow: "auto",
  backgroundColor: "white",
  borderLeft: "1px solid #EBEEF1",
  height: "100%",
  ...(!open && {
    zIndex: 1000,
    position: "fixed",
    right: 0,
  }),
  ...(open && {
    borderRight: "1px solid #EBEEF1",
  }),
});

const sideBarContentContainer = {
  width: 750,
  backgroundColor: "#F3F5F7",
  height: "100%",
};

const sideBarButton = (isActiveTab: boolean) => ({
  width: "100%",
  marginBottom: "10px",
  borderRadius: "unset",
  ...(isActiveTab && {
    backgroundColor: "#E6F1FA",
  }),
});

const sideBarButtonContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const sideBarHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "white",
  borderBottom: "1px solid #EBEEF1",
};

const timelineContainer = {
  // height: 'calc(100vh - 57px)',
  // overflow: 'scroll',
};

const historyTimeLineContentContainer = {
  backgroundColor: "white",
  border: "1px solid #EBEEF1",
  borderRadius: "8px",
};

const DynamicDataContainer = {
  backgroundColor: "white",
  border: "1px solid #D9D9D9",
  borderRadius: "8px",
  px: 3,
  py: 2,
  m: 3,
};

const DynamicDataContainerHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const DynamicDataContainerHeaderTitle = {
  fontWeight: UI_Typography.FONT_WEIGHT_MEDIUM,
};

const DynamicDataContainerHeaderIcon = { color: "primary.main" };

const DynamicDataContainerContentHeader = {
  display: "flex",
  flexDirection: "column",
};

const DynamicDataContainerContentTitle = {
  fontWeight: UI_Typography.FONT_WEIGHT_NORMAL,
  color: "#717983",
  marginBottom: "8px",
};

const loadMoreContainer = {
  paddingLeft: "24px",
  paddingRight: "24px",
};

const loadMoreButton = {
  alignSelf: "center",
  marginBottom: "24px",
  border: "1px solid #E0E0E0",
  borderRadius: 8,
  backgroundColor: "#FFFFFF",
  width: "100%",
};

const sectionStyle = {
  backgroundColor: "#FFFFFF",
};

const contentStyle = {
  border: "1px solid #EBEEF1",
  borderRadius: "8px",
};

export {
  DynamicDataContainer,
  DynamicDataContainerContentHeader,
  DynamicDataContainerContentTitle,
  DynamicDataContainerHeader,
  DynamicDataContainerHeaderIcon,
  DynamicDataContainerHeaderTitle,
  contentStyle,
  historyTimeLineContentContainer,
  loadMoreButton,
  loadMoreContainer,
  sectionStyle,
  sideBarButton,
  sideBarContainer,
  sideBarContentContainer,
  sideBarHeader,
  timelineContainer,
  sideBarButtonContainer,
};
