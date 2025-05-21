import { INotificationService } from "@checkTracking/helpers";

import {
  NavigationBar,
  PermissionsGate,
  // ROLE,
  SCOPE,
} from "@checkTracking/shared";

import { Grid } from "@checkTracking/ui-kit";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { injectIntl, useIntl } from "react-intl";
import { Outlet, useLocation } from "react-router-dom";
import { PAGES } from "../../config/navigation";

const AppLayout = () => {
  const intl = useIntl();
  // const dispatch = useDispatch();
  const navItems = {
    applicationName: intl.formatMessage({ id: "applicationName" }),
    links: [
      {
        label: intl.formatMessage({ id: "nav_bar.home_tab" }),
        to: PAGES.HOME,
        // roles: [
        //   ROLE.SUBSCRIPTIONS_EXECUTOR,
        //   ROLE.SUBSCRIPTIONS_MANAGER,
        //   ROLE.RECOVERIES_EXECUTOR,
        //   ROLE.RECOVERIES_MANAGER,
        //   ROLE.checkTrackingS_EXECUTOR,
        //   ROLE.checkTrackingS_MANAGER,
        //   ROLE.ACCOUNTING_EXECUTOR,
        //   ROLE.ACCOUNTING_MANAGER,
        // ],
      },
       {
        label: intl.formatMessage({ id: "nav_bar.treatment_tab" }),
        to: PAGES.TREATMENT_CHECK,
        // roles: [
        //   ROLE.SUBSCRIPTIONS_EXECUTOR,
        //   ROLE.SUBSCRIPTIONS_MANAGER,
        //   ROLE.RECOVERIES_EXECUTOR,
        //   ROLE.RECOVERIES_MANAGER,
        //   ROLE.checkTrackingS_EXECUTOR,
        //   ROLE.checkTrackingS_MANAGER,
        //   ROLE.ACCOUNTING_EXECUTOR,
        //   ROLE.ACCOUNTING_MANAGER,
        // ],
      },
      {
        label: intl.formatMessage({ id: "nav_bar.help_tab" }),
        to: PAGES.HELP,
      },
    ],
  };

  const showNavigationBar = ![
    PAGES.NOT_FOUND,
    PAGES.DETAILS_CHECK,
  ].includes(useLocation().pathname);

  const services: INotificationService = {};

  // const location = useLocation();

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
