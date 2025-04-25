import { Box, SwipeableDrawer } from "@checkTracking/ui-kit";
import React from "react";
import SidebarActionButtons from "./SidebarActionButtons";

interface SideBarDrawerProps {
  isOpen: boolean;
  onClose: (sideBarName: string) => void;
  contentStyle: any; // Replace `any` with the appropriate type for your styles
  header?: JSX.Element;
  body: JSX.Element;
  activeTab?: string;
}

const SideBarDrawer: React.FC<SideBarDrawerProps> = ({
  isOpen,
  onClose,
  contentStyle,
  header,
  body,
  activeTab,
}) => {
  return (
    <SwipeableDrawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      onOpen={() => {}}
    >
      <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
        <SidebarActionButtons
          toggleSideBar={onClose}
          isOpen={isOpen}
          activeTab={activeTab}
        />
        <Box sx={contentStyle} role="presentation">
          {header}
          {body}
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default SideBarDrawer;
