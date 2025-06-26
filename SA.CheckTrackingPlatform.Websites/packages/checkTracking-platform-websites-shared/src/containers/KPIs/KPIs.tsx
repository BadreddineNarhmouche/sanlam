import {
  Alert,
  CardContainer,
  Grid,
  Theme,
  Typography,
} from "@checkTracking/ui-kit";
import { useIntl } from "react-intl";
import { GenericKPI } from "./GenericKPI";
import { RenderByRoles } from "../RenderByRoles";
import { IChecksService, IKPIService } from "@checkTracking/helpers";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const KPIs = ({
  CheckServices,
  KPIService,
}: {
  CheckServices: IChecksService;
  KPIService: IKPIService;
}) => {
  const intl = useIntl();

  useEffect(() => {
    KPIService.GetKPIs();
  }, []);

  const { responseData } = useSelector((state: any) => state.CheckTrackingKPI);

  const {
    numberOfChecksIssuedButNotAcknowledgedByTheBusinessUnit = 0,
    numberOfChecksReceivedByBusinessUnitButNotByRegistryOffice = 0,
    numberOfChecksReceivedByRegistryOfficeButNotSentToClient = 0,
    numberOfReturnedChecksNotYetReceived = 0,
  } = responseData || {};

  return (
    <Grid container direction="row" spacing={2} xl={12}>
      {" "}
      <RenderByRoles
        internalRoleCodes={["BoIn"]}
        fallback={
          <>
            {" "}
            {numberOfChecksReceivedByBusinessUnitButNotByRegistryOffice !==
              0 && (
              <Grid item xs={3}>
                <GenericKPI
                  component={{
                    title: "check.kpi.receivedBUNotRegistry",
                    contents: [
                      {
                        code: "2",
                        count:
                          numberOfChecksReceivedByBusinessUnitButNotByRegistryOffice,
                        countColor: "red",
                        description: "Télécharger",
                        onClick() {},
                        isHideButton: true,
                      },
                    ],
                  }}
                />
              </Grid>
            )}{" "}
            {numberOfChecksReceivedByRegistryOfficeButNotSentToClient !== 0 && (
              <Grid item xs={3}>
                <GenericKPI
                  component={{
                    title: "check.kpi.receivedRegistryNotClient",
                    contents: [
                      {
                        code: "3",
                        count:
                          numberOfChecksReceivedByRegistryOfficeButNotSentToClient,
                        countColor: "red",
                        description: "Télécharger",
                        onClick() {},
                        isHideButton: true,
                      },
                    ],
                  }}
                />
              </Grid>
            )}
          </>
        }
      >
        <>
          {numberOfChecksIssuedButNotAcknowledgedByTheBusinessUnit !== 0 && (
            <Grid item xs={3}>
              <GenericKPI
                component={{
                  title: "check.kpi.issuedNotAcknowledged",
                  contents: [
                    {
                      code: "1",
                      count:
                        numberOfChecksIssuedButNotAcknowledgedByTheBusinessUnit,
                      countColor: "red",
                      description: "Télécharger",
                      onClick() {},
                      isHideButton: true,
                    },
                  ],
                }}
              />
            </Grid>
          )}{" "}
          {numberOfReturnedChecksNotYetReceived !== 0 && (
            <Grid item xs={3}>
              <GenericKPI
                component={{
                  title: "check.kpi.returnedNotYetReceived",
                  contents: [
                    {
                      code: "4",
                      count: numberOfReturnedChecksNotYetReceived,
                      countColor: "red",
                      description: "Télécharger",
                      onClick() {},
                      isHideButton: true,
                    },
                  ],
                }}
              />
            </Grid>
          )}
        </>
      </RenderByRoles>
    </Grid>
  );
};
