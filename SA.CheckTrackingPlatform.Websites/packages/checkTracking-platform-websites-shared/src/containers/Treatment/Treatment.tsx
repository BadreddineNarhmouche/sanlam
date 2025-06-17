import { Grid, TabPanels, Tabs } from "@checkTracking/ui-kit";
import { useEffect, useState } from "react";
import { FirstPage } from "./Tabs/FirstPage";
import { IChecksService } from "@checkTracking/helpers";
import { DialogConfirmation } from "../Dialogs/DialogConfirmation";
import { FilterFirstPageTreatment } from "@checkTracking/helpers/src/api/types/domain";
import { useSelector } from "react-redux";
import {
  CheckByAllStatusComponent,
  TreatmentLabelComponent,
} from "../../utils/CheckHelpers";
import { ROLES } from "../../constants/global";

export const Treatment = ({
  services,
  initialFilterValues,
}: {
  services: IChecksService;
  initialFilterValues: FilterFirstPageTreatment;
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [newSelectedTab, setNewSelectedTab] = useState(0);
  const [openConfiramtionDialog, setOpenConfiramtionDialog] = useState(false);

  const { responseData: internalRoles } = useSelector(
    (state: any) => state.internalRoles
  );

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setNewSelectedTab(newValue);
    setOpenConfiramtionDialog(true);
  };

  const handleSubmitModal = () => {
    setSelectedTab(newSelectedTab);
    setOpenConfiramtionDialog(false);
    if (newSelectedTab === 0) {
      // navigate("/");
    }
  };

  const handleSubmitData = (Select: any, Comment: any) => {
    console.log(Select);
    console.log(Comment);
  };

  const [PANELS, setPANELS] = useState<any[]>([]);
  const [TABS, setTABS] = useState<any[]>([]);

  useEffect(() => {
    const newPanels: any[] = [];
    const newTabs: any[] = [];
    internalRoles?.map((item: any) => {
      if (ROLES.includes(item.internalRoleCode)) {
        newPanels.push({
          component: (
            <FirstPage
              services={services}
              initialFilterValues={initialFilterValues}
              status={CheckByAllStatusComponent(item.internalRoleCode)}
              handleSubmitData={(Select: any, Comment: any) =>
                handleSubmitData(Select, Comment)
              }
            />
          ),
        });
        newTabs.push({ label: TreatmentLabelComponent(item.internalRoleCode) });
      }
      return null;
    });
    setPANELS(newPanels.reverse());
    setTABS(newTabs.reverse());
  }, [services, initialFilterValues, internalRoles]);

  return (
    <>
      <Grid container direction="column" px={8} py={7} id="check-table">
        <Grid display="flex" justifyContent="flex-start">
          <Grid item>
            <Tabs tabs={TABS} value={selectedTab} onChange={handleChangeTab} />
          </Grid>
          <Grid item sm>
            {" "}
          </Grid>
        </Grid>
        <Grid item>
          <TabPanels panels={PANELS} value={selectedTab} />
        </Grid>
      </Grid>

      <DialogConfirmation
        openConfiramtionDialog={openConfiramtionDialog}
        setOpenConfiramtionDialog={setOpenConfiramtionDialog}
        handleSubmit={handleSubmitModal}
        isLoading={false}
        error={false}
        responseData={[]}
      />
    </>
  );
};
