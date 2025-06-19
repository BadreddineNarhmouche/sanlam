import { INotificationService } from "@checkTracking/helpers";

import {
  NavigationBar,
  PermissionsGate,
  // ROLE,
  SCOPE,
} from "@checkTracking/shared";

import { Grid } from "@checkTracking/ui-kit";
import { injectIntl, useIntl } from "react-intl";
import { Outlet, useLocation } from "react-router-dom";
import { PAGES } from "../../config/navigation";

const AppLayout = () => {
  const intl = useIntl();
  const navItems = {
    applicationName: intl.formatMessage({ id: "applicationName" }),
    links: [
      {
        label: intl.formatMessage({ id: "nav_bar.home_tab" }),
        to: PAGES.HOME,
      },
       {
        label: intl.formatMessage({ id: "nav_bar.treatment_tab" }),
        to: PAGES.TREATMENT_CHECK,
      },
      {
        label: intl.formatMessage({ id: "nav_bar.help_tab" }),
        to: PAGES.HELP,
      },
    ],
  };


  // soit il vérifie le browser soit il vérifie le role de l'utilisateur;
  const showNavigationBar = ![ // headre
    PAGES.NOT_FOUND,
    PAGES.DETAILS_CHECK,
  ].includes(useLocation().pathname);

  const services: INotificationService = {};

  return (
    <>
      <PermissionsGate scopes={[SCOPE.CAN_VIEW_MENU]} delegatedNoAccessProps>
        <NavigationBar
          navItems={navItems}
          services={services}
          showNavigationBar={showNavigationBar}
        />
      </PermissionsGate>

      <Grid mt={5}>
        <Outlet />
      </Grid>
    </>
  );
};

export default injectIntl(AppLayout);
