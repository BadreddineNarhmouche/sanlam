import { Chip } from '@reinsurance/ui-kit';
import {
    QUITTANCE_STATUS_CODES,
    QUITTANCE_PAYMENT_STATUS_CODES,
} from '../constants/global';

const ColorCodes = {
    greenLight: '#E3FAF6',
    greenDark: '#76C2B6',
    yellowLight: '#FEF1D1',
    yellowDark: '#FCB718',
    redLight: '#F6CCD1',
    redDark: '#F44336',
    blueLight: '#E3F6FF',
    blueDark: '#0081C6',
    greyLight: '#CACACA',
    greyDark: '#6E6E6E'
};

export const quittanceStatusComponent = (
    quittanceStatusCode: string,
    quittanceStatusLabel: string,
) => {

    switch (quittanceStatusCode) {
        case QUITTANCE_STATUS_CODES.DRAFT:
        case QUITTANCE_STATUS_CODES.TO_DO_SUBSCRIPTION:
        case QUITTANCE_STATUS_CODES.TO_DO_RECOVERY:
        case QUITTANCE_STATUS_CODES.TO_DO_REINSURANCE:
        case QUITTANCE_STATUS_CODES.TO_DO_ACCOUNTING:
            return (
                <Chip
                    label={quittanceStatusLabel}
                    sx={{
                        border: 1,
                        borderColor: ColorCodes.yellowDark,
                        backgroundColor: ColorCodes.yellowLight,
                        color: "#012163",
                        fontSize: 12
                    }}
                />
            );
        case QUITTANCE_STATUS_CODES.IN_PROGRESS_SUBSCRIPTION:
        case QUITTANCE_STATUS_CODES.IN_PROGRESS_RECOVERY:
        case QUITTANCE_STATUS_CODES.IN_PROGRESS_REINSURANCE:
        case QUITTANCE_STATUS_CODES.IN_PROGRESS_ACCOUNTING:
            return (
                <Chip
                    label={quittanceStatusLabel}
                    sx={{
                        border: 1,
                        borderColor: ColorCodes.blueDark,
                        backgroundColor: ColorCodes.blueLight,
                        color: "#012163",
                        fontSize: 12
                    }}
                />
            );
        case 'Done':
        case QUITTANCE_STATUS_CODES.END_MISSION:
            return (
                <Chip
                    label={quittanceStatusLabel}
                    sx={{
                        border: 1,
                        borderColor: ColorCodes.greenDark,
                        backgroundColor: ColorCodes.greenLight,
                        color: "#012163",
                        fontSize: 12
                    }}
                />
            );
        default:
            return <Chip label={quittanceStatusLabel} />;
    }
};

export const quittancePaymentStatusComponent = (
    quittancePaymentStatusCode: string,
    quittancePaymentStatusLabel: string,
) => {

    switch (quittancePaymentStatusCode) {
        case QUITTANCE_PAYMENT_STATUS_CODES.PAID:
            return (
                <Chip
                    label={quittancePaymentStatusLabel}
                    sx={{
                        border: 1,
                        borderColor: ColorCodes.blueDark,
                        backgroundColor: ColorCodes.blueLight,
                        color: "#012163",
                        fontSize: 12
                    }}
                />
            );
        case QUITTANCE_PAYMENT_STATUS_CODES.UNPAID:
            return (
                <Chip
                    label={quittancePaymentStatusLabel}
                    sx={{
                        border: 1,
                        borderColor: ColorCodes.yellowDark,
                        backgroundColor: ColorCodes.yellowLight,
                        color: "#012163",
                        fontSize: 12
                    }}
                />
            );
        default:
            return <Chip label={quittancePaymentStatusLabel} />;
    }
};

export const deliverySlipStatusComponent = (
    deliverySlipStatusCode: string,
    deliverySlipStatusLabel: string,
) => {

    switch (deliverySlipStatusCode) {
        case QUITTANCE_STATUS_CODES.TO_DO_REINSURANCE:
        case QUITTANCE_STATUS_CODES.TO_DO_ACCOUNTING:
            return (
                <Chip
                    label={deliverySlipStatusLabel}
                    sx={{
                        border: 1,
                        borderColor: ColorCodes.yellowDark,
                        backgroundColor: ColorCodes.yellowLight,
                        color: "#012163",
                        fontSize: 12
                    }}
                />
            );
        case QUITTANCE_STATUS_CODES.IN_PROGRESS_REINSURANCE:
        case QUITTANCE_STATUS_CODES.IN_PROGRESS_ACCOUNTING:
        case QUITTANCE_STATUS_CODES.IN_PROGRESS_PAYMENT:
            return (
                <Chip
                    label={deliverySlipStatusLabel}
                    sx={{
                        border: 1,
                        borderColor: ColorCodes.blueDark,
                        backgroundColor: ColorCodes.blueLight,
                        color: "#012163",
                        fontSize: 12
                    }}
                />
            );
        default:
            return (
                <Chip label={deliverySlipStatusLabel}/>
            );
    }
};
