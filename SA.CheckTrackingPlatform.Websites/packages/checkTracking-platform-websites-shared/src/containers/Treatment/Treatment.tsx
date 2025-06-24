import { Grid, TabPanels, Tabs } from "@checkTracking/ui-kit";
import { useEffect, useState } from "react";
import { FirstPage } from "./Tabs/FirstPage";
import { IChecksService, ITimeLineService } from "@checkTracking/helpers";
import { DialogConfirmation } from "../Dialogs/DialogConfirmation";
import { FilterFirstPageTreatment } from "@checkTracking/helpers/src/api/types/domain";
import { useSelector } from "react-redux";
import {
  CheckByAllStatusComponent,
  GetNextStatusComponent,
  TreatmentLabelComponent,
} from "../../utils/CheckHelpers";
import { ROLES } from "../../constants/global";
import { IReasonMoveService } from "@checkTracking/helpers";

export const Treatment = ({
  services,
  initialFilterValues,
  reasonMoveService,
  timeLineService,
}: {
  services: IChecksService;
  initialFilterValues: FilterFirstPageTreatment;
  reasonMoveService: IReasonMoveService;
  timeLineService: ITimeLineService;
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

  const handleSubmitData = (
    dataTable: any[],
    Select: any,
    Comment: any,
    status: any
  ) => {
    console.log(dataTable);
    console.log(Select);
    console.log(Comment);
    console.log(status);

    const checkIds: any[] = [];

    dataTable.map((item) => {
      checkIds.push(item.id);
    });

    const obj = {
      CheckIds: checkIds,
      Comment: Comment,
      ReasonMoveId: Select,
      Status: GetNextStatusComponent(status),
      StatusNow: status,
    };

    console.log(GetNextStatusComponent(status));
    console.log(obj);
    timeLineService.CreateTimeLine && timeLineService.CreateTimeLine(obj);
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
              reasonMoveService={reasonMoveService}
              handleSubmitData={(dataTable: any[], Select: any, Comment: any) =>
                handleSubmitData(
                  dataTable,
                  Select,
                  Comment,
                  CheckByAllStatusComponent(item.internalRoleCode)
                )
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
