import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import {
  IDetailsChecksService,
  DetailsCheck as DetailsDTO,
  TimelineItem,
} from "@checkTracking/helpers";

import {
  CardContainer,
  Grid,
  Skeleton,
  Typography,
  Box,
  Alert,
  Timeline,
} from "@checkTracking/ui-kit";
import Header from "./Header";
import OutlinedTimeline from "./OutlinedTimeline";

interface CheckDetailsProps {
  services: IDetailsChecksService;
  checkId: string;
}

export const CheckDetails: React.FC<CheckDetailsProps> = ({
  services,
  checkId,
}) => {
  const intl = useIntl();

  useEffect(() => {
    services.getCheckById?.(checkId);
  }, [checkId, services]);

  const {
    responseData: data,
    isLoading,
    error,
  } = useSelector((st: any) => st.getCheckById);

  const lastStatusLabel =
    data?.timelines && data.timelines.length > 0
      ? data.timelines[data.timelines.length - 1].statusItems.label
      : undefined;

  const labels: Record<Exclude<keyof DetailsDTO, "timelines">, string> = {
    // id: intl.formatMessage({ id: "File.global.dialog.title" }),
    amount: intl.formatMessage({ id: "quittance_details.policy_payment_info" }),
    // bankId: intl.formatMessage({ id: "N° banque" }),
    // branchId: intl.formatMessage({ id: "N° branche" }),
    // serviceId: intl.formatMessage({ id: "N° service" }),
    serviceName: intl.formatMessage({
      id: "quittance_details.policy_payment_net_premium",
    }),
    bankName: intl.formatMessage({
      id: "quittance_details.policy_payment_total_premium",
    }),
    branchName: intl.formatMessage({
      id: "quittance_details.policy_payment_accessory",
    }),
    // creationDate: intl.formatMessage({ id: "Date de création" }),
    // checkNumber: intl.formatMessage({ id: "N° chèque" }),
    // statusId: intl.formatMessage({ id: "N° status" }),
    lotNumber: intl.formatMessage({
      id: "quittance_details.policy_payment_commission",
    }),
    recipientName: intl.formatMessage({
      id: "quittance_details.policy_payment_date_of_receipt",
    }),
    beneficiaryName: intl.formatMessage({
      id: "quittance_details.policy_payment_status",
    }),
    sinisterNumber: intl.formatMessage({
      id: "deliverySlip_details.deliverySlip_info",
    }),
    accountNumber: intl.formatMessage({
      id: "deliverySlip_details.deliverySlip_reference",
    }),
    registerOrderNumber: intl.formatMessage({
      id: "payment_details.payment_info",
    }),
    transactionNumber: intl.formatMessage({
      id: "payment_details.payment_Number",
    }),
    // code: intl.formatMessage({ id: "Code" }),
    // label: intl.formatMessage({ id: "Label" }),
  };

  const timelineLabels: Record<keyof TimelineItem, string> = {
    id: intl.formatMessage({ id: "timeline.id" }),
    date: intl.formatMessage({ id: "timeline.date" }),
    statusItems: intl.formatMessage({ id: "timeline.statusItems" }),
  };

  const statusLabels: Record<keyof TimelineItem["statusItems"], string> = {
    id: intl.formatMessage({ id: "status.id" }),
    code: intl.formatMessage({ id: "status.code" }),
    label: intl.formatMessage({ id: "status.label" }),
  };

  const formatValue = (key: keyof DetailsDTO, obj: DetailsDTO) => {
    const raw = (obj as any)[key];
    if (raw == null || raw === "") return "—";
    if (key === "amount") {
      return (raw as number).toLocaleString(undefined, {
        minimumFractionDigits: 2,
      });
    }
    if (key === "creationDate") {
      return new Date(raw as string).toLocaleString();
    }
    return raw;
  };

  if (isLoading || !data) {
    return (
      <CardContainer px={8} pt={8} pb={15.5}>
        <Skeleton variant="text" width={200} height={40} sx={{ mb: 4 }} />
        <Grid container spacing={4}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid key={i} item xs={12} sm={6} md={4}>
              <Skeleton variant="text" width="80%" height={20} />
            </Grid>
          ))}
        </Grid>
      </CardContainer>
    );
  }

  return (
    <>
      <Header checkNumber={data.checkNumber} timelines={data.timelines} />
      <Grid container sx={{ height: "400", mt: "0.015cm" }}>
        {/* --- Colonne de gauche */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={4}>
            {(Object.keys(labels) as Array<keyof typeof labels>).map((key) => (
              <Grid key={key} item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="caption" color="text.secondary">
                  {labels[key]}
                </Typography>
                <Typography variant="body1">
                  {formatValue(key as keyof DetailsDTO, data)}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          container
          direction="column"
          justifyContent="flex-end"
          alignItems="flex-end"
          sx={{ height: "100%", pt: 5, pr: 2 }}
        >
          <OutlinedTimeline data={data} /> {/* inspetion API champs */}
          {/* revu de code à changer */}
        </Grid>
      </Grid>
      {/* Props Children */}
    </>
  );
};
