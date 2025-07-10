import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import {
    IDetailsChecksService,
    DetailsCheck as DetailsDTO,
} from "@checkTracking/helpers";

import {
    CardContainer,
    Grid,
    Skeleton,
    Typography,
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

    const {
        responseData: data,
        isLoading,
        error,
    } = useSelector((st: any) => st.getCheckById);


    const labels: Record<Exclude<keyof DetailsDTO, "timelines">, string> = {
        amount: intl.formatMessage({ id: "quittance_details.policy_payment_info" }),
        serviceName: intl.formatMessage({
            id: "quittance_details.policy_payment_net_premium",
        }),
        bankName: intl.formatMessage({
            id: "quittance_details.policy_payment_total_premium",
        }),
        branchName: intl.formatMessage({
            id: "quittance_details.policy_payment_accessory",
        }),
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
                    <OutlinedTimeline data={data} />
                </Grid>
            </Grid>
        </>
    );
};
