import { Grid, TabPanels, Tabs } from "@checkTracking/ui-kit";
import { useState } from "react";
import { useIntl } from "react-intl";
import { FirstPage } from "./Tabs/FirstPage";
import { OtherPage } from "./Tabs/OtherPage";
import { FilterCriteriaChecks } from "@checkTracking/helpers";

export const Treatment = ({
  initialFilterValues,
}: {
  initialFilterValues: FilterCriteriaChecks;
}) => {
  const intl = useIntl();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    if (newValue === 0) {
      // navigate("/");
    }
  };

  const PANELS = [
    {
      component: <FirstPage initialFilterValues={initialFilterValues} />,
    },
    {
      component: <OtherPage />,
    },
  ];

  const TABS = [{ label: "test" }, { label: "test1" }];

  return (
    <>
      <Grid container direction="column" px={8} py={7} id="quittance-table">
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
    </>
  );
};
