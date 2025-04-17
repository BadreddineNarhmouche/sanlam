import React, { useCallback, useState } from "react";
import { injectIntl } from "react-intl";
import SideBarDrawer from "./SideBarDrawer";
import SidebarActionButtons from "./SidebarActionButtons";
import { sideBarContentContainer } from "./styles";
import QuittanceDocuments from "./Components/QuittanceDocuments";
const INITIAL_SIDE_BARS = {
  documents: false,
};
interface Props {
  id: string;
  services: any;
  servicesDeliverySlip?: any;
  servicesPayments?: any;
  intl: any;
  setDialogOpen: any;
  setPDFViewer: any;
  displayUpload: boolean;
}
const SideBar = ({
  id,
  services,
  servicesDeliverySlip,
  servicesPayments,
  setDialogOpen,
  setPDFViewer,
  displayUpload,
}: Props) => {
  const [sideBars, setSideBars] = useState(INITIAL_SIDE_BARS);

  const toggleSideBar = useCallback(
    (sideBarName?: string) => {
      // Make sure that the sidebar name is valid
      // eslint-disable-next-line no-prototype-builtins
      if (sideBarName && sideBars.hasOwnProperty(sideBarName)) {
        setSideBars((prev) => {
          const isAnySideBarOpen = Object.values(prev).some((value) => value);

          if (isAnySideBarOpen) {
            return {
              ...INITIAL_SIDE_BARS,
              [sideBarName]: true,
            };
          } else {
            // If no sidebar is open, toggle as usual
            // @ts-ignore
            return { ...prev, [sideBarName]: !prev[sideBarName] };
          }
        });
      } else {
        setSideBars(INITIAL_SIDE_BARS);
      }
    },
    [sideBars]
  );

  const activeTab = Object.entries(sideBars).find(
    ([key, value]) => value === true
  )?.[0];

  return (
    <>
      <SidebarActionButtons
        toggleSideBar={toggleSideBar}
        isOpen={Object.values(sideBars).some(Boolean)}
        activeTab={activeTab}
      />

      <React.Fragment key={"right"}>
        {
          <>
            {sideBars.documents && (
              <SideBarDrawer
                isOpen={sideBars.documents}
                onClose={(sideBarName: string) => toggleSideBar(sideBarName)}
                contentStyle={sideBarContentContainer}
                body={
                  <QuittanceDocuments
                    quittanceId={id}
                    services={services}
                    servicesDeliverySlip={servicesDeliverySlip}
                    servicesPayments={servicesPayments}
                    toggleSideBar={toggleSideBar}
                    setDialogOpen={setDialogOpen}
                    setPDFViewer={setPDFViewer}
                    displayUpload={displayUpload}
                  />
                }
                activeTab={activeTab}
              />
            )}
          </>
        }
      </React.Fragment>
    </>
  );
};

export default injectIntl(SideBar);
