import {
  FilterCriteriaQuittances,
  IQuittanceService,
  IQuittanceDetailsService,
  IDeliverySlipService,
  IDeliverySlipDetailsService,
  IPaymentService,
  IKPIsService,
} from "@checkTracking/helpers";
import { Grid, CardContainer, EmptyState } from "@checkTracking/ui-kit";
import { IndicatorsBO } from "../Home/KPI/IndicatorsBO";
import { Quittances } from "../Quittances";
import { RenderByRoles } from "../RenderByRoles";
import { InternalRoleCodeConstants } from "@checkTracking/helpers/lib/helpers/ConstantsHelper";
import { Navigate } from "react-router-dom";
import emptyStateDesk from "@checkTracking/ui-kit/src/assets/images/emptyStateDesk.svg";
import { useIntl } from "react-intl";

export const HomePages = ({
  quittanceServices,
  quittanceDetailsServices,
  deliverySlipServices,
  deliverySlipDetailsServices,
  paymentServices,
  KPIsService,
  detailsPage,
  demandsProducerLink,
  initialFilterValues,
}: {
  quittanceServices: IQuittanceService;
  quittanceDetailsServices: IQuittanceDetailsService;
  deliverySlipServices: IDeliverySlipService;
  deliverySlipDetailsServices: IDeliverySlipDetailsService;
  paymentServices: IPaymentService;
  KPIsService: IKPIsService;
  detailsPage: string;
  demandsProducerLink: string;
  initialFilterValues: FilterCriteriaQuittances;
}) => {
  const intl = useIntl();
  return (
    <>
      <RenderByRoles
        internalRoleCodes={[
          InternalRoleCodeConstants.accountingManager,
          InternalRoleCodeConstants.accountingExecutor,
          InternalRoleCodeConstants.reinsurancesManager,
          InternalRoleCodeConstants.reinsurancesExecutor,
          InternalRoleCodeConstants.recoveriesManager,
          InternalRoleCodeConstants.recoveriesExecutor,
          InternalRoleCodeConstants.subscriptionsManager,
          InternalRoleCodeConstants.subscriptionsExecutor,
        ]}
        fallback={
          <RenderByRoles
            internalRoleCodes={[InternalRoleCodeConstants.demandePage]}
            fallback={
              <>
                <CardContainer px={8} pt={8} pb={15.5}>
                  <EmptyState
                    title={intl.formatMessage({ id: "demands.empty.title" })}
                    subTitle={""}
                    image={emptyStateDesk}
                  />
                </CardContainer>
              </>
            }
          >
            <Grid container>
              <Navigate to={demandsProducerLink} replace />
            </Grid>
          </RenderByRoles>
        }
      >
        <Grid container>
          <IndicatorsBO quittanceServices={quittanceServices} KPIsService={KPIsService} />
          <Quittances
            quittanceServices={quittanceServices}
            quittanceDetailsServices={quittanceDetailsServices}
            deliverySlipServices={deliverySlipServices}
            deliverySlipDetailsServices={deliverySlipDetailsServices}
            paymentServices={paymentServices}
            detailsPage={detailsPage}
            initialFilterValues={initialFilterValues}
          />
        </Grid>
      </RenderByRoles>
    </>
  );
};
