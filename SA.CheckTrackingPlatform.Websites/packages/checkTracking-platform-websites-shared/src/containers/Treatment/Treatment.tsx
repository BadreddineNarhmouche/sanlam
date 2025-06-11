import { Grid, TabPanels, Tabs } from "@checkTracking/ui-kit";
import { useState } from "react";
import { useIntl } from "react-intl";
import { FirstPage } from "./Tabs/FirstPage";
import { IChecksService } from "@checkTracking/helpers";
import { DialogConfirmation } from "../Dialogs/DialogConfirmation";
import { FilterFirstPageTreatment } from "@checkTracking/helpers/src/api/types/domain";

export const Treatment = ({
  services,
  initialFilterValues,
}: {
  services: IChecksService;
  initialFilterValues: FilterFirstPageTreatment;
}) => {
  const intl = useIntl();
  const [selectedTab, setSelectedTab] = useState(0);
  const [newSelectedTab, setNewSelectedTab] = useState(0);
  const [openConfiramtionDialog, setOpenConfiramtionDialog] = useState(false);

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

  const PANELS = [
    {
      component: (
        <FirstPage
          services={services}
          initialFilterValues={initialFilterValues}
          status="REM"
        />
      ),
    },
    {
      component: (
        <FirstPage
          services={services}
          initialFilterValues={initialFilterValues}
          status="EB"
        />
      ),
    },
    {
      component: (
        <FirstPage
          services={services}
          initialFilterValues={initialFilterValues}
          status="RB"
        />
      ),
    },
    {
      component: (
        <FirstPage
          services={services}
          initialFilterValues={initialFilterValues}
          status="EC"
        />
      ),
    },
    {
      component: (
        <FirstPage
          services={services}
          initialFilterValues={initialFilterValues}
          status="RC"
        />
      ),
    },
    {
      component: (
        <FirstPage
          services={services}
          initialFilterValues={initialFilterValues}
          status="RM"
        />
      ),
    },
    {
      component: (
        <FirstPage
          services={services}
          initialFilterValues={initialFilterValues}
          status="RCR"
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

  return (
    <>
      <Grid container direction="column" px={8} py={7} id="check-table">
        Traitement
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
