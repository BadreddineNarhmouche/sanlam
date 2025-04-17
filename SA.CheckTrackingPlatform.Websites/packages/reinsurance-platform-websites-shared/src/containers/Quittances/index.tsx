import {
  FilterCriteriaQuittances,
  IQuittanceService,
  IQuittanceDetailsService,
  IDeliverySlipService,
  IDeliverySlipDetailsService,
  IPaymentService,
} from "@reinsurance/helpers";

import { InternalRoleCodeConstants } from "@reinsurance/helpers/lib/helpers/ConstantsHelper";
import { RenderByRoles } from "../RenderByRoles";
import { SubscriptionQuittances } from "./SubscriptionQuittances";
import { RecoveryQuittances } from "./RecoveryQuittances";
import { ReinsuranceListing } from "./ReinsuranceListing";
import { AccountingListing } from "./AccountingListing";
import { CardContainer, EmptyState } from "@reinsurance/ui-kit";
import { useIntl } from "react-intl";
import emptyStateDesk from "@reinsurance/ui-kit/src/assets/images/emptyStateDesk.svg";

export const Quittances = ({
  quittanceServices,
  quittanceDetailsServices,
  deliverySlipServices,
  deliverySlipDetailsServices,
  paymentServices,
  detailsPage,
  initialFilterValues,
}: {
  quittanceServices: IQuittanceService;
  quittanceDetailsServices: IQuittanceDetailsService;
  deliverySlipServices: IDeliverySlipService;
  deliverySlipDetailsServices: IDeliverySlipDetailsService;
  paymentServices: IPaymentService;
  detailsPage: string;
  initialFilterValues: FilterCriteriaQuittances;
}) => {
  const intl = useIntl();
  return (
    <RenderByRoles
      internalRoleCodes={[
        InternalRoleCodeConstants.accountingManager,
        InternalRoleCodeConstants.accountingExecutor,
      ]}
      fallback={
        <RenderByRoles
          internalRoleCodes={[
            InternalRoleCodeConstants.reinsurancesManager,
            InternalRoleCodeConstants.reinsurancesExecutor,
          ]}
          fallback={
            <RenderByRoles
              internalRoleCodes={[
                InternalRoleCodeConstants.recoveriesManager,
                InternalRoleCodeConstants.recoveriesExecutor,
              ]}
              fallback={
                <RenderByRoles
                  internalRoleCodes={[
                    InternalRoleCodeConstants.subscriptionsManager,
                    InternalRoleCodeConstants.subscriptionsExecutor,
                  ]}
                  fallback={
                    <CardContainer px={8} pt={8} pb={15.5}>
                      <EmptyState
                        title={intl.formatMessage({
                          id: "demands.empty.title",
                        })}
                        subTitle={""}
                        image={emptyStateDesk}
                      />
                    </CardContainer>
                  }
                >
                  <SubscriptionQuittances
                    services={quittanceServices}
                    detailsServices={quittanceDetailsServices}
                    detailsPage={detailsPage}
                    initialFilterValues={initialFilterValues}
                  />
                </RenderByRoles>
              }
            >
              <RecoveryQuittances
                services={quittanceServices}
                detailsServices={quittanceDetailsServices}
                detailsPage={detailsPage}
                initialFilterValues={initialFilterValues}
              />
            </RenderByRoles>
          }
        >
          <ReinsuranceListing
            quittanceServices={quittanceServices}
            quittanceDetailsServices={quittanceDetailsServices}
            deliverySlipServices={deliverySlipServices}
            deliverySlipDetailsServices={deliverySlipDetailsServices}
            detailsPage={detailsPage}
            initialFilterValues={initialFilterValues}
          />
        </RenderByRoles>
      }
    >
      <AccountingListing
        quittanceServices={quittanceServices}
        quittanceDetailsServices={quittanceDetailsServices}
        deliverySlipServices={deliverySlipServices}
        deliverySlipDetailsServices={deliverySlipDetailsServices}
        paymentServices={paymentServices}
        detailsPage={detailsPage}
        initialFilterValues={initialFilterValues}
      />
    </RenderByRoles>
  );
};
