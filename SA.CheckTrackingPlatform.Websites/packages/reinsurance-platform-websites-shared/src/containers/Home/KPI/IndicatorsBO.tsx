import { InternalRoleCodeConstants } from "@reinsurance/helpers/lib/helpers/ConstantsHelper";
import { RenderByRoles } from "../../RenderByRoles";
import { AccountingIndicatorsBO } from "./AccountingIndicatorsBO";
import { RecoveryIndicatorsBO } from "./RecoveryIndicatorsBO";
import { ReinsuranceIndicatorsBO } from "./ReinsuranceIndicatorsBO";
import { SubscriptionIndicatorsBO } from "./SubscriptionIndicatorsBO";
import { IQuittanceService, IKPIsService } from "@reinsurance/helpers";

export const IndicatorsBO = ({
  quittanceServices,
  KPIsService,
}: {
  quittanceServices: IQuittanceService;
  KPIsService: IKPIsService;
}) => {
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
                >
                  <SubscriptionIndicatorsBO
                    quittanceServices={quittanceServices}
                    KPIsService={KPIsService}
                  />
                </RenderByRoles>
              }
            >
              <RecoveryIndicatorsBO
                quittanceServices={quittanceServices}
                KPIsService={KPIsService}
              />
            </RenderByRoles>
          }
        >
          <ReinsuranceIndicatorsBO quittanceServices={quittanceServices} />
        </RenderByRoles>
      }
    >
      <AccountingIndicatorsBO quittanceServices={quittanceServices} />
    </RenderByRoles>
  );
};
