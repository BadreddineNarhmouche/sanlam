import { Grid, TabPanels, Tabs } from "@checkTracking/ui-kit";
import { useEffect, useState } from "react";
import { FirstPage } from "./Tabs/FirstPage";
import { DialogConfirmation } from "../Dialogs/DialogConfirmation";
import { FilterFirstPageTreatment } from "@checkTracking/helpers/src/api/types/domain";
import { IChecksService } from "@checkTracking/helpers";
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

  const goToNextTab = () => {
    const nextTab = selectedTab + 1;
    if (nextTab < PANELS.length) {
      setSelectedTab(nextTab);
    } else {
      console.warn("Dernier onglet atteint.");
    }
  };

  const handleSubmitModal = () => {
    setSelectedTab(newSelectedTab);
    setOpenConfiramtionDialog(false);
  };

  const PANELS = [
    {
      component: (
        <FirstPage
          services={services}
          initialFilterValues={initialFilterValues}
          status="REM"
          reasonmove={["CHT", "CER"]}
          goToNextTab={goToNextTab}
        />
      ),
    },
    {
      component: (
        <FirstPage
          services={services}
          initialFilterValues={initialFilterValues}
          status="REM"
          reasonmove={["CHT", "CER"]}
          goToNextTab={goToNextTab}
        />
      ),
    },
    {
      component: (
        <FirstPage
          services={services}
          initialFilterValues={initialFilterValues}
          status="RB"
          reasonmove={["CHT", "CER", "IMPL", "RDM", "CTRL", "EXTRN", "PRSQ"]}
          goToNextTab={goToNextTab}
        />
      ),
    },
    {
      component: (
        <FirstPage
          services={services}
          initialFilterValues={initialFilterValues}
          status="EC"
          reasonmove={["CHT", "CER", "IMPL", "RDM", "CTRL", "EXTRN", "PRSQ"]}
          goToNextTab={goToNextTab}
        />
      ),
    },
    {
      component: (
        <FirstPage
          services={services}
          initialFilterValues={initialFilterValues}
          status="RC"
          reasonmove={["CHT", "CER", "IMPL", "RDM", "CTRL", "EXTRN", "PRSQ"]}
          goToNextTab={goToNextTab}
        />
      ),
    },
    {
      component: (
        <FirstPage
          services={services}
          initialFilterValues={initialFilterValues}
          status="RM"
          reasonmove={["CHT", "CER", "IMPL", "RDM", "CTRL", "EXTRN", "PRSQ"]}
          goToNextTab={goToNextTab}
        />
      ),
    },
    {
      component: (
        <FirstPage
          services={services}
          initialFilterValues={initialFilterValues}
          status="RCR"
          reasonmove={["CHT", "CER", "IMPL", "RDM", "CTRL", "EXTRN", "PRSQ"]}
          goToNextTab={goToNextTab}
        />
      ),
    },
  ];

  const TABS = [
    { label: "Reçu métier" },
    { label: "Envoi BO" },
    { label: "Reçu BO" },
    { label: "Envoi client" },
    { label: "Retour Client" },
    { label: "Retour métier" },
    { label: "Réception chèque retourné" },
  ];
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
          <Grid item sm />
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
