import {
  FilterCriteriaQuittances,
  IQuittanceService,
  IQuittanceDetailsService,
} from "@checkTracking/helpers";

import { InternalRoleCodeConstants } from "@checkTracking/helpers/lib/helpers/ConstantsHelper";
import { RenderByRoles } from "../RenderByRoles";
import { DemandePage } from "./DemandePage";
import { CardContainer, EmptyState } from "@checkTracking/ui-kit";
import emptyStateDesk from "@checkTracking/ui-kit/src/assets/images/emptyStateDesk.svg";
import { useIntl } from "react-intl";
export const Demande = ({
  quittanceServices,
  quittanceDetailsServices,
  detailsPage,
  initialFilterValues,
  goBackPage,
}: {
  quittanceServices: IQuittanceService;
  quittanceDetailsServices?: IQuittanceDetailsService;
  detailsPage: string;
  initialFilterValues: FilterCriteriaQuittances;
  goBackPage?: string;
}) => {
  const intl = useIntl();
  return (
    <RenderByRoles
      internalRoleCodes={[InternalRoleCodeConstants.demandePage]}
      fallback={
        <CardContainer px={8} pt={8} pb={15.5}>
          <EmptyState
            title={intl.formatMessage({ id: "demands.empty.title" })}
            subTitle={""}
            image={emptyStateDesk}
          />
        </CardContainer>
      }
    >
      <DemandePage
        services={quittanceServices}
        detailsPage={detailsPage}
        initialFilterValues={initialFilterValues}
        goBackPage={goBackPage}
      />
    </RenderByRoles>
  );
};
